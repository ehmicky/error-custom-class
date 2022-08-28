import test from 'ava'
import { each } from 'test-each'

// eslint-disable-next-line no-restricted-imports
import { sanitizeProperties } from '../src/sanitize.js'

each(
  [
    // eslint-disable-next-line unicorn/no-null
    null,
    'test',
    () => {},
    {
      // eslint-disable-next-line fp/no-get-set
      get unsafe() {
        throw new Error('unsafe')
      },
    },
  ],
  ({ title }, props) => {
    test(`Validate against invalid params | ${title}`, (t) => {
      t.throws(sanitizeProperties.bind(undefined, props))
    })
  },
)

test('Assign a default object', (t) => {
  t.deepEqual(sanitizeProperties(), {})
})

test('Does not ignore enumerable params', (t) => {
  // eslint-disable-next-line fp/no-mutating-methods
  const props = Object.defineProperty({}, 'one', {
    value: true,
    enumerable: true,
  })
  t.true(sanitizeProperties(props).one)
})

test('Ignore non-enumerable params', (t) => {
  // eslint-disable-next-line fp/no-mutating-methods
  const props = Object.defineProperty({}, 'one', {
    value: true,
    enumerable: false,
  })
  t.false('one' in sanitizeProperties(props))
})

test('Ignore inherited params', (t) => {
  const props = { __proto__: { one: true } }
  t.true(props.one)
  t.false('one' in sanitizeProperties(props))
})

test('Can pass symbols as params', (t) => {
  const symbol = Symbol('one')
  t.true(sanitizeProperties({ [symbol]: true })[symbol])
})

test('Ignore non-enumerable symbol params', (t) => {
  const symbol = Symbol('one')
  // eslint-disable-next-line fp/no-mutating-methods
  const props = Object.defineProperty({}, symbol, {
    value: true,
    enumerable: false,
  })
  t.false('one' in sanitizeProperties(props))
})

each(
  [
    'name',
    'message',
    'stack',
    'errors',
    'prototype',
    'constructor',
    '__proto__',
    'toString',
    'toLocaleString',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'valueOf',
  ],
  ({ title }, propName) => {
    test(`Ignore some params | ${title}`, (t) => {
      t.not(sanitizeProperties({ [propName]: true })[propName], true)
    })
  },
)
