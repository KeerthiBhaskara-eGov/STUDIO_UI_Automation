// Notifications creation and workflow linking module
export async function createNotifications(page) {
  await page.getByRole('button', { name: 'Create Notification' }).click();

  // Create Email notification
  await page.getByText('EmailPerfect for onboarding,').click();
  await page.getByRole('textbox', { name: 'Enter notification title' }).click();
  await page.getByRole('textbox', { name: 'Enter notification title' }).fill('Resolved Notification');
  await page.getByRole('textbox', { name: 'Enter email subject' }).click();
  await page.getByRole('textbox', { name: 'Enter email subject' }).fill('Resolved the application refer details');
  await page.getByRole('textbox', { name: 'Message content' }).click();
  await page.getByRole('textbox', { name: 'Message content' }).fill('Your application is resolved');
  await page.getByRole('button', { name: 'Name chip', exact: true }).click();
  await page.getByRole('button', { name: 'Mobile Number chip' }).click();
  await page.getByRole('button', { name: 'Email chip' }).click();
  await page.getByRole('button', { name: 'Save' }).click();

  // Create SMS notification
  await page.locator('div').filter({ hasText: /^SMSIdeal for urgent alerts, codes, and time-sensitive updates$/ }).first().click();
  await page.getByRole('textbox', { name: 'Enter notification title' }).click();
  await page.getByRole('textbox', { name: 'Enter notification title' }).fill('Reject Notification');
  await page.getByRole('textbox', { name: 'Message content' }).click();
  await page.getByRole('textbox', { name: 'Message content' }).fill('Your application is rejected, due to ');
  await page.getByRole('button', { name: 'Name chip', exact: true }).click();
  await page.getByRole('button', { name: 'Mobile Number chip' }).click();
  await page.getByRole('textbox', { name: 'Message content' }).fill('Your application is rejected, due to  {PublicService.applicants[0].Name}  {PublicService.applicants[0].MobileNumber} is not correct');
  await page.getByRole('button', { name: 'Save' }).click();

  // Link notifications to workflow
  await page.getByRole('button', { name: 'Back to Dashboard' }).click();
  await page.getByRole('button', { name: 'Back to Dashboard' }).click();
  await page.getByRole('button', { name: 'Back to Dashboard' }).click();
  await page.getByRole('button', { name: 'Define Workflow' }).click();
  await page.getByRole('heading', { name: 'Resolved' }).click();
  await page.getByRole('textbox', { name: 'Search options in' }).click();
  await page.getByRole('checkbox', { name: 'Select option: Resolved' }).check();
  await page.locator('g:nth-child(4) > rect').click();
  await page.locator('div').filter({ hasText: /^Rejected$/ }).nth(2).click();
  await page.getByRole('textbox', { name: 'Search options in' }).click();
  await page.getByRole('checkbox', { name: 'Select option: Reject' }).check();
  await page.getByRole('button', { name: 'Back', exact: true }).click();
}
