// `onCreate(error, params)` allows custom logic at initialization time.
// The construction `params` are passed, i.e. can be validated, normalized, etc.
// `onCreate()` is useful to assign error instance-specific properties.
//  - Therefore, the default value just assign `params`.
// Properties that are error type-specific (i.e. same for all instances of that
// type):
//  - Should use a separate object where the key is the `error.name` and the
//    value are the properties
//  - Those should be used either:
//     - By letting the error catcher|consumer retrieve object[error.name],
//       which is preferred since it:
//        - Decouples error consumption from creation
//        - Prevents those properties from being printed on the console
//        - Makes it harder to lose those properties as the error gets passed
//          around, serialized, wrapped in `error.cause` or `error.errors`, etc.
//        - Is simpler for error throwing logic
//     - By assigning them in `onCreate()` using
//       `Object.assign(this, object[error.name])`
//        - This is simpler for the error catching|consuming logic
export const defaultOnCreate = function (error, params) {
  // eslint-disable-next-line fp/no-mutating-assign
  Object.assign(error, params)
}

// When passing parameters to `onCreate()`, ignore keys that:
//  - Would override `Object` prototype (`hasOwnProperty`, etc.) or `Error`
//    prototype (`toString`)
//  - Are prototype-specific (`__proto__`, `prototype`, `constructor`)
//  - Are core error properties (`name`, `message`, `stack`, `cause`, `errors`)
//  - Are inherited
//  - Are not enumerable
export const getOnCreateParams = function (error, params) {
  const onCreateParams = {}

  // eslint-disable-next-line fp/no-loops
  for (const key of Reflect.ownKeys(params)) {
    setKey({ error, params, key, onCreateParams })
  }

  return onCreateParams
}

const setKey = function ({ error, params, key, onCreateParams }) {
  if (isEnum.call(params, key) && !shouldIgnoreKey(error, key)) {
    // eslint-disable-next-line fp/no-mutation, no-param-reassign
    onCreateParams[key] = params[key]
  }
}

const { propertyIsEnumerable: isEnum } = Object.prototype

// Uses `key in error` to handle any current and future error|object properties
const shouldIgnoreKey = function (error, key) {
  return key in error || IGNORED_KEYS.has(key)
}

const IGNORED_KEYS = new Set(['errors', 'prototype', 'cause'])
