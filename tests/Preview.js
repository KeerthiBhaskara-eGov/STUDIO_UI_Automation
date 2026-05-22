import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import testData from '../test-data.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Preview execution module
export async function executePreview(page) {
  const moduleDisplay = testData.moduleName.replace(/_/g, ' ');
  const serviceDisplay = testData.serviceName.replace(/_/g, ' ');
  const moduleSearch = testData.moduleName + '-';

  await page.getByText('Drafts').click();
  await page.locator('div:nth-child(3) > div:nth-child(2)').first().click();
  await page.getByRole('button', { name: 'Preview' }).click();
  await page.getByText('Apply').click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('textbox', { name: 'Name' }).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('textbox', { name: 'Name' }).fill('Tanishar');
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('textbox', { name: 'Mobile Number' }).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('textbox', { name: 'Mobile Number' }).fill('87656789878');
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('textbox', { name: 'Email' }).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('textbox', { name: 'Email' }).fill('Tani@gmail.com');
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('button', { name: 'Select an option' }).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('button', { name: 'Transgender' }).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('button', { name: 'Next' }).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('textbox', { name: 'Pincode' }).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('textbox', { name: 'Pincode' }).fill('987345');
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('textbox', { name: 'Street name' }).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('textbox', { name: 'Street name' }).fill('Ramars colony');
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('button', { name: 'Select an option' }).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('button', { name: 'BOUNDARY_FLOW_FIX_IN_01_01_01_02_HSR' }).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().locator('path').nth(3).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().locator('div').filter({ hasText: /^\+−Leaflet \| © OSM$/ }).nth(1).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('button', { name: 'Submit' }).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('button', { name: 'Next' }).click();
  const fileInput = page.locator('iframe[title="Preview Form"]').contentFrame().locator('input[type="file"]').first();
  await fileInput.setInputFiles(path.resolve(__dirname, '..', 'test-assets', 'sample-upload.pdf'));
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('button', { name: 'Next' }).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('textbox', { name: 'Patient name' }).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('textbox', { name: 'Patient name' }).fill('TanI');
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('spinbutton', { name: 'Patient age' }).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('spinbutton', { name: 'Patient age' }).fill('70');
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('textbox', { name: 'Admitted date' }).fill('2026-04-30');
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('textbox', { name: 'Additional details' }).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('textbox', { name: 'Additional details' }).fill('Malaria');
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('button', { name: 'Submit' }).click();
  await page.locator('.preview-notif-toast > svg > path').click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByText('View Application').click();
  await page.getByText('EmployeeCreateEditView').click();
  await page.getByText('Search').click();
  await page.getByText(moduleSearch).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('button', { name: 'Actions' }).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('option', { name: 'Resolve' }).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('button', { name: 'Confirm', exact: true }).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('button', { name: 'Actions' }).click();
  await page.getByText('CitizenCreateEditView').click();
  await page.getByText('My Applications').click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByText(moduleSearch).click();
  await page.locator('.preview-notif-toast > svg > path').click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('button', { name: 'Actions' }).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('option', { name: 'Feedback' }).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('radio', { name: '3' }).check();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('button', { name: 'Submit', exact: true }).click();
  await page.locator('iframe[title="Preview Form"]').contentFrame().getByRole('button', { name: 'Confirm', exact: true }).click();
  await page.getByRole('button', { name: 'Exit Preview' }).click();
}