/**
 * Creates a custom error type.
 *
 * `onCreate(error, options)` is optional and is called on
 * `new ErrorType('message', options)`.
 * By default, it sets any `options` as `error` properties. However, you can
 * override it with any custom logic to validate, normalize options, etc.
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
 * const DatabaseError = errorType('DatabaseError', (error, options) => {
 *   error.dbId = options.databaseId
 * })
 * const databaseError = new DatabaseError('message', { databaseId: 2 })
 * console.log(databaseError.dbId) // 2
 * console.log(databaseError.databaseId) // undefined
 * ```
 */
export default function errorType<T extends ErrorParams>(
  errorName: string,
  onCreate?: OnCreate<T>,
): new (message: string, options?: T & { cause?: any }) => Error

export type OnCreate<T extends ErrorParams> = (error: Error, options: T) => void

export type ErrorParams = { [instanceProperty: string | symbol]: any }
