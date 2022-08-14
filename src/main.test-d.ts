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
  ErrorType,
  ErrorTypeConstructor,
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
expectError(errorType('TestError', (_: ErrorType, __: boolean) => {}))
expectError(errorType('TestError', (_: boolean, __: {}) => {}))
expectAssignable<OnCreate>((_: ErrorType, __: { test?: boolean }) => {})
expectNotAssignable<OnCreate>((_: boolean) => {})

expectAssignable<ErrorTypeConstructor>(TestError)
expectNotAssignable<ErrorTypeConstructor>(Error)
expectNotAssignable<ErrorTypeConstructor>(() => {})

expectAssignable<ErrorType>(new TestError('message'))
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
  (_: ErrorType, __: { test?: boolean }) => {},
)
expectError(new TestErrorTwo('message', { other: true }))
expectAssignable<ErrorParams>({ anyProp: true })
expectNotAssignable<ErrorParams>(true)

const { name } = new TestError('message')
expectType<'TestError'>(name)
