import { defaultOnCreate, getOnCreateOpts } from './create.js'
import { setErrorName } from './name.js'

// Create an error type with a specific `name`.
// The constructor allows setting either `error.cause` or any properties:
// `new ErrorType('message', { anyProp: true })`
export default function errorType(name, onCreate = defaultOnCreate) {
  const ErrorType = class extends Error {
    constructor(message, opts = {}) {
      validateOpts(opts)
      super(message, getErrorOpts(opts))
      // eslint-disable-next-line fp/no-this
      onCreate(this, getOnCreateOpts(this, opts))
    }
  }
  setErrorName(ErrorType, name)
  return ErrorType
}

// Due to `error.cause`, the second argument should always be a plain object
// We enforce no third argument since this is cleaner.
const validateOpts = function (opts) {
  if (typeof opts !== 'object' || opts === null) {
    throw new TypeError(
      `Error's second argument must be a plain object: ${opts}`,
    )
  }
}

// Passing `{ cause: undefined }` creates `error.cause`, unlike passing `{}`
const getErrorOpts = function ({ cause }) {
  return cause === undefined ? {} : { cause }
}
