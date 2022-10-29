import type { ErrorName } from 'error-class-utils'

export type { ErrorName }

/**
 * Custom error class
 */
export declare class CustomError<
  ErrorNameArg extends ErrorName = ErrorName,
  Options extends object = object,
> extends Error {
  constructor(message: string, params?: Options & { cause?: unknown })
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
  Options extends object = object,
>(errorName: ErrorNameArg): typeof CustomError<ErrorNameArg, Options>
