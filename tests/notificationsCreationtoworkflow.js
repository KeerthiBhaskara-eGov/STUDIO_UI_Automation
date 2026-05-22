export async function createNotifications(page) {

  await page.getByRole('button', { name: 'Create Notification' }).click();
  await page.getByText('+').first().click();
  await page.getByRole('button', { name: 'Select an option' }).click();
  await page.getByRole('button', { name: 'Pending for verification' }).click();
  await page.getByRole('textbox', { name: 'Enter Subject' }).fill('Application is submitted');
  await page.getByRole('textbox', { name: 'Enter Message Body' }).fill('Hey ');
  await page.getByRole('button', { name: 'Name chip', exact: true }).click();
  await page.getByRole('textbox', { name: 'Enter Message Body' }).fill(
    'Hey  {PublicService.applicants[0].Name} \nApplication with '
  );
  await page.getByRole('button', { name: 'Mobile Number chip' }).click();
  await page.getByRole('textbox', { name: 'Enter Message Body' }).fill(
    'Hey  {PublicService.applicants[0].Name} \nApplication with  {PublicService.applicants[0].MobileNumber} is submitted, check details '
  );
  await page.getByRole('button', { name: 'Pincode chip' }).click();
  await page.getByRole('button', { name: 'Patient age chip' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByText('+').nth(1).click();
  await page.getByRole('button', { name: 'Select an option' }).click();
  await page.getByRole('button', { name: 'Resolved' }).click();
  await page.getByRole('textbox', { name: 'Enter Message Body' }).fill(
    'Application is resolved with these details'
  );
  await page.getByRole('button', { name: 'Name chip', exact: true }).click();
  await page.getByRole('button', { name: 'Pincode chip' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Back', exact: true }).click();
}