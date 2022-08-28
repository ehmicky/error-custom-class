/**
 * Error class name
 */
export type ErrorName = `${string}Error`

/**
 * Parameters passed to `new CustomError('message', params)`
 */
export interface ErrorParams {
  [param: string | symbol]: unknown
}

/**
 * Custom error class
 */
export declare class CustomError<
  ErrorNameArg extends ErrorName = ErrorName,
  ErrorParamsArg extends ErrorParams = ErrorParams,
> extends Error {
  constructor(message: string, params?: ErrorParamsArg & { cause?: unknown })
  name: ErrorNameArg
}

/**
 * Creates a custom error class.
 *
 * @example
 * ```js
 * import errorCustomClass from 'error-custom-class'
 *
 * const UserError = errorCustomClass('UserError')
 * const DatabaseError = errorCustomClass('DatabaseError')
 *
 * try {
 *   throw new UserError('message')
 * } catch (error) {
 *   console.log(error.name) // 'UserError'
 *   console.log(error instanceof UserError) // true
 * }
 * ```
 */
export default function errorCustomClass<
  ErrorNameArg extends ErrorName = ErrorName,
  ErrorParamsArg extends ErrorParams = ErrorParams,
>(errorName: ErrorNameArg): typeof CustomError<ErrorNameArg, ErrorParamsArg>
