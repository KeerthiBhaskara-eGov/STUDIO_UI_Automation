import { test } from '@playwright/test';
import { login } from './helpers/login.js';
import { createService } from './serviceDetails.js';
import { createForm } from './formCreation.js';
import { createChecklist } from './checklistCreation.js';
import { createRoles } from './rolesCreation.js';
import { createNotifications } from './notificationsCreation.js';
import { createWorkflow } from './workflowCreation.js';

test('complete e2e flow', async ({ page }) => {
  await login(page);
  await createService(page);
  await createForm(page);
  await createChecklist(page);
  await createRoles(page);
  await createNotifications(page);
  
  // Get the current URL here
  console.log('Current URL:', page.url());
  
  await createWorkflow(page);
});
