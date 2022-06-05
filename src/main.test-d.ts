import errorType from 'error-type'
import { expectAssignable, expectError } from 'tsd'

const ErrorType = errorType('name')
expectAssignable<NewableFunction>(ErrorType)
errorType('name', (_: Error, __: {}) => {})

expectAssignable<Error>(new ErrorType('message'))
new ErrorType('message', {})
new ErrorType('message', { cause: true })
new ErrorType('message', { anyProp: true })
new ErrorType('message', { [Symbol.for('test')]: true })

expectError(errorType())
expectError(errorType(true))
expectError(errorType('message', {}))
expectError(errorType('name', (_: Error, __: boolean) => {}))
expectError(errorType('name', (_: boolean, __: {}) => {}))
expectError(new ErrorType())
expectError(new ErrorType(true))
expectError(new ErrorType('message', true))
