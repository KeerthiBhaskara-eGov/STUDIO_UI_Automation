export async function login(page) {
  await page.goto('https://unified-dev.digit.org/digit-studio/employee/user/login');

  const usernameField = page.getByRole('textbox', { name: 'Username' }).or(page.getByRole('textbox', { name: 'User Name' }));
  await usernameField.fill('STUDIODEVB');
  await page.getByRole('textbox', { name: 'Password' }).fill('eGov@123');

  await page.getByRole('checkbox', { name: 'By clicking, I accept the' }).check();
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for login to complete
  await page.getByRole('button', { name: 'Get Started' }).waitFor({ state: 'visible' });
}
