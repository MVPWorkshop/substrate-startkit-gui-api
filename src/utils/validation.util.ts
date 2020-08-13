import { ValidatorsSchema } from 'express-validator/src/middlewares/schema';

// Wrapper for custom validator inside express validator schema
const customValidator = (validateFunction: (input: any) => boolean): ValidatorsSchema['custom'] => {
  return {
    options: input => {
      if (input !== undefined) {
        return validateFunction(input)
      } else {
        return true;
      }
    }
  }
}

// Function which takes array of strings and checks if input is one of the values
export const validateEnum = (enumArray: string[]) => customValidator((input) => {
  return enumArray.includes(input);
})

