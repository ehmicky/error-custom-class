import test from 'ava'
import errorType from 'error-type'

const TestError = errorType('TestError')

test('Has right error type', (t) => {
  const error = new TestError('test')
  t.not(Object.getPrototypeOf(error), Error.prototype)
  t.true(error instanceof TestError)
  t.true(error instanceof Error)
})
