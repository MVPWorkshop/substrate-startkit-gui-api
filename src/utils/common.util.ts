/**
 * @description Converts some-text to someText
 * @param text
 */
export function toCamelCase(text: string): string {
  return text.replace(/-\w/g, clearAndUpper);
}

/**
 * @description Converts some-text to some_text
 * @param text
 */
export function toSnakeCase(text: string): string {
  return text.replace(/\W+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join('_');
}

/**
 * @description Converts some-text to SomeText
 * @param text
 */
export function toPascalCase(text: string): string {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

export function clearAndUpper(text: string): string {
  return text.replace(/-/, "").toUpperCase();
}

// Function for generating tabs
export function tabs(numberOfTabs: number): string {
  let tabs = '';

  for (let i = 0; i < numberOfTabs; i++) {
    tabs += '\t';
  }

  return tabs;
}
