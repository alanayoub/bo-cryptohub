/**
 *
 * Is Valid Custom Calculation
 *
 */
export default function isValidCustomCalculation(calc) {
  const column = ['c', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const operators = ['+', '-', '*', '/', '%', '=', '<', '>', '!', '&', '|', '~', '^', '(', ')', '?', ':'];
  const allValidCharacters = [...column, ...operators];
  const uniqueCharacters = Array.from(new Set(calc.replace(/\s|\n/g,'').split('')));
  const isValid = !uniqueCharacters.some(v => !allValidCharacters.includes(v));
  return isValid;
}
