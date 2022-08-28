import test from 'ava'
import errorCustomClass from 'error-custom-class'
import { each } from 'test-each'

each(
  // eslint-disable-next-line unicorn/no-null
  [null, { onCreate: true }, { ParentClass: new Error('test') }],
  ({ title }, opts) => {
    test(`Validate options | ${title}`, (t) => {
      t.throws(errorCustomClass.bind(undefined, 'TestError', opts))
    })
  },
)
