import test from 'ava'
import errorType from 'error-type'
import { each } from 'test-each'

const onCreate = function (error, { props, ...params }) {
  error.props = props
  error.params = params
}

const TestError = errorType('TestError', onCreate)

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

const PARAMS_OR_PROPS = [
  { key: 'params', getParams: (params) => params },
  { key: 'props', getParams: (props) => ({ props }) },
]

each(PARAMS_OR_PROPS, ({ title }, { key, getParams }) => {
  test(`Assign a default object | ${title}`, (t) => {
    t.deepEqual(new TestError('test')[key], {})
  })

  test(`Does not ignore enumerable params | ${title}`, (t) => {
    // eslint-disable-next-line fp/no-mutating-methods
    const props = Object.defineProperty({}, 'one', {
      value: true,
      enumerable: true,
    })
    t.true(new TestError('test', getParams(props))[key].one)
  })

  test(`Ignore non-enumerable params | ${title}`, (t) => {
    // eslint-disable-next-line fp/no-mutating-methods
    const props = Object.defineProperty({}, 'one', {
      value: true,
      enumerable: false,
    })
    t.false('one' in new TestError('test', getParams(props))[key])
  })

  test(`Ignore inherited params | ${title}`, (t) => {
    const props = { __proto__: { one: true } }
    t.true(props.one)
    t.false('one' in new TestError('test', getParams(props))[key])
  })

  test(`Can pass symbols as params | ${title}`, (t) => {
    const symbol = Symbol('one')
    t.true(new TestError('test', getParams({ [symbol]: true }))[key][symbol])
  })

  test(`Ignore non-enumerable symbol params | ${title}`, (t) => {
    const symbol = Symbol('one')
    // eslint-disable-next-line fp/no-mutating-methods
    const props = Object.defineProperty({}, symbol, {
      value: true,
      enumerable: false,
    })
    t.false(symbol in new TestError('test', getParams(props))[key])
  })
})

each(
  PARAMS_OR_PROPS,
  [
    'name',
    'message',
    'stack',
    'errors',
    'prototype',
    'constructor',
    '__proto__',
    'toString',
    'toLocaleString',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'valueOf',
  ],
  ({ title }, { key, getParams }, propName) => {
    test(`Ignore some params | ${title}`, (t) => {
      t.not(
        new TestError('test', getParams({ [propName]: true }))[key][propName],
        true,
      )
    })
  },
)

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
