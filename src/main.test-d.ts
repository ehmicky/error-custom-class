import errorType, { OnCreate, ErrorParams } from 'error-type'
import { expectAssignable, expectNotAssignable, expectError } from 'tsd'

const ErrorType = errorType('name')
expectAssignable<NewableFunction>(ErrorType)
errorType('name', (_: Error, __: {}) => {})

expectAssignable<Error>(new ErrorType('message'))
new ErrorType('message', {})
new ErrorType('message', { cause: true })
new ErrorType('message', { anyProp: true })
new ErrorType('message', { [Symbol('test')]: true })

const ErrorTypeTwo = errorType('name', (_: Error, __: { test?: boolean }) => {})
new ErrorTypeTwo('message', { cause: true })
new ErrorTypeTwo('message', { test: true })

expectError(errorType())
expectError(errorType(true))
expectError(errorType('message', {}))
expectError(errorType('name', (_: Error, __: boolean) => {}))
expectError(errorType('name', (_: boolean, __: {}) => {}))
expectError(new ErrorType())
expectError(new ErrorType(true))
expectError(new ErrorType('message', true))
expectError(new ErrorTypeTwo('message', { other: true }))

expectAssignable<OnCreate>((_: Error, __: { test?: boolean }) => {})
expectNotAssignable<OnCreate>((_: boolean) => {})

expectAssignable<ErrorParams>({ anyProp: true })
expectNotAssignable<ErrorParams>(true)
