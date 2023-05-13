import test from 'ava'
// eslint-disable-next-line n/file-extension-in-import, import/no-unassigned-import
import 'error-cause/auto'

import errorCustomClass from 'error-custom-class'

test('Polyfilled errors have the correct class', (t) => {
  const TestError = errorCustomClass('TestError')
  const ChildError = class extends TestError {}
  const childError = new ChildError('test')
  t.true(childError instanceof Error)
  t.true(childError instanceof TestError)
  t.true(childError instanceof ChildError)
  t.is(childError.constructor, ChildError)
})
