import { test } from '@playwright/test';
import { login } from './helpers/login.js';
import { createApplication } from './emp_applicationcreation.js';
import { completeApplication } from './emp_applicationcompletionflow.js';

test('complete application flow', async ({ page }) => {
  test.setTimeout(120000);
  await login(page);
  await createApplication(page);
  await completeApplication(page);
  await page.pause();
});
