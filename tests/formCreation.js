// Form creation module
export async function createForm(page) {
  await page.getByRole('button', { name: 'Create a New Form' }).click();

  // Add address section
  await page.getByRole('button', { name: 'Add Section' }).click();
  await page.getByText('Add address section details').click();

  // Add document section
  await page.getByRole('button', { name: 'Add Section' }).click();
  await page.getByText('Add document section details').click();

  // Add first document upload field - Medical Reports
  await page.getByRole('button', { name: 'Add Field' }).click();
  await page.getByRole('button', { name: 'Select an option', exact: true }).click();
  await page.getByRole('button', { name: 'Document upload' }).click();
  await page.getByRole('textbox', { name: 'Label' }).click();
  await page.getByRole('textbox', { name: 'Label' }).fill('Medical Reports');
  await page.getByRole('button', { name: 'Submit', exact: true }).click();

  // Add second document upload field - Required health reports
  await page.getByRole('button', { name: 'Add Field' }).click();
  await page.getByRole('button', { name: 'Select an option', exact: true }).click();
  await page.locator('#jk-dropdown-unique').getByRole('button', { name: 'Document upload' }).click();
  await page.getByRole('textbox', { name: 'Label' }).click();
  await page.getByRole('textbox', { name: 'Label' }).fill('Required health reports');
  await page.getByRole('button', { name: 'Submit', exact: true }).click();

  // Add display logic to Required health reports
  await page.getByText('Required health reports', { exact: true }).click();
  await page.getByRole('button', { name: 'Logic' }).click();
  await page.locator('.digit-switch-shape-off').click();
  await page.getByRole('button', { name: 'Add Display Logic' }).click();
  await page.getByRole('button', { name: 'Select an option' }).nth(1).click();
  await page.getByRole('button', { name: 'Medical reports' }).click();
  await page.getByRole('button', { name: 'Select an option' }).nth(2).click();
  await page.getByRole('button', { name: 'Is uploaded' }).click();
  await page.getByRole('button', { name: 'Save Logic', exact: true }).click();
  await page.getByTitle('Back').click();

  // Add custom section - Patient Details
  await page.getByRole('button', { name: 'Add Section' }).click();
  await page.getByText('Add custom section details').click();

  // Add Patient Name field
  await page.getByRole('button', { name: 'Add Field' }).click();
  await page.getByRole('button', { name: 'Select an option', exact: true }).click();
  await page.getByRole('button', { name: 'Text' }).click();
  await page.getByRole('textbox', { name: 'Label' }).click();
  await page.getByRole('textbox', { name: 'Label' }).fill('Patient Name');
  await page.getByRole('button', { name: 'Submit', exact: true }).click();

  // Add Patient Age field
  await page.getByRole('button', { name: 'Add Field' }).click();
  await page.getByRole('button', { name: 'Select an option', exact: true }).click();
  await page.getByRole('button', { name: 'Number', exact: true }).click();
  await page.getByRole('textbox', { name: 'Label' }).click();
  await page.getByRole('textbox', { name: 'Label' }).fill('Patient Age');
  await page.getByRole('button', { name: 'Submit', exact: true }).click();

  // Add Admitted Date field
  await page.getByRole('button', { name: 'Add Field' }).click();
  await page.getByRole('button', { name: 'Select an option', exact: true }).click();
  await page.getByRole('button', { name: 'Date' }).click();
  await page.getByRole('textbox', { name: 'Label' }).click();
  await page.getByRole('textbox', { name: 'Label' }).fill('Admitted Date');
  await page.getByRole('button', { name: 'Submit', exact: true }).click();

  // Add Patient ID field
  await page.getByRole('button', { name: 'Add Field' }).click();
  await page.getByRole('button', { name: 'Select an option', exact: true }).click();
  await page.locator('#jk-dropdown-unique').getByRole('button', { name: 'Text' }).click();
  await page.getByRole('textbox', { name: 'Label' }).click();
  await page.getByRole('textbox', { name: 'Label' }).fill('Patient ID');
  await page.getByRole('button', { name: 'Submit', exact: true }).click();

  // Add Additional Details field
  await page.getByRole('button', { name: 'Add Field' }).click();
  await page.getByRole('button', { name: 'Select an option', exact: true }).click();
  await page.locator('#jk-dropdown-unique').getByRole('button', { name: 'Text' }).click();
  await page.getByRole('textbox', { name: 'Label' }).click();
  await page.getByRole('textbox', { name: 'Label' }).fill('Additional Details');
  await page.getByRole('button', { name: 'Submit', exact: true }).click();

  // Rename section heading
  await page.getByRole('textbox', { name: 'Enter section heading' }).click();
  await page.getByRole('textbox', { name: 'Enter section heading' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'Enter section heading' }).fill('Patient Details');

  // Add Letters Only validation to Patient Name
  await page.getByLabel('Side panel body').getByText('Patient name').click();
  await page.getByRole('button', { name: 'Logic' }).click();
  await page.getByRole('button', { name: 'Select an option' }).click();
  await page.getByRole('button', { name: 'Letters Only' }).click();
  await page.getByTitle('Back').click();

  // Add Numbers Only validation + display logic to Patient Age
  await page.getByRole('button', { name: 'Number' }).click();
  await page.getByRole('button', { name: 'Logic' }).click();
  await page.getByRole('button', { name: 'Select an option' }).click();
  await page.getByRole('button', { name: 'Numbers Only' }).click();
  await page.getByRole('textbox', { name: 'Error message' }).click();
  await page.getByRole('textbox', { name: 'Error message' }).fill('Invalid Input');
  await page.locator('.digit-switch-shape-off').click();
  await page.getByRole('button', { name: 'Add Display Logic' }).click();
  await page.getByRole('button', { name: 'Select an option' }).nth(2).click();
  await page.getByRole('button', { name: 'Patient name' }).click();
  await page.getByRole('button', { name: 'Select an option' }).nth(3).click();
  await page.getByRole('button', { name: 'Contains' }).click();
  await page.locator('div:nth-child(3) > .digit-text-input-field > .input-container > .digit-employeeCard-input').click();
  await page.locator('.digit-employeeCard-input.focus-visible.focus-no-outline').fill('I');
  await page.getByRole('button', { name: 'Save Logic', exact: true }).click();
  await page.getByTitle('Back').click();

  // Verify Patient Name logic
  await page.getByLabel('Side panel body').getByText('Patient name').click();
  await page.getByRole('button', { name: 'Logic' }).click();
  await page.getByTitle('Back').click();

  // Add display logic to Admitted Date
  await page.getByRole('button', { name: 'Date' }).click();
  await page.getByRole('button', { name: 'Logic' }).click();
  await page.locator('.digit-switch-shape-off').click();
  await page.getByRole('button', { name: 'Add Display Logic' }).click();
  await page.getByRole('button', { name: 'Select an option' }).nth(1).click();
  await page.getByRole('button', { name: 'Patient age' }).click();
  await page.getByRole('button', { name: 'Select an option' }).nth(2).click();
  await page.getByRole('button', { name: 'Less than', exact: true }).click();
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').fill('59');
  await page.getByRole('button', { name: 'Select an option' }).nth(3).click();
  await page.getByRole('button', { name: 'Hide', exact: true }).click();
  await page.getByRole('button', { name: 'Save Logic', exact: true }).click();
  await page.getByTitle('Back').click();

  // Add Alphanumeric validation + display logic to Patient ID
  await page.getByLabel('Side panel body').locator('div').filter({ hasText: /^Patient id$/ }).click();
  await page.getByRole('button', { name: 'Logic' }).click();
  await page.getByRole('button', { name: 'Select an option' }).click();
  await page.getByRole('button', { name: 'Alphanumeric' }).click();
  await page.getByRole('switch').nth(1).click();
  await page.getByRole('button', { name: 'Add Display Logic' }).click();
  await page.getByRole('button', { name: 'Select an option' }).nth(2).click();
  await page.getByRole('button', { name: 'Admitted date' }).click();
  await page.getByRole('button', { name: 'Select an option' }).nth(3).click();
  await page.getByRole('button', { name: 'After' }).click();
  await page.getByRole('button', { name: 'Add Display Logic close If' }).locator('input[type="date"]').fill('2026-03-13');
  await page.getByRole('button', { name: 'Save Logic', exact: true }).click();
  await page.getByTitle('Back').click();

  // Add display logic to Additional Details
  await page.getByLabel('Side panel body').getByText('Additional details').click();
  await page.getByRole('button', { name: 'Logic' }).click();
  await page.locator('div:nth-child(4) > .digit-switch-container > .digit-switch > .digit-switch-shape-off').click();
  await page.getByRole('button', { name: 'Add Display Logic' }).click();
  await page.getByRole('button', { name: 'Select an option' }).nth(2).click();
  await page.getByRole('button', { name: 'Patient age' }).click();
  await page.getByRole('button', { name: 'Select an option' }).nth(3).click();
  await page.getByRole('button', { name: 'Less than', exact: true }).click();
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').fill('59');
  await page.getByRole('button', { name: 'Select an option' }).nth(4).click();
  await page.getByRole('button', { name: 'Hide', exact: true }).click();
  await page.getByRole('button', { name: 'Save Logic', exact: true }).click();
  await page.getByTitle('Back').click();

  // Add display logic to Map in Address section
  await page.getByRole('button', { name: 'Step 2: Address Details' }).click();
  await page.getByRole('button', { name: 'Map' }).click();
  await page.getByRole('button', { name: 'Logic' }).click();
  await page.getByRole('switch').click();
  await page.getByRole('button', { name: 'Add Display Logic' }).click();
  await page.getByRole('button', { name: 'Select an option' }).nth(2).click();
  await page.getByRole('button', { name: 'Area Selection' }).click();
  await page.getByRole('button', { name: 'Select an option' }).nth(3).click();
  await page.getByRole('button', { name: 'Is set' }).click();
  await page.getByRole('button', { name: 'Save Logic', exact: true }).click();
  await page.getByTitle('Back').click();

  // Save form and go back
  await page.getByRole('button', { name: 'Save Form' }).click();
  await page.getByRole('button', { name: 'Back to Dashboard' }).click();
}
