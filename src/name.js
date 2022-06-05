// To mimic native error types and to print correctly with `util.inspect()`:
//  - `error.name` should be assigned on the prototype, not on the instance
//  - the constructor `name` must be set too
export const setErrorName = function (ErrorType, name) {
  validateErrorName(name)
  setNonEnumProp(ErrorType, 'name', name)
  setNonEnumProp(ErrorType.prototype, 'name', name)
}

// Ensure those properties are not enumerable
const setNonEnumProp = function (object, propName, value) {
  // eslint-disable-next-line fp/no-mutating-methods
  Object.defineProperty(object, propName, {
    value,
    writable: false,
    enumerable: false,
    configurable: true,
  })
}

// Validate `error.name` looks like `ExampleError` for consistency with
// native error types and common practices that users might expect
const validateErrorName = function (name) {
  if (typeof name !== 'string') {
    throw new TypeError(`Error name must be a string: ${name}`)
  }

  if (!name.endsWith(ERROR_NAME_END) || name === ERROR_NAME_END) {
    throw new Error(`Error name "${name}" must end with "${ERROR_NAME_END}"`)
  }

  validateErrorNamePattern(name)
}

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
