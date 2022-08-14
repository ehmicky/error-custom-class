import test from 'ava'
import errorType from 'error-type'
import { each } from 'test-each'

const TestError = errorType('TestError')

test('Sets instance params by default', (t) => {
  const error = new TestError('test', { one: true })
  t.true(error.one)
})

test('Can customize onCreate', (t) => {
  const CustomErrorType = errorType('TestError', setOneProp)
  const error = new CustomErrorType('test', { one: true })
  t.false('one' in error)
  t.true(error.two)
})

const setOneProp = function (error, { one }) {
  error.two = one
}

test('Does not ignore enumerable params', (t) => {
  // eslint-disable-next-line fp/no-mutating-methods
  const params = Object.defineProperty({}, 'one', {
    value: true,
    enumerable: true,
  })
  t.true(new TestError('test', params).one)
})

test('Ignore non-enumerable params', (t) => {
  // eslint-disable-next-line fp/no-mutating-methods
  const params = Object.defineProperty({}, 'one', {
    value: true,
    enumerable: false,
  })
  t.false('one' in new TestError('test', params))
})

test('Ignore inherited params', (t) => {
  const params = { __proto__: { one: true } }
  t.true(params.one)
  t.false('one' in new TestError('test', params))
})

test('Can pass symbols as instance params', (t) => {
  const symbol = Symbol('one')
  const error = new TestError('test', { [symbol]: true })
  t.true(error[symbol])
})

test('Ignore non-enumerable symbol params', (t) => {
  const symbol = Symbol('one')
  // eslint-disable-next-line fp/no-mutating-methods
  const params = Object.defineProperty({}, symbol, {
    value: true,
    enumerable: false,
  })
  t.false(symbol in new TestError('test', params))
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
    test(`Ignore some instance params | ${title}`, (t) => {
      const error = new TestError('test', { [propName]: true })
      t.not(error[propName], true)
    })
  },
)
