import { isObject, normalizeParams, defaultOnCreate } from './create.js'
import { setErrorName } from './name.js'
import { setNonEnumProp } from './set.js'

// Create an error type with a specific `name`.
// We do not call `Error.captureStackTrace(this, CustomErrorType)` because:
//  - It is V8 specific
//  - And on V8 (unlike in some browsers like Firefox), `Error.stack`
//    automatically omits the stack lines from custom error constructors
//  - Also, this would force child types to also use `Error.captureStackTrace()`
/* eslint-disable fp/no-this */
export default function errorType(name, onCreate = defaultOnCreate) {
  const CustomErrorType = class extends Error {
    constructor(message, params) {
      super(message, getErrorParams(params))
      fixPrototype(this, new.target.prototype)
      fixCause(this, params)
      onCreate(this, normalizeParams(this, params))
    }
  }
  setErrorName(CustomErrorType, name)
  return CustomErrorType
}
/* eslint-enable fp/no-this */

const getErrorParams = function (params) {
  return hasCause(params) ? { cause: params.cause } : {}
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
// We use `new.target` so that this works even if `CustomErrorType` is
// subclassed itself.
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
  if (hasCause(params) && !('cause' in error && params.cause === error.cause)) {
    setNonEnumProp(error, 'cause', params.cause)
  }
}

// Passing `{ cause: undefined }` creates `error.cause`, unlike passing `{}`
const hasCause = function (params) {
  return isObject(params) && 'cause' in params
}
