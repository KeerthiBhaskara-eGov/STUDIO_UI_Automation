// Form creation module
export async function createForm(page) {
  await page.getByRole('button', { name: 'Create Service Application' }).click();
  await page.getByRole('button', { name: 'Create a New Form' }).click();
  await page.getByRole('textbox', { name: 'Form name' }).click();
  await page.getByRole('textbox', { name: 'Form name' }).fill('Hospital');
  await page.getByRole('button', { name: 'Save' }).first().click();

  await page.getByRole('button', { name: 'Add Section' }).click();
  await page.locator('div').filter({ hasText: /^Custom sectionAdd custom section details$/ }).nth(1).click();
  await page.pause()
  await page.getByRole('button', { name: 'Add Field' }).click();
  await page.getByRole('textbox', { name: 'Field type' }).click();
  await page.getByText('Text').click();
  await page.getByRole('textbox', { name: 'Label' }).click();
  await page.getByRole('textbox', { name: 'Label' }).fill('Patient Name');
  await page.getByRole('button', { name: 'Submit' }).click();

  await page.getByRole('button', { name: 'Add Field' }).click();
  await page.getByRole('textbox', { name: 'Field type' }).click();
  await page.getByText('Number', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Label' }).click();
  await page.getByRole('textbox', { name: 'Label' }).fill('Patient Age');
  await page.getByRole('button', { name: 'Submit' }).click();

  await page.getByRole('button', { name: 'Add Field' }).click();
  await page.getByRole('textbox', { name: 'Field type' }).click();
  await page.getByText('Date').click();
  await page.getByRole('textbox', { name: 'Label' }).click();
  await page.getByRole('textbox', { name: 'Label' }).fill('Admitted date');
  await page.getByRole('button', { name: 'Submit' }).click();

  await page.getByRole('button', { name: 'Add Field' }).click();
  await page.getByRole('textbox', { name: 'Field type' }).click();
  await page.getByText('Dropdown').click();
  await page.getByRole('textbox', { name: 'Label' }).click();
  await page.getByRole('textbox', { name: 'Label' }).fill('Patient Gender');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Dropdown').click();
  await page.locator('div:nth-child(4) > .drawer-container-tooltip > .digit-switch-container > .digit-switch > .digit-switch-shape-off').click();
  await page.getByRole('textbox').nth(5).click();
  await page.getByText('Gender', { exact: true }).click();
  await page.getByTitle('Back').click();

  await page.getByRole('button', { name: 'Add Field' }).click();
  await page.getByRole('textbox', { name: 'Field type' }).click();
  await page.getByText('Radio').click();
  await page.getByRole('textbox', { name: 'Label' }).click();
  await page.getByRole('textbox', { name: 'Label' }).fill('Availability');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Radio').click();
  await page.getByRole('button', { name: 'Add Options for Question' }).click();
  await page.locator('input[name="title"]').click();
  await page.locator('input[name="title"]').fill('yes');
  await page.getByRole('button', { name: 'Add Options for Question' }).click();
  await page.locator('input[name="title"]').nth(1).click();
  await page.locator('input[name="title"]').nth(1).fill('No');
  await page.getByTitle('Back').click();

  await page.getByRole('button', { name: 'Add Field' }).click();
  await page.getByRole('textbox', { name: 'Field type' }).click();
  await page.locator('div').filter({ hasText: /^Mobile number$/ }).nth(1).click();
  await page.getByRole('textbox', { name: 'Label' }).click();
  await page.getByRole('textbox', { name: 'Label' }).fill('Patient Mobile Number');
  await page.getByRole('button', { name: 'Submit' }).click();

  await page.getByRole('button', { name: 'Add Section' }).click();
  await page.getByText('Add address section details').click();

  await page.getByRole('button', { name: 'Add Section' }).click();
  await page.getByText('Document section', { exact: true }).click();

  await page.getByRole('button', { name: 'Add Field' }).click();
  await page.getByRole('textbox', { name: 'Field type' }).click();
  await page.getByText('Document upload').click();
  await page.getByRole('textbox', { name: 'Label' }).click();
  await page.getByRole('textbox', { name: 'Label' }).fill('Proofs');
  await page.getByRole('button', { name: 'Submit' }).click();

  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('link', { name: 'Service Designer' }).click();
}
