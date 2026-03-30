import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const DATA_FILE = path.join(ROOT, 'test-data.json');
const CONFIG_FILE = path.join(ROOT, 'service-config.json');

/**
 * Global setup — runs once before all tests.
 *
 * Reads module and service names from service-config.json and writes them
 * into test-data.json so that EMPApplication.spec.js can run standalone
 * without needing Designer.spec.js to run first.
 *
 * Preserves any existing applicationNumber already stored in test-data.json.
 */
export default async function globalSetup() {
  const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));

  const moduleName = config.module;
  const serviceName = config.service;

  if (!moduleName || !serviceName) {
    console.warn('[global-setup] service-config.json is missing "module" or "service" — skipping test-data sync.');
    return;
  }

  // Preserve existing data (e.g. applicationNumber from a prior run)
  let existing = {};
  if (fs.existsSync(DATA_FILE)) {
    try {
      existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    } catch {
      existing = {};
    }
  }

  const updated = {
    ...existing,
    moduleName,
    serviceName,
    syncedFromConfig: true,
    syncedAt: new Date().toISOString(),
  };

  fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2));
  console.log(`[global-setup] test-data.json synced → module: "${moduleName}", service: "${serviceName}"`);
}
