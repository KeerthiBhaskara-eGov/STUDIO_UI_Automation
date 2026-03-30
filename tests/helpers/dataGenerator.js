import { evaluateVisibility } from './visibilityEvaluator.js';

/**
 * Generates a test value for a single field based on its type, format,
 * and validation regex. Returns a string value or null for special formats
 * that need page-level interaction (dropdown, map, hierarchy).
 */
export function generateValue(field) {
  const { type, format, validation } = field;
  const regex = validation?.regex || '';

  if (type === 'date' || format === 'date') {
    return getFutureDate(30);
  }

  if (format === 'mobileNumber' || type === 'mobileNumber') {
    return '9876567876';
  }

  if (type === 'integer' || format === 'number') {
    return generateNumberFromRegex(regex);
  }

  // Dropdowns — return first value if available so callers can click by name;
  // return null when values must come from MDMS/page (hierarchyDropdown, geolocation, MDMS fields)
  if (format === 'hierarchyDropdown' || format === 'geolocation') {
    return null;
  }
  if (type === 'enum' || format === 'radioordropdown') {
    return field.values?.[0] ?? null;
  }

  if (type === 'string' || format === 'text') {
    return generateTextFromRegex(regex);
  }

  return 'TestValue';
}

function generateNumberFromRegex(regex) {
  // Fixed-length number e.g. {6} → 6 digits
  const fixedLen = regex.match(/\{(\d+)\}/);
  if (fixedLen) return '5'.repeat(parseInt(fixedLen[1]));
  // Default: 65 — safely > 59 to satisfy common "age >= 59" visibility conditions
  return '65';
}

function generateTextFromRegex(regex) {
  if (!regex) return 'TestValue';

  // Email
  if (regex.includes('@')) return 'test@example.com';

  // Pincode: starts with non-zero, followed by 5 digits
  if (regex.match(/\[1-9\].*\{5\}/)) return '560001';

  // Letters only (no digits allowed)
  if (regex.includes('A-Za-z') && !regex.includes('0-9')) return 'TestName';

  // Digits only
  if (!regex.includes('A-Za-z') && regex.includes('0-9')) {
    const fixedLen = regex.match(/\{(\d+)\}/);
    if (fixedLen) return '5'.repeat(parseInt(fixedLen[1]));
    return '25';
  }

  // Alphanumeric (with optional specials like space, underscore, comma)
  if (regex.includes('A-Za-z0-9')) return 'Test123';

  return 'TestValue';
}

/**
 * Iterates over a list of field property definitions, evaluates visibility
 * expressions with accumulated values, and returns an array of
 * { field, value, visible } entries in order.
 *
 * @param {Array}  properties   - field property definitions from service config
 * @param {Object} seedValues   - pre-populated values (e.g. from a prior section)
 * @returns {Array<{ field, value, visible }>}
 */
export function buildFieldData(properties = [], seedValues = {}) {
  const currentValues = { ...seedValues };
  const results = [];

  for (const field of properties) {
    const visible = evaluateVisibility(field.visibilityExpression, currentValues);
    const value = visible ? generateValue(field) : null;

    // Track filled value so subsequent visibility expressions can use it
    if (visible && value !== null) {
      currentValues[field.name] = value;
    }

    results.push({ field, value, visible });
  }

  return results;
}

function getFutureDate(daysAhead) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
