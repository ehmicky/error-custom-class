// eslint-disable-next-line ava/no-ignored-test-files
import test from 'ava'
import errorType from 'error-type'
import { each } from 'test-each'

const TestError = errorType('TestError')
const testError = new TestError('test', { one: true })
const ChildError = class extends TestError {}
const childError = new ChildError('test', { one: true })

each(
  [
    { error: testError, CustomErrorType: TestError },
    { error: childError, CustomErrorType: ChildError },
  ],
  ({ title }, { error, CustomErrorType }) => {
    test(`Polyfilled error keeps constructor behavior | ${title}`, (t) => {
      t.true(error.one)
    })

    test(`Polyfilled error is instanceof Error | ${title}`, (t) => {
      t.true(error instanceof Error)
    })

    test(`Polyfilled error is instanceof custom Error | ${title}`, (t) => {
      t.true(error instanceof TestError)
    })

    test(`Polyfilled error has right constructor | ${title}`, (t) => {
      t.is(error.constructor, CustomErrorType)
    })
  },
)

test('Polyfilled error can be subclassed', (t) => {
  t.true(childError instanceof ChildError)
})
