import { isObject } from './is_object.js'
import { setNonEnumProp } from './set.js'

// Ponyfills `error.cause` for Node <16.9.0 and old browsers
export const ponyfillCause = function (error, parameters) {
  if (
    hasCause(parameters) &&
    !('cause' in error && parameters.cause === error.cause)
  ) {
    setNonEnumProp(error, 'cause', parameters.cause)
  }
}

// Passing `{ cause: undefined }` creates `error.cause`, unlike passing `{}`
const hasCause = function (parameters) {
  return isObject(parameters) && 'cause' in parameters
}
