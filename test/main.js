import test from 'ava'
import errorCustomClass from 'error-custom-class'

const { propertyIsEnumerable: isEnum } = Object.prototype

const TestError = errorCustomClass('TestError')
const testError = new TestError('test')

test('Has right error class', (t) => {
  t.not(Object.getPrototypeOf(testError), Error.prototype)
  t.true(testError instanceof TestError)
  t.true(testError instanceof Error)
})

test('Sets error.message', (t) => {
  t.is(testError.message, 'test')
})

test('error.message is not enumerable', (t) => {
  t.false(isEnum.call(testError, 'message'))
})

test('Sets error.stack', (t) => {
  t.true(testError.stack.includes('test'))
})

test('error.stack is not enumerable', (t) => {
  t.false(isEnum.call(testError, 'stack'))
})

const isStackLine = function (line) {
  return line.trim().startsWith('at ')
}

test('error.stack does not include the constructor', (t) => {
  const lines = testError.stack.split('\n')
  const stackIndex = lines.findIndex(isStackLine)
  t.true(lines[stackIndex].includes('main.js'))
})

test('Sets error.cause', (t) => {
  t.is(new TestError('test', { cause: 'test' }).cause, 'test')
})

test('error.cause is not enumerable', (t) => {
  t.false(isEnum.call(new TestError('test', { cause: 'test' }), 'cause'))
})

test('Does not set error.cause by default', (t) => {
  t.false('cause' in new TestError('test'))
})

test('Can set undefined error.cause', (t) => {
  const error = new TestError('test', { cause: undefined })
  t.true('cause' in error)
  t.is(error.cause, undefined)
})

test('Does not set error.errors by default', (t) => {
  t.false('errors' in testError)
})
