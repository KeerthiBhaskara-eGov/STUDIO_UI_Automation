/**
 * Safely evaluates a DIGIT Studio visibility expression against current field values.
 * Returns true if the field should be shown, false if hidden.
 *
 * Expressions use the pattern: values?.fieldName?.someCheck
 * e.g. "values?.Patientname?.includes('I')"
 *      "!(values?.Patientage < '59')"
 *      "new Date(values?.Admitteddate).getTime() > new Date('2026-03-13').getTime()"
 */
export function evaluateVisibility(expression, values = {}) {
  if (!expression) return true;
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function('values', `"use strict"; return !!(${expression});`);
    return fn(values);
  } catch {
    return true; // Default to visible if expression cannot be evaluated
  }
}
