import { setNonEnumProp } from './set.js'

// To mimic native error classes and to print correctly with `util.inspect()`:
//  - `error.name` should be assigned on the prototype, not on the instance
//  - the constructor `name` must be set too
export const setErrorName = function (CustomErrorClass, name) {
  validateErrorName(name)
  setNonEnumProp(CustomErrorClass, 'name', name)
  setNonEnumProp(CustomErrorClass.prototype, 'name', name)
}

// Validate `error.name` looks like `ExampleError` for consistency with
// native error classes and common practices that users might expect
const validateErrorName = function (name) {
  if (typeof name !== 'string') {
    throw new TypeError(`Error name must be a string: ${name}`)
  }

  validateNativeErrors(name)

  if (!name.endsWith(ERROR_NAME_END) || name === ERROR_NAME_END) {
    throw new Error(`Error name "${name}" must end with "${ERROR_NAME_END}"`)
  }

  validateErrorNamePattern(name)
}

const validateNativeErrors = function (errorName) {
  if (NATIVE_ERRORS.has(errorName)) {
    throw new Error(`Error name "${errorName}" must not be a native class.`)
  }
}

const NATIVE_ERRORS = new Set([
  // JavaScript core errors
  'Error',
  'ReferenceError',
  'TypeError',
  'SyntaxError',
  'RangeError',
  'URIError',
  'EvalError',
  'AggregateError',

  // Node.js specific
  'SystemError',
  'AssertionError',
  'Warning',
  'UnhandledPromiseRejection',

  // DOM specific
  'DOMException',
])

const validateErrorNamePattern = function (errorName) {
  if (errorName[0] !== errorName.toUpperCase()[0]) {
    throw new Error(
      `Error name "${errorName}" must start with an uppercase letter.`,
    )
  }

  if (!ERROR_NAME_REGEXP.test(errorName)) {
    throw new Error(`Error name "${errorName}" must only contain letters.`)
  }
}

const ERROR_NAME_END = 'Error'
const ERROR_NAME_REGEXP = /[A-Z][a-zA-Z]*Error$/u
