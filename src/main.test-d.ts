import errorCustomClass, {
  type ErrorName,
  type CustomError,
} from 'error-custom-class'
import { expectAssignable, expectNotAssignable, expectType } from 'tsd'

const TestError = errorCustomClass('TestError')
const testError = new TestError('message')

errorCustomClass('TestError')
// @ts-expect-error
errorCustomClass()
// @ts-expect-error
errorCustomClass(true)
// @ts-expect-error
errorCustomClass('name')
// @ts-expect-error
errorCustomClass(Symbol('TestError'))
expectAssignable<ErrorName>('TestError')
expectNotAssignable<ErrorName>(true)
expectNotAssignable<ErrorName>('name')
expectNotAssignable<ErrorName>(Symbol('TestError'))

// @ts-expect-error
errorCustomClass('TestError', true)
// @ts-expect-error
errorCustomClass('TestError', {})

expectType<typeof CustomError<'TestError'>>(TestError)
expectType<typeof TestError>(TestError)
expectNotAssignable<typeof CustomError<'TestError'>>(Error)
expectNotAssignable<typeof CustomError>(() => {})

// @ts-expect-error
new TestError()
// @ts-expect-error
new TestError(true)

new TestError('message', {})
new TestError('message', { cause: true })
// @ts-expect-error
new TestError('message', true)

const InputError = errorCustomClass<'InputError', { prop: boolean }>(
  'InputError',
)
new InputError('message', { prop: true })
// @ts-expect-error
new InputError('message', { prop: 'true' })
// @ts-expect-error
new InputError('message', { other: true })

expectType<CustomError<'TestError'>>(testError)
expectType<InstanceType<typeof TestError>>(testError)
expectType<typeof testError>(testError)
expectAssignable<Error>(testError)
expectType<'TestError'>(testError.name)
