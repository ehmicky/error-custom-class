/**
 * Error type name
 */
export type ErrorName = `${string}Error`

/**
 * Parameters passed to `new CustomErrorType('message', params)`
 */
export type ErrorParams = { [paramProperty: string | symbol]: unknown }

/**
 * Called on `new CustomErrorType('message', params)`
 */
export type OnCreate<
  ErrorNameArg extends ErrorName = ErrorName,
  ErrorParamsArg extends ErrorParams = ErrorParams,
> = (
  error: CustomError<ErrorNameArg, ErrorParamsArg>,
  params: ErrorParamsArg,
) => void

export declare class CustomError<
  ErrorNameArg extends ErrorName = ErrorName,
  ErrorParamsArg extends ErrorParams = ErrorParams,
> extends Error {
  constructor(message: string, params?: ErrorParamsArg & { cause?: unknown })
  name: ErrorNameArg
}

/**
 * Creates a custom error type.
 *
 * `onCreate(error, params)` is optional and is called on
 * `new CustomErrorType('message', params)`.
 * By default, it sets any `params` as `error` properties. However, you can
 * override it with any custom logic to validate, normalize `params`, etc.
 *
 * @example
 * ```js
 * import errorType from 'error-type'
 *
 * const UserError = errorType('UserError')
 * const SystemError = errorType('SystemError')
 *
 * // Throwing with custom error types
 * try {
 *   throw new UserError('message')
 * } catch (error) {
 *   console.log(error.name) // 'UserError'
 *   console.log(error instanceof UserError) // true
 * }
 *
 * // Error properties can be set using the second argument
 * const userError = new UserError('message', { userId: 56 })
 * console.log(userError.userId) // 56
 *
 * // `error.cause` can be used even in older Node.js or browsers
 * try {
 *   doSomething()
 * } catch (cause) {
 *   throw new UserError('message', { cause })
 * }
 *
 * // Custom initialization logic
 * const DatabaseError = errorType('DatabaseError', (error, params) => {
 *   error.dbId = params.databaseId
 * })
 * const databaseError = new DatabaseError('message', { databaseId: 2 })
 * console.log(databaseError.dbId) // 2
 * console.log(databaseError.databaseId) // undefined
 * ```
 */
export default function errorType<
  ErrorNameArg extends ErrorName = ErrorName,
  ErrorParamsArg extends ErrorParams = ErrorParams,
>(
  errorName: ErrorNameArg,
  onCreate?: OnCreate<ErrorNameArg, ErrorParamsArg>,
): typeof CustomError<ErrorNameArg, ErrorParamsArg>
