/**
 *
 * @example
 * ```js
 * ```
 */
export default function errorType<
  T extends { [instanceProperty: string | symbol]: any },
>(
  name: string,
  onCreate?: (error: Error, options: T) => void,
): new (message: string, options?: { cause?: any } & T) => Error
