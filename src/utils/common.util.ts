export function toCamelCase(text: string): string {
  return text.replace(/-\w/g, clearAndUpper);
}

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
