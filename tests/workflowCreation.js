// Workflow creation module
export async function createWorkflow(page) {
  await page.getByRole('button', { name: 'Define Process Flow' }).click();

  await page.getByText('Click to Add').first().click();
  await page.getByText('Click to Add').nth(2).click();
  await page.getByText('Click to Add').nth(2).click();

  await page.getByRole('button', { name: 'Right Action' }).click();
  await page.locator('div').filter({ hasText: /^Start stateEnd stateEnd state$/ }).nth(2).click();
  await page.getByRole('button', { name: 'Right Action' }).nth(1).click();
  await page.getByText('Start stateEnd stateEnd stateProcess stateAction').click();
  await page.getByRole('heading', { name: 'Process state' }).nth(1).click();
  await page.getByText('Start stateEnd stateEnd stateProcess stateAction').click();

  await page.getByRole('heading', { name: 'Start state' }).nth(1).click();
  await page.getByRole('textbox', { name: 'State name' }).click();
  await page.getByRole('textbox', { name: 'State name' }).fill('create');
  await page.getByRole('textbox', { name: 'Add a service request form' }).click();
  await page.getByText('Hospital').click();
  await page.getByRole('button', { name: 'Update Properties' }).click();

  await page.locator('rect').nth(5).click();
  await page.getByRole('textbox', { name: 'Action name' }).click();
  await page.getByRole('textbox', { name: 'Action name' }).fill('Applied');
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('checkbox').first().check();
  await page.locator('div:nth-child(3) > .digit-slider-container > .slider-content > .slider-body').click();
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('checkbox').nth(1).check();
  await page.locator('div:nth-child(3) > .digit-slider-container > .slider-content > .slider-body').click();
  await page.getByRole('button', { name: 'Update Action' }).click();

  await page.getByRole('heading', { name: 'Process state' }).nth(1).click();
  await page.getByRole('textbox', { name: 'State name' }).click();
  await page.getByRole('textbox', { name: 'State name' }).fill('pending for verification');
  await page.getByRole('textbox', { name: 'Add checklists' }).click();
  await page.getByText('Feedback checklist').click();
  await page.locator('div:nth-child(3) > .digit-slider-container > .slider-content > .slider-body').click();
  await page.getByRole('button', { name: 'Update Properties' }).click();

  await page.locator('g:nth-child(2) > rect').click();
  await page.getByRole('textbox', { name: 'Action name' }).click();
  await page.getByRole('textbox', { name: 'Action name' }).fill('sent back');
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('checkbox').first().check();
  await page.locator('div:nth-child(3) > .digit-slider-container > .slider-content > .slider-body').click();
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('checkbox').nth(1).check();
  await page.locator('div:nth-child(3) > .digit-slider-container > .slider-content > .slider-body').click();
  await page.locator('.digit-switch-shape-off').first().click();
  await page.locator('div:nth-child(6) > .digit-switch-container > .digit-switch').click();
  await page.getByRole('button', { name: 'Update Action' }).click();

  await page.locator('div').filter({ hasText: /^Process state$/ }).nth(2).click();
  await page.getByRole('textbox', { name: 'State name' }).click();
  await page.getByRole('textbox', { name: 'State name' }).fill('pending for correction');
  await page.getByRole('textbox', { name: 'Add checklists' }).click();
  await page.getByText('Feedback checklist').click();
  await page.getByRole('textbox').nth(4).click();
  await page.locator('div:nth-child(3) > .digit-slider-container > .slider-content > .slider-body').click();
  await page.getByRole('button', { name: 'Update Properties' }).click();

  await page.getByRole('button', { name: 'Right Action' }).nth(2).click();
  await page.getByRole('button', { name: 'Left Action' }).nth(2).click();

  await page.locator('g:nth-child(3) > rect').click();
  await page.getByRole('textbox', { name: 'Action name' }).click();
  await page.getByRole('textbox', { name: 'Action name' }).fill('Edit');
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('checkbox').first().check();
  await page.locator('div:nth-child(3) > .digit-slider-container > .slider-content > .slider-body').click();
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('checkbox').nth(1).check();
  await page.locator('div:nth-child(3) > .digit-slider-container > .slider-content > .slider-body').click();
  await page.locator('.digit-switch-shape-off').first().click();
  await page.locator('div:nth-child(6) > .digit-switch-container > .digit-switch').click();
  await page.getByRole('button', { name: 'Update Action' }).click();

  await page.getByRole('button', { name: 'Right Action' }).nth(1).click();
  await page.getByRole('button', { name: 'Left Action' }).first().click();
  await page.getByRole('button', { name: 'Right Action' }).nth(1).click();
  await page.getByRole('button', { name: 'Left Action' }).nth(1).click();

  await page.locator('g:nth-child(4) > rect').click();
  await page.getByRole('textbox', { name: 'Action name' }).click();
  await page.getByRole('textbox', { name: 'Action name' }).fill('Resolve');
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('checkbox').first().check();
  await page.locator('div:nth-child(3) > .digit-slider-container > .slider-content > .slider-body').click();
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('checkbox').nth(1).check();
  await page.locator('.digit-switch').click();
  await page.locator('.digit-switch').click();
  await page.getByRole('button', { name: 'Update Action' }).click();

  await page.locator('g:nth-child(5) > rect').click();
  await page.getByRole('textbox', { name: 'Action name' }).click();
  await page.getByRole('textbox', { name: 'Action name' }).fill('Reject');
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('checkbox').first().check();
  await page.locator('div:nth-child(3) > .digit-slider-container > .slider-content > .slider-body').click();
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('checkbox').nth(1).check();
  await page.getByText('Allow users to add remarks or').click();
  await page.locator('.digit-switch').click();
  await page.getByRole('button', { name: 'Update Action' }).click();

  await page.getByRole('heading', { name: 'End state' }).nth(1).click();
  await page.getByRole('textbox', { name: 'State name' }).click();
  await page.getByRole('textbox', { name: 'State name' }).fill('Resolved');
  await page.getByRole('textbox', { name: 'Add checklists' }).click();
  await page.getByText('Feedback checklist').click();
  await page.getByRole('textbox').nth(3).click();
  await page.getByRole('checkbox').nth(1).check();
  await page.locator('div:nth-child(3) > .digit-slider-container > .slider-content > .slider-body').click();
  await page.getByRole('button', { name: 'Update Properties' }).click();
  await page.getByRole('button', { name: 'Update Properties' }).click();


  await page.getByRole('heading', { name: 'End state' }).nth(1).click();
  await page.getByRole('textbox', { name: 'State name' }).click();
  await page.getByRole('textbox', { name: 'State name' }).fill('Rejected');
  await page.getByRole('textbox', { name: 'Add checklists' }).click();
  await page.getByText('Feedback checklist').click();
  await page.getByRole('textbox').nth(3).click();
  await page.getByRole('checkbox').first().check();
  await page.locator('div:nth-child(3) > .digit-slider-container > .slider-content > .slider-body').click();
  await page.getByRole('button', { name: 'Update Properties' }).click();
  await page.getByRole('button', { name: 'Update Properties' }).click();

  await page.getByRole('button', { name: 'Publish Application' }).click();
  await page.getByRole('button', { name: 'Publish', exact: true }).click();
  await page.goto('https://unified-uat.digit.org/digit-studio/employee/servicedesigner/LandingPage');
}
