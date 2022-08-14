import {
  expectAssignable,
  expectNotAssignable,
  expectError,
  expectType,
} from 'tsd'

import errorType, {
  ErrorName,
  OnCreate,
  ErrorParams,
  ErrorInstance,
  ErrorConstructor,
} from './main.js'

const TestError = errorType('TestError')

errorType('TestError')
expectError(errorType())
expectError(errorType(true))
expectError(errorType('name'))
expectError(errorType(Symbol('TestError')))
expectAssignable<ErrorName>('TestError')
expectNotAssignable<ErrorName>(true)
expectNotAssignable<ErrorName>('name')
expectNotAssignable<ErrorName>(Symbol('TestError'))

expectError(errorType('TestError', {}))
expectError(errorType('TestError', (_: ErrorInstance, __: boolean) => {}))
expectError(errorType('TestError', (_: boolean, __: {}) => {}))
expectAssignable<OnCreate>((_: ErrorInstance, __: { test?: boolean }) => {})
expectNotAssignable<OnCreate>((_: boolean) => {})

expectAssignable<ErrorConstructor>(TestError)
expectNotAssignable<ErrorConstructor>(Error)
expectNotAssignable<ErrorConstructor>(() => {})

expectAssignable<ErrorInstance>(new TestError('message'))
expectAssignable<Error>(new TestError('message'))

new TestError('message')
expectError(new TestError())
expectError(new TestError(true))

new TestError('message', {})
new TestError('message', { cause: true })
new TestError('message', { anyProp: true })
new TestError('message', { [Symbol('test')]: true })
expectError(new TestError('message', true))
const TestErrorTwo = errorType(
  'TestError',
  (_: ErrorInstance, __: { test?: boolean }) => {},
)
expectError(new TestErrorTwo('message', { other: true }))
expectAssignable<ErrorParams>({ anyProp: true })
expectNotAssignable<ErrorParams>(true)

const { name } = new TestError('message')
expectType<'TestError'>(name)
