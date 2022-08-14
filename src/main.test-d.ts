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
  CustomError,
} from './main.js'

const TestError = errorType('TestError')
const testError = new TestError('message')

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
expectError(errorType('TestError', (_: CustomError, __: boolean) => {}))
expectError(errorType('TestError', (_: boolean, __: {}) => {}))
expectAssignable<OnCreate>((_: CustomError, __: { test?: boolean }) => {})
expectNotAssignable<OnCreate>((_: boolean) => {})

expectAssignable<typeof CustomError<'TestError'>>(TestError)
expectNotAssignable<typeof CustomError<'TestError'>>(Error)
expectNotAssignable<typeof CustomError>(() => {})

expectError(new TestError())
expectError(new TestError(true))

new TestError('message', {})
new TestError('message', { cause: true })
new TestError('message', { anyProp: true })
new TestError('message', { [Symbol('test')]: true })
expectError(new TestError('message', true))
const TestErrorTwo = errorType(
  'TestError',
  (_: CustomError, __: { test?: boolean }) => {},
)
expectError(new TestErrorTwo('message', { other: true }))
expectAssignable<ErrorParams>({ anyProp: true })
expectNotAssignable<ErrorParams>(true)

expectType<CustomError<'TestError'>>(testError)
expectType<InstanceType<typeof TestError>>(testError)
expectAssignable<Error>(testError)
expectType<'TestError'>(testError.name)
