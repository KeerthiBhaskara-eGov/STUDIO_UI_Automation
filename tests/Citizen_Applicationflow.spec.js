import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';
import testData from '../test-data.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.use({
  viewport: {
    height: 750,
    width: 1500
  }
});

test('test', async ({ page }) => {
  await page.goto('https://unified-dev.digit.org/digit-studio/citizen/login');
  await page.getByRole('textbox', { name: 'Enter your mobile number' }).click();
  await page.getByRole('textbox', { name: 'Enter your mobile number' }).fill('9876567876');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('#login-otp-standalone-otp-otp-0').fill('1');
  await page.locator('#login-otp-standalone-otp-otp-1').fill('2');
  await page.locator('#login-otp-standalone-otp-otp-2').fill('3');
  await page.locator('#login-otp-standalone-otp-otp-3').fill('4');
  await page.locator('#login-otp-standalone-otp-otp-4').fill('5');
  await page.locator('#login-otp-standalone-otp-otp-5').fill('6');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('#select-location-standalone-radio-radio-dev').check();
  await page.locator('#select-location-standalone-submitbarincardindesktopview-btn').click();
  const serviceDisplay = testData.serviceName.replace(/_/g, ' ');
  await page.getByRole('heading', { name: serviceDisplay }).click();
  await page.getByRole('button', { name: 'Apply' }).first().click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('qwerty');
  await page.getByRole('textbox', { name: 'Mobile Number' }).click();
  await page.getByRole('textbox', { name: 'Mobile Number' }).fill('9876567876');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('qwerty@gmail.com');
  await page.getByRole('button', { name: 'Select an option' }).click();
  await page.getByRole('button', { name: 'Transgender' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Pincode' }).click();
  await page.getByRole('textbox', { name: 'Pincode' }).fill('765890');
  await page.getByRole('textbox', { name: 'Streetname' }).click();
  await page.getByRole('textbox', { name: 'Streetname' }).fill('ST 123');
  await page.getByRole('button', { name: 'Select an option' }).click();
  await page.getByRole('button', { name: 'BOUNDARY_FLOW_FIX_IN_01_01_01_02_HSR' }).click();
  await page.locator('.digit-text-input-customIcon > path').click();
  await page.locator('div').filter({ hasText: /^\+−Leaflet \| © OSM$/ }).nth(1).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  const fileInput = page.locator('input[type="file"]').first();
  await fileInput.setInputFiles(path.resolve(__dirname, '..', 'test-assets', 'sample-upload.pdf'));
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Patient Name' }).click();
  await page.getByRole('textbox', { name: 'Patient Name' }).fill('Keerthi');
  await page.getByRole('textbox', { name: 'Admitted Date' }).fill('2026-03-28');
  await page.getByRole('textbox', { name: 'Patient Id' }).click();
  await page.getByRole('textbox', { name: 'Patient Id' }).fill('123');
  await page.getByRole('textbox', { name: 'Additional Details' }).click();
  await page.getByRole('textbox', { name: 'Additional Details' }).fill('suffering malaria');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('View Application').click();
  await page.getByRole('button', { name: 'Actions' }).click();
  await page.getByRole('option', { name: 'Resolve' }).click();
  await page.getByRole('button', { name: 'Confirm', exact: true }).click();
  await page.getByRole('button', { name: 'Actions' }).click();
  await page.getByRole('option', { name: 'Feedback' }).click();
  await page.getByRole('radio', { name: '5' }).check();
  await page.getByRole('textbox', { name: 'Feedback to improve service' }).click();
  await page.getByRole('textbox', { name: 'Feedback to improve service' }).fill('Performed well');
  await page.getByRole('button', { name: 'SUBMIT', exact: true }).click();
  await page.getByRole('button', { name: 'Confirm', exact: true }).click();
  await page.pause();

});
