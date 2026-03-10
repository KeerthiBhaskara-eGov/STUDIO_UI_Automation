export async function login(page) {
  await page.goto('https://unified-uat.digit.org/digit-studio/employee/user/login');

  await page.getByRole('textbox', { name: 'User Name' }).fill('STUDIOUAT');
  await page.getByRole('textbox', { name: 'Password' }).fill('eGov@123');

  await page.getByRole('checkbox', { name: 'By clicking, I accept the' }).check();
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for login to complete
  await page.getByRole('button', { name: 'App Dashboard' }).waitFor({ state: 'visible' });
}
