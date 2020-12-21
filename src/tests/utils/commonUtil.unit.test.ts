import * as CommonUtil from '../../utils/common.util';

describe("'Kebab case' text will become 'Camel case' text", () => {
  const value = 'test-text';
  const expectedValue = 'testText'

  test(`${value} -> ${expectedValue}`, () => {
    expect(CommonUtil.toCamelCase(value)).toEqual(expectedValue);
  })
})

describe("'Kebab case' text will become 'Pascal case' text", () => {
  const value = 'test-Text';
  const expectedValue = 'TestText'

  test(`${value} -> ${expectedValue}`, () => {
    expect(CommonUtil.toPascalCase(value)).toEqual(expectedValue);
  })
})

describe("'Kebab case' text will become 'Snake case' text", () => {
  const value = 'Test-text';
  const expectedValue = 'test_text'

  test(`${value} -> ${expectedValue}`, () => {
    expect(CommonUtil.toSnakeCase(value)).toEqual(expectedValue);
  })
})
