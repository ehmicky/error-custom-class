import type { ErrorName, ErrorParams } from 'error-class-utils'

export type { ErrorName, ErrorParams }

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
 *   throw new UserError('message', { props: { userId: 56 } })
 * } catch (error) {
 *   console.log(error.name) // 'UserError'
 *   console.log(error instanceof UserError) // true
 *   console.log(error.userId) // 56
 * }
 * ```
 */
export default function errorCustomClass<
  ErrorNameArg extends ErrorName = ErrorName,
  ErrorParamsArg extends ErrorParams = ErrorParams,
>(errorName: ErrorNameArg): typeof CustomError<ErrorNameArg, ErrorParamsArg>
