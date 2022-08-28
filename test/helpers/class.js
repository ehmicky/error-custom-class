// eslint-disable-next-line ava/no-ignored-test-files
import test from 'ava'
import { each } from 'test-each'

// eslint-disable-next-line no-restricted-imports
import { ensureCorrectClass } from '../../src/class.js'

const TestError = class extends Error {
  constructor(...args) {
    super(...args)
    // eslint-disable-next-line fp/no-this
    ensureCorrectClass(this, new.target)
    // eslint-disable-next-line fp/no-this, fp/no-mutation
    this.one = true
  }
}
const testError = new TestError('test')
const ChildError = class extends TestError {}
const childError = new ChildError('test')

each(
  [
    { error: testError, CustomErrorClass: TestError },
    { error: childError, CustomErrorClass: ChildError },
  ],
  ({ title }, { error, CustomErrorClass }) => {
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
      t.is(error.constructor, CustomErrorClass)
    })
  },
)

test('Polyfilled error can be subclassed', (t) => {
  t.true(childError instanceof ChildError)
})
