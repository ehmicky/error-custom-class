/**
 *
 * @example
 * ```js
 * ```
 */
export default function errorType<
  T extends { [instanceProperty: string | symbol]: any },
>(
  errorName: string,
  onCreate?: (error: Error, options: T) => void,
): new (message: string, options?: T & { cause?: any }) => Error
