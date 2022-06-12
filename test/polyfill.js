// eslint-disable-next-line n/file-extension-in-import, import/no-unassigned-import
import 'error-cause/auto'
// eslint-disable-next-line import/order
import test from 'ava'
import errorType from 'error-type'
import { each } from 'test-each'

const TestError = errorType('TestError')
const testError = new TestError('test', { one: true })
const ChildError = class extends TestError {}
const childError = new ChildError('test', { one: true })

each(
  [
    { error: testError, title: 'testError' },
    { error: childError, title: 'childError' },
  ],
  ({ title }, { error }) => {
    test(`Polyfilled error keeps constructor behavior | ${title}`, (t) => {
      t.true(error.one)
    })

    test(`Polyfilled error is instanceof Error | ${title}`, (t) => {
      t.true(error instanceof Error)
    })

    test(`Polyfilled error is instanceof custom Error | ${title}`, (t) => {
      t.true(error instanceof TestError)
    })
  },
)

test('Polyfilled error can be subclassed', (t) => {
  t.true(childError instanceof ChildError)
})
