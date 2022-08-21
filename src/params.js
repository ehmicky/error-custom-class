// Applied to both `params` and `params.props`.
// Ignore keys that:
//  - Would override `Object` prototype (`hasOwnProperty`, etc.) or `Error`
//    prototype (`toString`)
//  - Are prototype-specific (`__proto__`, `prototype`, `constructor`)
//  - Are core error properties (`name`, `message`, `stack`, `cause`, `errors`)
//  - Are inherited
//  - Are not enumerable
// Values that throw when retrieved throw right away.
// Due to `error.cause`, the second argument should always be a plain object
// We enforce no third argument since this is cleaner.
export const normalizeParams = function (error, params) {
  const paramsA = normalizeObject('second argument', error, params)
  const props = normalizeObject(
    'second argument\'s "props"',
    error,
    paramsA.props,
  )
  return { ...paramsA, props }
}

const normalizeObject = function (prefix, error, params = {}) {
  if (!isObject(params)) {
    throw new TypeError(`Error's ${prefix} must be a plain object: ${params}`)
  }

  const paramsCopy = {}

  // eslint-disable-next-line fp/no-loops
  for (const key of Reflect.ownKeys(params)) {
    setKey({ error, params, key, paramsCopy })
  }

  return paramsCopy
}

export const isObject = function (value) {
  return typeof value === 'object' && value !== null
}

const setKey = function ({ error, params, key, paramsCopy }) {
  if (isEnum.call(params, key) && !shouldIgnoreKey(error, key)) {
    // eslint-disable-next-line fp/no-mutation, no-param-reassign
    paramsCopy[key] = params[key]
  }
}

const { propertyIsEnumerable: isEnum } = Object.prototype

// Uses `key in error` to handle any current and future error|object properties
const shouldIgnoreKey = function (error, key) {
  return key in error || IGNORED_KEYS.has(key)
}

const IGNORED_KEYS = new Set(['prototype', 'errors', 'cause'])

// `onCreate(error, params)` allows custom logic at initialization time.
// The construction `params` are passed, i.e. can be validated, normalized, etc.
// The default value assigns `params.props`.
export const defaultOnCreate = function (error, { props }) {
  // eslint-disable-next-line fp/no-mutating-assign
  Object.assign(error, props)
}
