import { defaultOnCreate, getOnCreateParams } from './create.js'
import { setErrorName } from './name.js'
import { setNonEnumProp } from './set.js'

// Create an error type with a specific `name`.
// The constructor allows setting either `error.cause` or any properties:
// `new ErrorType('message', { anyProp: true })`
export default function errorType(name, onCreate = defaultOnCreate) {
  const ErrorType = class extends Error {
    constructor(message, params = {}) {
      validateParams(params)
      super(message, getErrorParams(params))
      // eslint-disable-next-line fp/no-this
      fixPrototype(this, new.target.prototype)
      // eslint-disable-next-line fp/no-this
      fixCause(this, params)
      // eslint-disable-next-line fp/no-this
      onCreate(this, getOnCreateParams(this, params))
    }
  }
  setErrorName(ErrorType, name)
  return ErrorType
}

// Due to `error.cause`, the second argument should always be a plain object
// We enforce no third argument since this is cleaner.
const validateParams = function (params) {
  if (typeof params !== 'object' || params === null) {
    throw new TypeError(
      `Error's second argument must be a plain object: ${params}`,
    )
  }
}

// Passing `{ cause: undefined }` creates `error.cause`, unlike passing `{}`
const getErrorParams = function (params) {
  return 'cause' in params ? { cause: params.cause } : {}
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

  if (context.constructor !== newTargetProto.constructor) {
    // eslint-disable-next-line fp/no-mutation, no-param-reassign
    context.constructor = newTargetProto.constructor
  }
}

// Polyfills `error.cause` for Node <16.9.0 and old browsers
const fixCause = function (error, params) {
  if (
    'cause' in params &&
    !('cause' in error && params.cause === error.cause)
  ) {
    setNonEnumProp(error, 'cause', params.cause)
  }
}
