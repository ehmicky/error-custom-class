import test from 'ava'
import { each } from 'test-each'

// eslint-disable-next-line no-restricted-imports
import { ponyfillCause } from '../src/cause.js'

const { propertyIsEnumerable: isEnum } = Object.prototype

each(['causeTest', undefined], ({ title }, cause) => {
  test(`Sets error.cause | ${title}`, (t) => {
    const parameters = { cause }
    const error = new Error('test', parameters)
    ponyfillCause(error, parameters)
    t.true('cause' in error)
    t.false(isEnum.call(error, 'cause'))
    t.is(error.cause, cause)
  })
})

// eslint-disable-next-line unicorn/no-null
each([undefined, null, {}], ({ title }, parameters) => {
  test(`Does not set error.cause by default | ${title}`, (t) => {
    const error = new Error('test')
    ponyfillCause(error, parameters)
    t.false('cause' in error)
  })
})
