import test from 'ava'
import errorType from 'error-type'

import { TestError } from '../helpers/params.js'

test('Sets params.props by default', (t) => {
  const DefaultTestError = errorType('TestError')
  const error = new DefaultTestError('test', { props: { one: true } })
  t.true(error.one)
})

test('Can customize onCreate', (t) => {
  const error = new TestError('test', { one: true, props: { two: true } })
  t.false('two' in error)
  t.true(error.params.one)
  t.true(error.props.two)
})
