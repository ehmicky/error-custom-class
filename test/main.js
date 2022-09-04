import test from 'ava'
import errorCustomClass from 'error-custom-class'

const { propertyIsEnumerable: isEnum, hasOwnProperty: hasOwn } =
  Object.prototype

const TestError = errorCustomClass('TestError')
const testError = new TestError('test', { props: { one: true, name: 'name' } })

test('Has right error class', (t) => {
  t.not(Object.getPrototypeOf(testError), Error.prototype)
  t.true(testError instanceof TestError)
  t.true(testError instanceof Error)
})

test('Sets error.name', (t) => {
  t.is(testError.name, 'TestError')
  t.false(hasOwn.call(testError, 'name'))
})

test('Validate against invalid names', (t) => {
  t.throws(errorCustomClass.bind(undefined, 'SystemError'))
})

test('Sets error.constructor', (t) => {
  t.is(testError.constructor, TestError)
  t.is(TestError.name, 'TestError')
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

test('Does not set error.errors by default', (t) => {
  t.false('errors' in testError)
})

test('Has correct toString()', (t) => {
  t.is(testError.toString(), 'TestError: test')
})
