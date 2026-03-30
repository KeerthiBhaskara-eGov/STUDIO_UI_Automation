import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import serviceConfig from '../service-config.json' with { type: 'json' };
import draftConfig from '../service-config-draft.json' with { type: 'json' };
import { buildFieldData } from './helpers/dataGenerator.js';

/**
 * Extracts dropdown option names from the draft config's uiforms section
 * for a given field label. Falls back to the published config's values[] array.
 * Returns an empty array if no options are found.
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(process.cwd(), 'test-data.json');

export async function createApplication(page) {
  // Read at runtime so global-setup's sync to test-data.json is picked up
  const testData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  const moduleDisplay = testData.moduleName.replace(/_/g, ' ');
  const serviceDisplay = testData.serviceName.replace(/_/g, ' ');

  // ── Navigate to the service ─────────────────────────────────────────────────
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByRole('button', { name: 'View More' }).click();
  // Heading renders as "ServiceName ModuleName" — match exactly that, no extra words
  const headingPattern = new RegExp(`^\\s*${serviceDisplay}\\s+${moduleDisplay}\\s*$`, 'i');
  await page.getByRole('heading', { name: headingPattern }).click();
  await page.getByRole('button', { name: serviceDisplay }).click();

  // ── Applicant section ────────────────────────────────────────────────────────
  await fillApplicantSection(page, serviceConfig.applicant);
  await page.getByRole('button', { name: 'Next' }).click();

  // ── Address section (only if configured) ─────────────────────────────────────
  const hasAddress = (serviceConfig.fields ?? []).some(f => f.type === 'address');
  if (hasAddress) {
    await fillAddressSection(page, serviceConfig.fields);
    await page.getByRole('button', { name: 'Next' }).click();
  }

  // ── Document uploads for the first (submit) action ──────────────────────────
  // Only enter the document step if the action actually requires uploads.
  const firstAction = getFirstActionCode(serviceConfig.workflow);
  const actionDocs = getDocumentsForAction(serviceConfig.documents, firstAction);
  if (actionDocs.length > 0) {
    await uploadDocuments(page, actionDocs);
    await page.getByRole('button', { name: 'Next' }).click();
  }

  // ── Custom form fields ───────────────────────────────────────────────────────
  await fillCustomFormFields(page, serviceConfig.fields);

  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForURL(/\/response\?.*isSuccess=true/, { timeout: 30000 });

  // ── Persist application number ───────────────────────────────────────────────
  const applicationNumber = new URL(page.url()).searchParams.get('applicationNumber');
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  data.applicationNumber = applicationNumber;
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  await page.getByText('View Application').click();
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Returns the action code of the start-state's first action (the submit action). */
function getFirstActionCode(workflow) {
  const startState = (workflow.states || []).find(s => s.isStartState);
  return startState?.actions?.[0]?.action ?? null;
}

/** Returns the documents array for a given action code (excluding conditional docs). */
function getDocumentsForAction(documentsConfig, actionCode) {
  if (!actionCode || !documentsConfig?.length) return [];
  const actionEntry = documentsConfig[0]?.actions?.find(a => a.action === actionCode);
  return (actionEntry?.documents ?? []).filter(d => !d.visibilityExpression);
}

/** Fills applicant-level fields (name, mobile, email, gender, etc.). */
async function fillApplicantSection(page, applicantConfig) {
  const types = applicantConfig?.types ?? ['individual'];

  // If the service supports both types, the UI shows a type selector — pick individual
  // if available, otherwise fall back to organisation.
  const useOrg = !types.includes('individual') && types.includes('organisation');
  const properties = useOrg
    ? (applicantConfig?.organisation?.properties ?? [])
    : (applicantConfig?.individual?.properties ?? []);

  if (useOrg) {
    // Click the Organisation tab/radio if present
    try {
      await page.getByRole('button', { name: /organisation/i }).click({ timeout: 3000 });
    } catch { /* tab not present — single type service */ }
  }

  const fieldData = buildFieldData(properties);
  for (const { field, value, visible } of fieldData) {
    if (!visible) continue;
    await fillApplicantField(page, field, value);
  }
}

/**
 * Returns the first option name for a radioordropdown/enum field.
 * Checks published config values[] first, then draft config dropDownOptions[].
 */
function getFirstOptionName(field) {
  if (field.values?.length) return field.values[0];

  // Search draft uiforms for this field's dropDownOptions
  for (const form of draftConfig.uiforms ?? []) {
    for (const screen of form.formConfig?.screens ?? []) {
      for (const card of screen.cards ?? []) {
        for (const f of card.fields ?? []) {
          if (f.label === field.label && f.dropDownOptions?.length) {
            return f.dropDownOptions[0].name;
          }
        }
      }
    }
  }
  return null;
}

/**
 * Clicks the first option in an open DIGIT dropdown.
 * Uses the resolved option name when available (exact button click),
 * otherwise falls back to generic first-visible-option strategies.
 */
async function clickFirstDropdownOption(page, optionName) {
  if (optionName) {
    await page.getByRole('button', { name: optionName }).click({ timeout: 4000 });
    return;
  }
  // Generic fallback for MDMS-sourced dropdowns where option names are unknown
  try {
    await page.getByRole('option').first().click({ timeout: 2000 });
    return;
  } catch { /* not present */ }
  try {
    await page.locator('[role="listbox"] li, [role="listbox"] button').first().click({ timeout: 2000 });
    return;
  } catch { /* not present */ }
  await page.getByRole('button').filter({ hasText: /\S/ })
    .not(page.getByRole('button', { name: /^(Select an option|Next|Submit|Back|Cancel|Confirm|Get Started|View More|Apply|Close|Actions)$/i }))
    .first()
    .click({ timeout: 4000 });
}

async function fillApplicantField(page, field, value) {
  const { format, type, label } = field;
  try {
    if (format === 'radioordropdown') {
      await page.getByRole('button', { name: 'Select an option' }).first().click({ timeout: 4000 });
      await clickFirstDropdownOption(page, getFirstOptionName(field));
      return;
    }

    if (format === 'mobileNumber' || type === 'mobileNumber') {
      await page.getByRole('textbox', { name: label }).fill(value, { timeout: 4000 });
      return;
    }

    // Default: text input
    await page.getByRole('textbox', { name: label }).fill(value ?? '', { timeout: 4000 });
  } catch {
    // Field not present or not interactable — skip
  }
}

/** Fills address-type section fields from the service config. */
async function fillAddressSection(page, fields) {
  const addressSection = (fields ?? []).find(f => f.type === 'address');
  if (!addressSection) return;

  const currentValues = {};
  const fieldData = buildFieldData(addressSection.properties, currentValues);

  for (const { field, value, visible } of fieldData) {
    if (!visible) continue;
    const { format, label } = field;

    try {
      if (format === 'text') {
        // Use regex to handle label variations e.g. "Street name" vs "Streetname"
        const labelPattern = new RegExp(label.replace(/\s+/g, '\\s*'), 'i');
        await page.getByRole('textbox', { name: labelPattern }).fill(value, { timeout: 4000 });
        currentValues[field.name] = value;

      } else if (format === 'hierarchyDropdown') {
        await page.getByRole('button', { name: 'Select an option' }).first().click({ timeout: 4000 });
        await clickFirstDropdownOption(page, null); // boundary options come from MDMS, names unknown
        currentValues[field.name] = 'selected';

      } else if (format === 'geolocation') {
        // Open map picker, click to pin a location, then submit
        await page.locator('.digit-text-input-customIcon > path').click({ timeout: 4000 });
        await page
          .locator('div')
          .filter({ hasText: /^\+−Leaflet/ })
          .nth(1)
          .click({ timeout: 5000 });
        await page.getByRole('button', { name: 'Submit' }).click({ timeout: 4000 });
        currentValues[field.name] = 'set';
      }
    } catch {
      // Skip fields that are not currently visible on the page
    }
  }
}

/** Uploads the given (pre-filtered) documents list — one file per document slot. */
async function uploadDocuments(page, docs) {
  for (let i = 0; i < docs.length; i++) {
    try {
      const fileInput = page.locator('input[type="file"]').nth(i);
      await fileInput.setInputFiles(
        path.resolve(__dirname, '..', 'test-assets', 'sample-upload.pdf'),
        { timeout: 5000 }
      );
    } catch {
      break; // No more file inputs
    }
  }
}

/**
 * Fills all non-address custom form sections dynamically.
 * Evaluates visibility expressions in order so conditional fields
 * are shown/hidden based on what was filled before them.
 */
async function fillCustomFormFields(page, fields) {
  const customSections = (fields ?? []).filter(f => f.type !== 'address');
  const currentValues = {};

  for (const section of customSections) {
    const fieldData = buildFieldData(section.properties, currentValues);

    for (const { field, value, visible } of fieldData) {
      // Only skip invisible fields — value=null means dropdown/special interaction, still needs handling
      if (!visible) continue;

      const { format, type, label, name } = field;
      try {
        if (format === 'date' || type === 'date') {
          await page.getByRole('textbox', { name: label }).fill(value, { timeout: 4000 });

        } else if (format === 'number' || type === 'integer') {
          const input = page
            .getByRole('spinbutton', { name: label })
            .or(page.getByRole('textbox', { name: label }));
          await input.fill(value, { timeout: 4000 });

        } else if (format === 'text' || type === 'string') {
          const labelPattern = new RegExp(label.replace(/\s+/g, '\\s*'), 'i');
          await page.getByRole('textbox', { name: labelPattern }).fill(value, { timeout: 4000 });

        } else if (format === 'radioordropdown' || type === 'enum') {
          await page.getByRole('button', { name: 'Select an option' }).first().click({ timeout: 4000 });
          // value = field.values?.[0] from generateValue, or first draft dropDownOption name
          await clickFirstDropdownOption(page, value ?? getFirstOptionName(field));
        }

        // Update accumulated values for subsequent visibility checks
        currentValues[name] = value ?? 'selected';
      } catch {
        // Field is not currently visible on the page — skip
      }
    }
  }
}
