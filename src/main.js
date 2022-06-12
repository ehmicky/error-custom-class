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
      fixPrototype(this, new.target.prototype)
      // eslint-disable-next-line fp/no-this
      fixCause(this, opts)
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
const getErrorOpts = function (opts) {
  return 'cause' in opts ? { cause: opts.cause } : {}
}

// If the global `Error` type was monkey-patched, it is likely to return an
// `Error` instance.
//   - Returning a value from a constructor is a bad practice since it changes
//     the prototype of the new instance.
//   - This means `instanceof` or `constructor` checks will fail, and child
//     prototype properties will not be inherited
// A common library that does this is `error-cause` which polyfills
// `error.cause`.
// We fix this by detecting such situation and re-setting the prototype.
// We use `new.target` so that this works even if `ErrorType` is subclassed
// itself.
const fixPrototype = function (context, newTargetProto) {
  if (Object.getPrototypeOf(context) !== newTargetProto) {
    // eslint-disable-next-line fp/no-mutating-methods
    Object.setPrototypeOf(context, newTargetProto)
  }
}

// Polyfills `error.cause` for Node <16.9.0 and old browsers
const fixCause = function (error, opts) {
  if ('cause' in opts && !('cause' in error && opts.cause === error.cause)) {
    // eslint-disable-next-line fp/no-mutating-methods
    Object.defineProperty(error, 'cause', {
      value: opts.cause,
      enumerable: false,
      writable: true,
      configurable: true,
    })
  }
}
