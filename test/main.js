import test from 'ava'
import errorType from 'error-type'

test('Dummy test', (t) => {
  t.is(typeof errorType, 'function')
})
