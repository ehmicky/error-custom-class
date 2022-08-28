import { isObject } from './is_object.js'

// Sanitize properties meant to be set on an `error`.
// Ignore keys that:
//  - Would override `Object` prototype (`hasOwnProperty`, etc.) or `Error`
//    prototype (`toString`)
//  - Are prototype-specific (`__proto__`, `prototype`, `constructor`)
//  - Are core error properties (`name`, `message`, `stack`, `cause`, `errors`)
//  - Are inherited
//  - Are not enumerable
// Values that throw when retrieved throw right away.
export const sanitizeProperties = function (props = {}) {
  if (!isObject(props)) {
    throw new TypeError(`Error's argument must be a plain object: ${props}`)
  }

  const propsCopy = {}

  // eslint-disable-next-line fp/no-loops
  for (const key of Reflect.ownKeys(props)) {
    setKey(props, key, propsCopy)
  }

  return propsCopy
}

const setKey = function (props, key, propsCopy) {
  if (isEnum.call(props, key) && !shouldIgnoreKey(key)) {
    // eslint-disable-next-line fp/no-mutation, no-param-reassign
    propsCopy[key] = props[key]
  }
}

const { propertyIsEnumerable: isEnum } = Object.prototype

// Uses `key in error` to handle any current and future error|object properties
const shouldIgnoreKey = function (key) {
  return key in CHECK_ERROR || IGNORED_KEYS.has(key)
}

const CHECK_ERROR = new Error('check')
const IGNORED_KEYS = new Set(['prototype', 'errors', 'cause'])
