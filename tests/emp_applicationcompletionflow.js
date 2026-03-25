export async function completeApplication(page) {
  await page.getByRole('button', { name: 'Actions' }).click();
  await page.getByRole('option', { name: 'Resolve' }).click();
  await page.getByRole('button', { name: 'Confirm', exact: true }).click();
  await page.getByRole('button', { name: 'Actions' }).click();
  await page.getByRole('option', { name: 'Feedback' }).click();
  await page.getByRole('radio', { name: '5' }).check();
  await page.getByRole('textbox', { name: 'Feedback to improve service' }).click();
  await page.getByRole('textbox', { name: 'Feedback to improve service' }).fill('Performed well');
  await page.getByRole('button', { name: 'Submit', exact: true }).click();
  await page.getByRole('button', { name: 'Confirm', exact: true }).click();
}
