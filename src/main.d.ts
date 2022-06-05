/**
 *
 * @example
 * ```js
 * ```
 */
export default function errorType(
  name: string,
  onCreate?: (error: Error, options: {}) => void,
): new (
  message: string,
  options?: { cause?: any; [instanceProperty: string | symbol]: any },
) => Error
