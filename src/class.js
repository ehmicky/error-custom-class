// If the global `Error` class was monkey-patched, it is likely to return an
// `Error` instance.
//   - Returning a value from a constructor is a bad practice since it changes
//     the prototype of the new instance.
//   - This means `instanceof` or `constructor` checks will fail, and child
//     prototype properties will not be inherited
// A common library that does this is `error-cause` which polyfills
// `error.cause`.
// We fix this by detecting such situation and re-setting the prototype.
// We use `new.target` so that this works even if `CustomErrorClass` is
// subclassed itself.
export const ensureCorrectClass = function (error, newTarget) {
  const newTargetProto = newTarget.prototype

  if (Object.getPrototypeOf(error) !== newTargetProto) {
    // eslint-disable-next-line fp/no-mutating-methods
    Object.setPrototypeOf(error, newTargetProto)
  }

  if (error.constructor !== newTargetProto.constructor) {
    error.constructor = newTargetProto.constructor
  }
}
