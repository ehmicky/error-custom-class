import { isObject, defaultOnCreate } from './params.js'

// Normalize and validate options
export const normalizeOpts = function (opts = {}) {
  if (!isObject(opts)) {
    throw new TypeError(`Options must be a plain object: ${opts}`)
  }

  const { onCreate = defaultOnCreate, ParentClass = Error } = opts
  validateFunction(onCreate, 'onCreate')
  validateFunction(ParentClass, 'ParentClass')
  return { onCreate, ParentClass }
}

const validateFunction = function (value, optName) {
  if (typeof value !== 'function') {
    throw new TypeError(`Option "${optName}" must be a function: ${value}`)
  }
}
