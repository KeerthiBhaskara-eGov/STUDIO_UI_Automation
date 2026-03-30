import serviceConfig from '../service-config.json' with { type: 'json' };
import draftConfig from '../service-config-draft.json' with { type: 'json' };

/**
 * Traverses the workflow using uiworkflow.connections + canvasElements from the
 * draft config, which contain:
 *   - connections: action edges with stableCode, label, from/to node IDs, checklist
 *   - canvasElements: state nodes with stableCode, name, nodetype (start/intermediate/end)
 *
 * Builds the happy path — at each intermediate state, prefers an action that
 * leads to another intermediate state, falling back to the first available action.
 * Continues until an "end" node is reached.
 */
export async function completeApplication(page) {
  const steps = resolveHappyPath();
  for (const step of steps) {
    await executeAction(page, step);
  }
}

// ── Path resolution using uiworkflow ─────────────────────────────────────────

function resolveHappyPath() {
  const { connections = [], canvasElements = [] } = draftConfig.uiworkflow ?? {};

  // Build node lookup by id
  const nodeById = Object.fromEntries(canvasElements.map(n => [n.id, n]));

  // Find the start node and skip its action (form submission already done)
  const startNode = canvasElements.find(n => n.nodetype === 'start');
  if (!startNode) return [];

  const submitConn = connections.find(c => c.from === startNode.id);
  if (!submitConn) return [];

  const steps = [];
  let currentNodeId = submitConn.to; // first state after form submission
  const visited = new Set();

  while (currentNodeId) {
    if (visited.has(currentNodeId)) break;
    visited.add(currentNodeId);

    const currentNode = nodeById[currentNodeId];
    if (!currentNode || currentNode.nodetype === 'end') break;

    // All outgoing connections from this state
    const outgoing = connections.filter(c => c.from === currentNodeId);
    if (!outgoing.length) break;

    // Prefer a connection leading to a non-end node (keep the flow going)
    const chosen =
      outgoing.find(c => nodeById[c.to]?.nodetype !== 'end') ?? outgoing[0];

    steps.push({
      stateStableCode: currentNode.stableCode,
      actionCode: chosen.stableCode,   // e.g. "ACTION_2" — used to look up doc config
      actionLabel: chosen.label,        // e.g. "Resolve" — the UI option text
      checklist: chosen.checklist ?? [] // checklist items defined on this connection
    });

    currentNodeId = chosen.to;
  }

  return steps;
}

// ── Action execution ──────────────────────────────────────────────────────────

async function executeAction(page, { actionCode, actionLabel, checklist }) {
  const docAction = (serviceConfig.documents?.[0]?.actions ?? [])
    .find(a => a.action === actionCode);

  // Open Actions menu and select by display label
  await page.getByRole('button', { name: 'Actions' }).click();
  await page.getByRole('option', { name: actionLabel }).click();

  // Assignee (only when mandatory)
  if (docAction?.assignee?.show && docAction.assignee.isMandatory) {
    try {
      await page.getByRole('textbox', { name: /assignee/i })
        .fill('TestEmployee', { timeout: 4000 });
    } catch { /* optional */ }
  }

  // Comments (only when mandatory)
  if (docAction?.comments?.show && docAction.comments.isMandatory) {
    try {
      await page.getByRole('textbox', { name: /comment/i })
        .fill('Test comment', { timeout: 4000 });
    } catch { /* optional */ }
  }

  // Document uploads for this action
  if (docAction?.documents?.length) {
    await uploadActionDocuments(page, docAction.documents);
  }

  // Checklist items defined on this connection in uiworkflow
  if (checklist.length) {
    await fillChecklist(page, checklist);
  }

  await page.getByRole('button', { name: 'Submit', exact: true }).click();
  await page.getByRole('button', { name: 'Confirm', exact: true }).click();

}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function uploadActionDocuments(page, docs) {
  for (const doc of docs) {
    if (doc.visibilityExpression) continue;
    try {
      await page.locator('input[type="file"]').first()
        .setInputFiles(
          new URL('../test-assets/sample-upload.pdf', import.meta.url).pathname,
          { timeout: 5000 }
        );
      break;
    } catch { /* no file input */ }
  }
}

/**
 * Fills checklist items that appear in the action modal.
 * Each item has a name (the question label) and comes from uiworkflow.connections.
 * The matching uichecklists entry drives the data type:
 *   - SingleValueList / MultiValueList → pick first radio / checkbox
 *   - Text / default → fill textbox
 * After filling all items, clicks the inner SUBMIT button if present
 * (some checklist modals render a SUBMIT before the outer Confirm).
 */
async function fillChecklist(page, checklist) {
  // Build lookup by name — uichecklists entries have no top-level code field
  const uiChecklistsByName = Object.fromEntries(
    (draftConfig.uichecklists ?? []).map(c => [c.name, c])
  );

  for (const item of checklist) {
    // Match by name (e.g. "Verification", "Feedback")
    const uiEntry = uiChecklistsByName[item.name];
    // dataType lives inside data[0], not at the top level
    const dataType = uiEntry?.data?.[0]?.dataType ?? 'Text';

    try {
      if (dataType === 'SingleValueList' || dataType === 'MultiValueList') {
        // Rendered as radio buttons or checkboxes — pick the first option
        const radio = page.getByRole('radio').first();
        const checkbox = page.getByRole('checkbox').first();
        if (await radio.count() > 0) {
          await radio.check({ timeout: 4000 });
        } else {
          await checkbox.check({ timeout: 4000 });
        }
      } else {
        // Text input — fill by the item name label
        await page.getByRole('textbox', { name: new RegExp(item.name, 'i') })
          .fill('Test answer', { timeout: 4000 });
      }
    } catch { /* question not rendered or already answered */ }
  }

  // Some checklist modals have an inner SUBMIT button before the outer Confirm
  try {
    const submitBtn = page.getByRole('button', { name: 'SUBMIT', exact: true });
    if (await submitBtn.count() > 0) {
      await submitBtn.click({ timeout: 4000 });
    }
  } catch { /* no inner SUBMIT present */ }
}
