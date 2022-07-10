import { inspect } from 'util'

import test from 'ava'
import errorType from 'error-type'
import { each } from 'test-each'

const TestError = errorType('TestError')
const testError = new TestError('test')

const { propertyIsEnumerable: isEnum, hasOwnProperty: hasOwn } =
  Object.prototype

test('Sets constructor name', (t) => {
  t.is(TestError.name, 'TestError')
})

test('Constructor name is not enumerable', (t) => {
  t.false(isEnum.call(TestError, 'name'))
})

test('Sets error.name', (t) => {
  t.is(testError.name, 'TestError')
})

test('error.name is inherited', (t) => {
  t.false(hasOwn.call(testError, 'name'))
})

test('error.name is not enumerable', (t) => {
  t.false(isEnum.call(testError, 'name'))
})

test('error.name is writable', (t) => {
  t.true(
    Object.getOwnPropertyDescriptor(Object.getPrototypeOf(testError), 'name')
      .writable,
  )
})

test('Has correct stack', (t) => {
  t.true(testError.stack.includes('TestError: test\n'))
})

test('Has correct toString()', (t) => {
  t.is(testError.toString(), 'TestError: test')
})

test('Has correct util.inspect()', (t) => {
  t.true(inspect(testError).includes('TestError: test\n'))
})

each(
  [
    true,
    'Test',
    'Testerror',
    'Test1Error',
    'Test_Error',
    'testError',
    'Error',
    'TypeError',
    'AggregateError',
    'DOMException',
    'SystemError',
    'AssertionError',
    'Warning',
    'UnhandledPromiseRejection',
  ],
  ({ title }, name) => {
    test(`Validate against invalid names | ${title}`, (t) => {
      t.throws(errorType.bind(undefined, name))
    })
  },
)
