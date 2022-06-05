import errorType from 'error-type'
import { expectType, expectError } from 'tsd'

expectType<string>(errorType('name'))

expectError(errorType(true))
