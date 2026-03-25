import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import testData from '../test-data.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createApplication(page) {
  const moduleDisplay = testData.moduleName.replace(/_/g, ' ');
  const serviceDisplay = testData.serviceName.replace(/_/g, ' ');
  const today = new Date();
  const currentDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByRole('button', { name: 'View More' }).click();
  await page.getByRole('heading', { name: `${moduleDisplay} ${serviceDisplay}` }).click();
  await page.getByRole('button', { name: moduleDisplay }).click();
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
  await page.getByRole('textbox', { name: 'Admitted Date' }).fill(currentDate);
  await page.getByRole('textbox', { name: 'Patient Id' }).click();
  await page.getByRole('textbox', { name: 'Patient Id' }).fill('90');
  await page.getByRole('textbox', { name: 'Additional Details' }).click();
  await page.getByRole('textbox', { name: 'Additional Details' }).fill('Malaria');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForURL(/\/response\?.*isSuccess=true/, { timeout: 30000 });

  const applicationNumber = new URL(page.url()).searchParams.get('applicationNumber');
  const DATA_FILE = path.join(process.cwd(), 'test-data.json');
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  data.applicationNumber = applicationNumber;
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  await page.getByText('View Application').click();
}
