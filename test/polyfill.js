// eslint-disable-next-line n/file-extension-in-import, import/no-unassigned-import
import 'error-cause/auto'
// eslint-disable-next-line import/order
import test from 'ava'
import errorType from 'error-type'

test('Works with polyfills for Error', (t) => {
  const TestError = errorType('TestError')
  const testError = new TestError('test')
  t.not(Object.getPrototypeOf(testError), Error.prototype)
  t.true(testError instanceof TestError)
  t.true(testError instanceof Error)
})
