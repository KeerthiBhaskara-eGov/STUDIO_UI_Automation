// Checklist creation module
export async function createChecklist(page) {
  await page.getByRole('button', { name: 'Create Checklists' }).click();
  await page.getByRole('button', { name: 'Create New Checklist' }).click();
  await page.getByRole('textbox', { name: 'Add checklist name' }).click();
  await page.getByRole('textbox', { name: 'Add checklist name' }).fill('Feedback checklist');
  await page.getByRole('textbox', { name: 'Please type your question here' }).click();
  await page.getByRole('textbox', { name: 'Please type your question here' }).fill('Is user verified');
  await page.getByRole('textbox', { name: 'Option' }).click();
  await page.getByRole('textbox', { name: 'Option' }).fill('yes');
  await page.getByRole('button', { name: 'Add Options for Question' }).click();
  await page.getByRole('textbox', { name: 'Option 2' }).click();
  await page.getByRole('textbox', { name: 'Option 2' }).fill('No');
  await page.getByRole('button', { name: 'Add Question' }).click();
  await page.locator('div:nth-child(2) > .digit-card-component > .digit-label-field-pair > div:nth-child(2) > .question-field-container > .question-field > .digit-dropdown-employee-select-wrap > .digit-dropdown-select').click();
  await page.getByText('Text', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Please type your question here' }).nth(1).click();
  await page.getByRole('textbox', { name: 'Please type your question here' }).nth(1).fill('Feedback to improve service');
  await page.getByRole('button').filter({ hasText: 'Create Checklist' }).click();
  await page.getByRole('button', { name: 'Create Checklist' }).click();
  await page.getByRole('link', { name: 'Service Designer' }).click();
}
