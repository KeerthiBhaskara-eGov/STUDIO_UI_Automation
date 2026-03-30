// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: './tests/helpers/global-setup.js',
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  timeout: 600000,
  use: {
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: 1000,
      args: ['--start-maximized'],
    },
    viewport: null,
    actionTimeout: 60000,
  },
});
