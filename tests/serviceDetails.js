// serviceCreation.js
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'test-data.json');

export async function createService(page) {
  await page.getByRole('button', { name: 'App Dashboard' }).click();
  await page.locator('div').filter({ hasText: /^Create a New Service$/ }).click();

  const randomModuleName = `Module_${Math.random().toString(36).substring(2, 9)}`;
  const randomServiceName = `Service_${Math.random().toString(36).substring(2, 9)}`;

  await page.getByRole('textbox', { name: 'Enter application name' }).click();
  await page.getByRole('textbox', { name: 'Enter application name' }).fill(randomModuleName);
  await page.getByRole('textbox', { name: 'Enter module name' }).click();
  await page.getByRole('textbox', { name: 'Enter module name' }).fill(randomServiceName);
  await page.getByRole('button', { name: 'Proceed' }).click();

  const data = {
    moduleName: randomModuleName,
    serviceName: randomServiceName,
    createdAt: new Date().toISOString()
  };

  // Save to JSON file
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  console.log(`Service data saved to ${DATA_FILE}`);

  return data;
}

// Helper function to read the saved data
export function getServiceData() {
  if (fs.existsSync(DATA_FILE)) {
    const content = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(content);
  }
  throw new Error('No service data found. Run createService first.');
}