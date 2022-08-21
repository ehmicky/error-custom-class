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
 * Called on `new CustomError('message', params)`
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
 * Creates a custom error class.
 *
 * `onCreate(error, params)` is optional and is called on
 * `new CustomError('message', params)`.
 * By default, it sets any `params.props` as `error` properties. However, you
 * can override it with any custom logic to validate, normalize `params`, etc.
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
 *
 * const userError = new UserError('message', { props: { userId: 56 } })
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
 * const DatabaseError = errorCustomClass('DatabaseError', (error, { props }) => {
 *   error.dbId = props.databaseId
 * })
 * const databaseError = new DatabaseError('message', { props: { databaseId: 2 } })
 * console.log(databaseError.dbId) // 2
 * console.log(databaseError.databaseId) // undefined
 * ```
 */
export default function errorCustomClass<
  ErrorNameArg extends ErrorName = ErrorName,
  ErrorParamsArg extends ErrorParams = ErrorParams,
>(
  errorName: ErrorNameArg,
  onCreate?: OnCreate<ErrorNameArg, ErrorParamsArg>,
): typeof CustomError<ErrorNameArg, ErrorParamsArg>
