import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import testData from '../test-data.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
test('test', async ({ page }) => {
  test.setTimeout(120000);
  const moduleDisplay = testData.moduleName.replace(/_/g, ' ');
  const serviceDisplay = testData.serviceName.replace(/_/g, ' ');
  const today = new Date();
  const currentDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  await page.goto('https://unified-uat.digit.org/digit-studio/employee/user/login?ts=1771567551056');
  await page.getByRole('textbox', { name: 'User Name' }).click();
  await page.getByRole('textbox', { name: 'User Name' }).fill('STUDIOUAT');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('eGov@123');
  await page.getByRole('checkbox', { name: 'By clicking, I accept the' }).check();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'App Dashboard' }).click();
  await page.getByRole('button', { name: 'View More' }).click();
  await page.getByRole('heading', { name: `${moduleDisplay} ${serviceDisplay}` }).click();
  await page.getByRole('button', { name: serviceDisplay }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Sundar');
  await page.getByRole('textbox', { name: 'Mobile Number' }).click();
  await page.getByRole('textbox', { name: 'Mobile Number' }).fill('9876567876');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('qwerty@gmail.com');
  await page.getByRole('textbox', { name: 'Gender' }).click();
  await page.getByText('Male', { exact: true }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Patient Name' }).click();
  await page.getByRole('textbox', { name: 'Patient Name' }).fill('Prabakar');
  const patientAge = page.getByRole('spinbutton', { name: 'Patient Age' });
  await patientAge.waitFor({ state: 'visible' });
  await patientAge.fill('20');
  await patientAge.press('Tab');

  const admittedDateLocators = [
    page.getByRole('textbox', { name: 'Admitted Date' }),
    page.getByLabel('Admitted Date'),
    page.locator('input[aria-label*="Admitted Date" i]').first(),
    page.locator('input[placeholder*="Admitted Date" i]').first(),
    page.locator('input[name*="admitted" i]').first(),
    page.locator('input[type="date"]').first(),
  ];

  let admittedDateFilled = false;
  for (const admittedDateInput of admittedDateLocators) {
    try {
      await admittedDateInput.waitFor({ state: 'visible', timeout: 2000 });
      await admittedDateInput.click({ timeout: 2000 });
      await admittedDateInput.fill(currentDate, { timeout: 2000 });
      admittedDateFilled = true;
      break;
    } catch {
      // Try next selector so the test does not hang on a single locator.
    }
  }

  if (!admittedDateFilled) {
    throw new Error('Unable to find/fill the Admitted Date field');
  }
  await page.getByRole('textbox', { name: 'Patient Gender' }).click();
  await page.getByText('Male', { exact: true }).click();
  await page.getByRole('radio', { name: 'Availability Yes No' }).check();
  await page.getByRole('textbox', { name: 'Patient Mobile Number' }).click();
  await page.getByRole('textbox', { name: 'Patient Mobile Number' }).fill('98765432127');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Pincode' }).click();
  await page.getByRole('textbox', { name: 'Pincode' }).fill('987656');
  await page.getByRole('textbox', { name: 'Streetname' }).click();
  await page.getByRole('textbox', { name: 'Streetname' }).fill('ST 123');
  await page.getByRole('textbox', { name: 'Select Village' }).click();
  await page.getByText('Kofar Fada kan 08', { exact: true }).click();
  await page.locator('.digit-text-input-customIcon > path').click();
  await page.locator('div').filter({ hasText: /^\+−Leaflet \| © OSM$/ }).nth(1).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  const fileInput = page.locator('input[type="file"]').first();
  await fileInput.setInputFiles(path.resolve(__dirname, '..', 'test-assets', 'sample-upload.pdf'));
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForURL(/\/response\?.*isSuccess=true/, { timeout: 30000 });

  const applicationNumber = new URL(page.url()).searchParams.get('applicationNumber');
  const DATA_FILE = path.join(process.cwd(), 'test-data.json');
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  data.applicationNumber = applicationNumber;
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  await page.getByText('View Application').click();
});
