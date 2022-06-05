import test from 'ava'
import errorType from 'error-type'
import { each } from 'test-each'

const TestError = errorType('TestError')

test('Sets instance options by default', (t) => {
  const error = new TestError('test', { one: true })
  t.true(error.one)
})

test('Can pass symbols as instance options', (t) => {
  const symbol = Symbol('one')
  const error = new TestError('test', { [symbol]: true })
  t.true(error[symbol])
})

test('Can customize onCreate', (t) => {
  const ErrorType = errorType('TestError', setOneProp)
  const error = new ErrorType('test', { one: true })
  t.false('one' in error)
  t.true(error.two)
})

const setOneProp = function (error, { one }) {
  error.two = one
}

test('Does not ignore enumerable options', (t) => {
  // eslint-disable-next-line fp/no-mutating-methods
  const opts = Object.defineProperty({}, 'one', {
    value: true,
    enumerable: true,
  })
  t.true(new TestError('test', opts).one)
})

test('Ignore non-enumerable options', (t) => {
  // eslint-disable-next-line fp/no-mutating-methods
  const opts = Object.defineProperty({}, 'one', {
    value: true,
    enumerable: false,
  })
  t.false('one' in new TestError('test', opts))
})

test('Ignore inherited options', (t) => {
  const opts = { __proto__: { one: true } }
  t.true(opts.one)
  t.false('one' in new TestError('test', opts))
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
    test(`Ignore some instance options | ${title}`, (t) => {
      const error = new TestError('test', { [propName]: true })
      t.not(error[propName], true)
    })
  },
)
