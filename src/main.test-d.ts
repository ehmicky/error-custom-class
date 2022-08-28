import {
  expectAssignable,
  expectNotAssignable,
  expectError,
  expectType,
} from 'tsd'

import errorCustomClass, {
  ErrorName,
  OnCreate,
  ErrorParams,
  CustomError,
  Options,
} from './main.js'

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
expectNotAssignable<Options>(true)

expectNotAssignable<Options>({ onCreate: {} })
expectNotAssignable<Options>({ onCreate(_: CustomError, __: boolean) {} })
expectNotAssignable<Options>({ onCreate(_: boolean, __: {}) {} })
expectAssignable<OnCreate>((_: CustomError, __: { test?: boolean }) => {})
expectNotAssignable<OnCreate>((_: boolean) => {})

expectType<typeof CustomError<'TestError'>>(TestError)
expectType<typeof TestError>(TestError)
expectNotAssignable<typeof CustomError<'TestError'>>(Error)
expectNotAssignable<typeof CustomError>(() => {})

expectError(new TestError())
expectError(new TestError(true))

new TestError('message', {})
new TestError('message', { cause: true })
new TestError('message', { props: { anyProp: true } })
new TestError('message', { props: { [Symbol('test')]: true } })
expectError(new TestError('message', true))
const TestErrorTwo = errorCustomClass('TestError', {
  onCreate(_: CustomError, __: { test?: boolean }) {},
} as const)
expectError(new TestErrorTwo('message', { other: true }))
expectAssignable<ErrorParams>({ anyProp: true })
expectNotAssignable<ErrorParams>(true)

expectType<CustomError<'TestError'>>(testError)
expectType<InstanceType<typeof TestError>>(testError)
expectType<typeof testError>(testError)
expectAssignable<Error>(testError)
expectType<'TestError'>(testError.name)

errorCustomClass('TestError', { ParentClass: Error })
errorCustomClass('TestError', { ParentClass: TypeError })
errorCustomClass('TestError', { ParentClass: TestError })
expectError(errorCustomClass('TestError', { ParentClass: true }))
expectNotAssignable<Options>({ ParentClass: true })
