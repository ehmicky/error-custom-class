import { ponyfillCause } from './cause.js'
import { ensureCorrectClass } from './class.js'
import { setErrorName } from './name.js'
import { sanitizeProperties } from './sanitize.js'

// Create an error class with a specific `name`.
// We do not call `Error.captureStackTrace(this, CustomErrorClass)` because:
//  - It is V8 specific
//  - And on V8 (unlike in some browsers like Firefox), `Error.stack`
//    automatically omits the stack lines from custom error constructors
//  - Also, this would force child classes to also use
//    `Error.captureStackTrace()`
/* eslint-disable fp/no-this */
export default function errorCustomClass(name) {
  const CustomErrorClass = class extends Error {
    constructor(message, parameters) {
      super(message, parameters)
      ensureCorrectClass(this, new.target)
      ponyfillCause(this, parameters)
      const props = sanitizeProperties(parameters?.props)
      // eslint-disable-next-line fp/no-mutating-assign
      Object.assign(this, props)
    }
  }
  setErrorName(CustomErrorClass, name)
  return CustomErrorClass
}
/* eslint-enable fp/no-this */
