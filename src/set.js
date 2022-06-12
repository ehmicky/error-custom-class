// Error properties are not enumerable
export const setNonEnumProp = function (object, propName, value) {
  // eslint-disable-next-line fp/no-mutating-methods
  Object.defineProperty(object, propName, {
    value,
    writable: true,
    enumerable: false,
    configurable: true,
  })
}
