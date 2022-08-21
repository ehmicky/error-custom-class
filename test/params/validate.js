import test from 'ava'
import { each } from 'test-each'

import { TestError, PARAMS_OR_PROPS } from '../helpers/params.js'

each(
  PARAMS_OR_PROPS,
  [
    // eslint-disable-next-line unicorn/no-null
    null,
    'test',
    () => {},
    {
      // eslint-disable-next-line fp/no-get-set
      get unsafe() {
        throw new Error('unsafe')
      },
    },
  ],
  ({ title }, { getParams }, value) => {
    test(`Validate against invalid params | ${title}`, (t) => {
      // eslint-disable-next-line max-nested-callbacks
      t.throws(() => new TestError('test', getParams(value)))
    })
  },
)
