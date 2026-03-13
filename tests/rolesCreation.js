// Roles creation module
export async function createRoles(page) {
  await page.getByRole('button', { name: 'Manage Roles' }).click();
  await page.getByRole('button', { name: 'Create New Role' }).click();
  await page.getByRole('textbox', { name: 'Role name' }).click();
  await page.getByRole('textbox', { name: 'Role name' }).fill('Employee');
  await page.getByRole('checkbox', { name: 'Editor' }).check();
  await page.getByRole('checkbox', { name: 'Viewer' }).check();
  await page.getByRole('checkbox', { name: 'Creator' }).check();
  await page.getByRole('button', { name: 'Create Role', exact: true }).click();
  await page.getByRole('button', { name: 'Back', exact: true }).click();
}
