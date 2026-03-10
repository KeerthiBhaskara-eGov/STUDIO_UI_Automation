// Roles creation module
export async function createRoles(page) {
  await page.getByRole('button', { name: 'Define Roles' }).click();
  await page.locator('div').filter({ hasText: /^Create New Role$/ }).click();
  await page.getByRole('textbox', { name: 'Role name' }).click();
  await page.getByRole('textbox', { name: 'Role name' }).fill('Hospital Management');
  await page.getByRole('checkbox').first().check();
  await page.getByRole('checkbox').nth(1).check();
  await page.getByRole('checkbox').nth(2).check();
  await page.getByRole('button', { name: 'Create Role' }).click();
  await page.getByRole('link', { name: 'Service Designer' }).click();
}
