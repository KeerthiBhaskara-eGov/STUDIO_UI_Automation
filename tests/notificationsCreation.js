// Notifications creation module
export async function createNotifications(page) {
  await page.getByRole('button', { name: 'Create Notifications' }).click();

  await page.locator('div').filter({ hasText: /^EmailPerfect for onboarding, newsletters, and detailed updates$/ }).first().click();
  await page.getByRole('textbox', { name: 'Notification title' }).click();
  await page.getByRole('textbox', { name: 'Notification title' }).fill('Reject Application');
  await page.getByRole('textbox', { name: 'Email subject line' }).click();
  await page.getByRole('textbox', { name: 'Email subject line' }).fill('Rejected application due to incorrect details');
  await page.getByRole('textbox', { name: 'Message content' }).click();
  await page.getByRole('textbox', { name: 'Message content' }).fill('please find need to correct details');
  await page.getByText('Name', { exact: true }).click();
  await page.getByText('Mobile Number', { exact: true }).click();
  await page.getByText('Email', { exact: true }).click();
  await page.getByText('Pincode').click();
  await page.getByRole('button', { name: 'Save' }).click();

  await page.locator('div').filter({ hasText: /^SMSIdeal for urgent alerts, codes, and time-sensitive updates$/ }).first().click();
  await page.getByRole('textbox', { name: 'Notification title' }).click();
  await page.getByRole('textbox', { name: 'Notification title' }).fill('Resolved Application');
  await page.getByRole('textbox', { name: 'Message content' }).click();
  await page.getByRole('textbox', { name: 'Message content' }).fill('Please find application resolved');
  await page.getByText('Name', { exact: true }).click();
  await page.getByText('Mobile Number', { exact: true }).click();
  await page.getByText('Pincode').click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('link', { name: 'Service Designer' }).click();
}
