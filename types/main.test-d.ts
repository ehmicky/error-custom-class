import {
  expectAssignable,
  expectNotAssignable,
  expectError,
  expectType,
} from 'tsd'

import errorCustomClass, { ErrorName, CustomError } from './main.js'

const TestError = errorCustomClass('TestError')
const testError = new TestError('message')

errorCustomClass('TestError')
expectError(errorCustomClass())
expectError(errorCustomClass(true))
expectError(errorCustomClass('name'))
expectError(errorCustomClass(Symbol('TestError')))
expectAssignable<ErrorName>('TestError')
expectNotAssignable<ErrorName>(true)
expectNotAssignable<ErrorName>('name')
expectNotAssignable<ErrorName>(Symbol('TestError'))

expectError(errorCustomClass('TestError', true))
expectError(errorCustomClass('TestError', {}))

expectType<typeof CustomError<'TestError'>>(TestError)
expectType<typeof TestError>(TestError)
expectNotAssignable<typeof CustomError<'TestError'>>(Error)
expectNotAssignable<typeof CustomError>(() => {})

expectError(new TestError())
expectError(new TestError(true))

new TestError('message', {})
new TestError('message', { cause: true })
expectError(new TestError('message', true))

const InputError = errorCustomClass<'InputError', { prop: boolean }>(
  'InputError',
)
new InputError('message', { prop: true })
expectError(new InputError('message', { prop: 'true' }))
expectError(new InputError('message', { other: true }))

expectType<CustomError<'TestError'>>(testError)
expectType<InstanceType<typeof TestError>>(testError)
expectType<typeof testError>(testError)
expectAssignable<Error>(testError)
expectType<'TestError'>(testError.name)
