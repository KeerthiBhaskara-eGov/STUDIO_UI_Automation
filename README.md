# STUDIO UI Automation

End-to-end UI automation test suite for the **DIGIT Studio** platform, covering service design, employee application management, and citizen application flows.

## Tech Stack

- **[Playwright](https://playwright.dev/)** v1.57.0 — Browser automation and test framework
- **Node.js** v18+
- **ES Modules**

## Project Structure

```
├── tests/
│   ├── Designer.spec.js                     # Designer module complete flow
│   ├── EMPApplication.spec.js               # Employee application lifecycle
│   ├── Citizen_Applicationflow.spec.js      # Citizen application journey
│   ├── helpers/
│   │   └── login.js                         # Shared login utility
│   ├── serviceDetails.js                    # Service/Module creation steps
│   ├── formCreation.js                      # Form builder with validations
│   ├── rolesCreation.js                     # Role management
│   ├── workflowCreation.js                  # Workflow state machine setup
│   ├── notificationsCreationtoworkflow.js   # Notification configuration
│   ├── emp_applicationcreation.js           # Employee-side app creation
│   └── emp_applicationcompletionflow.js     # Employee-side app resolution
├── test-assets/
│   └── sample-upload.pdf                    # File used in upload tests
├── test-data.json                           # Runtime-generated test data
└── playwright.config.js                     # Playwright configuration
```

## Setup

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run a specific test suite
npx playwright test Designer.spec.js
npx playwright test EMPApplication.spec.js
npx playwright test Citizen_Applicationflow.spec.js

# Run with headed browser (visible UI)
npx playwright test --headed

# View the HTML test report
npx playwright show-report
```

## Test Suites

### Service Designer (E2E)
Tests the full service design lifecycle:
1. Create module and service with random names
2. Build multi-section forms (address, document upload, patient details)
3. Add field validations and display logic
4. Define roles and permissions
5. Configure workflow state machine (create → pending verification → resolved/rejected)
6. Set up email and SMS notifications
7. Publish the service

### Employee Application
Tests the employee-side application flow:
1. Login to the employee portal
2. Create a new application by filling multi-step forms
3. Resolve the application and provide feedback (rating + comments)

### Citizen Application
Tests the citizen-facing journey:
1. Login via mobile OTP
2. Browse and select a service
3. Complete a multi-step application form with document uploads
4. Submit and track the application
5. Application resolution and feedback

## How It Works

### Code Structure & UI Interaction

The test suite is organized into **spec files** (test entry points) and **reusable module files** (shared step functions). Spec files (e.g., `Designer.spec.js`) orchestrate the flow by importing and calling functions from module files in sequence. This keeps each step isolated and reusable across different test suites.

#### Locator Strategies

Playwright interacts with the DIGIT Studio UI using several locator strategies:

- **Role-based selectors** — `getByRole('button', { name: 'Next' })`, `getByRole('textbox', { name: 'Email' })` — target elements by their accessible role and label. This mirrors how a real user identifies UI elements.
- **Text-based selectors** — `getByText('View Application')` — click or interact with elements by their visible text content.
- **CSS selectors** — `page.locator('input[type="file"]')` — used when role/text selectors aren't sufficient, such as hidden file input elements.
- **Filter selectors** — `locator('div').filter({ hasText: /pattern/ })` — narrow down elements using regex patterns, useful for complex UI components like maps.

#### Multi-Step Form Navigation

The DIGIT Studio UI presents forms as a wizard with multiple pages. The automation fills each page and clicks **"Next"** to advance. On the final step, it clicks **"Submit"** to complete the form. The code follows this exact sequence:

1. Fill all fields on the current page (text inputs, dropdowns, checkboxes)
2. Click `Next` to move to the next page — the UI transitions to show the next set of fields
3. Repeat until the last page, then click `Submit`

#### File Uploads

File uploads target the hidden `<input type="file">` element directly using `page.locator('input[type="file"]')` and call `setInputFiles()` with an absolute path resolved via `path.resolve()`. This bypasses the OS file dialog, which Playwright cannot interact with. The UI reacts by showing the uploaded file name and a preview/confirmation.

#### Dropdown & Option Selection

Dropdowns in DIGIT Studio are custom components (not native `<select>` elements). The automation:
1. Clicks the dropdown trigger — `getByRole('button', { name: 'Select an option' })` — which opens a floating options list
2. Clicks the desired option — `getByRole('button', { name: 'Transgender' })` — which closes the dropdown and displays the selected value

#### Runtime Test Data & Cross-Suite Communication

Some tests depend on data created by previous tests (e.g., the employee application flow needs the service name created by the designer flow). This is handled via `test-data.json`:

1. **`serviceDetails.js`** generates random module/service names (e.g., `Module_licrh55`) and writes them to `test-data.json`
2. Subsequent tests import `test-data.json` to read these values and locate the correct service in the UI
3. **`emp_applicationcreation.js`** extracts the application number from the URL after submission and writes it back to `test-data.json` for the completion flow to use

#### Waits & Timing

- **`slowMo: 1000`** in Playwright config adds a 1-second pause between every action, giving the UI time to render and stabilize
- **`actionTimeout: 60000`** allows up to 60 seconds for any single action (click, fill, etc.) to complete — useful for slow API-backed UI transitions
- **`waitForURL()`** is used after form submission to wait until the browser navigates to a success page before proceeding
- Playwright's built-in auto-waiting ensures elements are visible and actionable before interacting with them

#### Authentication Flows

Two distinct login mechanisms are automated:

- **Employee login** (`helpers/login.js`) — enters username/password credentials, waits for the dashboard, and validates login via the "Get Started" button
- **Citizen login** (`Citizen_Applicationflow.spec.js`) — enters a mobile number, fills a 6-digit OTP across individual input fields, selects a location via radio button, and confirms

## Configuration

Key settings in `playwright.config.js`:

| Setting | Value | Description |
|---------|-------|-------------|
| `workers` | 1 | Sequential execution (no parallelism) |
| `timeout` | 600,000 ms | 10-minute test timeout |
| `actionTimeout` | 60,000 ms | 60-second action timeout |
| `slowMo` | 1,000 ms | 1-second delay between actions |
| `retries` | 2 (CI) / 0 (local) | Retry failed tests in CI |
| `reporter` | html | Generates HTML report |

## Test Data

Test data is generated at runtime and persisted in `test-data.json`. This includes randomly generated module/service names and application numbers used across test suites.

## Environment

Tests run against: `https://unified-dev.digit.org/digit-studio/`
