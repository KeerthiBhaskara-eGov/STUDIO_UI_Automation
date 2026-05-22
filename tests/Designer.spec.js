import { test } from '@playwright/test';
import { login } from './helpers/login.js';
import { createService } from './serviceDetails.js';
import { createForm } from './formCreation.js';
import { createRoles } from './rolesCreation.js';
import { createWorkflow } from './workflowCreation.js';
import { createNotifications } from './notificationsCreationtoworkflow.js';
import { executePreview } from './Preview.js';

test('complete e2e flow', async ({ page }) => {
  await login(page);
  await createService(page);
  await createForm(page);
  await createRoles(page);
  await createWorkflow(page);
  await createNotifications(page);
  await executePreview(page);
  await page.pause();
  // Publish the service
  await page.getByRole('button', { name: 'Publish Service' }).click();
  await page.getByRole('button', { name: 'Publish', exact: true }).click();
  await page.waitForTimeout(60000);
  await page.goto('https://unified-dev.digit.org/digit-studio/employee/servicedesigner/LandingPage');
  await page.pause();
});
