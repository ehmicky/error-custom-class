import errorType, {
  ErrorName,
  OnCreate,
  ErrorParams,
  ErrorType,
} from 'error-type'
import { expectAssignable, expectNotAssignable, expectError } from 'tsd'

const ErrorType = errorType('TestError')
expectAssignable<NewableFunction>(ErrorType)
errorType('TestError', (_: Error, __: {}) => {})

expectAssignable<Error>(new ErrorType('message'))
new ErrorType('message', {})
new ErrorType('message', { cause: true })
new ErrorType('message', { anyProp: true })
new ErrorType('message', { [Symbol('test')]: true })

const ErrorTypeTwo = errorType(
  'TestError',
  (_: Error, __: { test?: boolean }) => {},
)
new ErrorTypeTwo('message', { cause: true })
new ErrorTypeTwo('message', { test: true })

expectError(errorType())
expectError(errorType(true))
expectError(errorType('TestError', {}))
expectError(errorType('TestError', (_: Error, __: boolean) => {}))
expectError(errorType('TestError', (_: boolean, __: {}) => {}))
expectError(new ErrorType())
expectError(new ErrorType(true))
expectError(new ErrorType('message', true))
expectError(new ErrorTypeTwo('message', { other: true }))

expectAssignable<OnCreate>((_: Error, __: { test?: boolean }) => {})
expectNotAssignable<OnCreate>((_: boolean) => {})

expectAssignable<ErrorParams>({ anyProp: true })
expectNotAssignable<ErrorParams>(true)

expectAssignable<ErrorType>(ErrorType)
expectNotAssignable<ErrorType>(() => {})

expectError(errorType('name'))
expectAssignable<ErrorName>('TestError')
expectNotAssignable<ErrorName>('test')
expectNotAssignable<ErrorName>(Symbol('TestError'))
