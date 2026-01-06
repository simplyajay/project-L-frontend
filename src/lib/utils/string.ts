/**
 * Converts empty string values in an object to undefined.
 *
 * This is useful for forms where you want to ignore fields
 * that were left empty before sending them to a backend or database.
 *
 * @template T - The type of the object
 * @param {T} obj - The object to process
 * @returns {T} A new object where all empty strings are replaced with undefined
 */
export const emptyStringsToUndefined = <T extends Record<string, any>>(obj: T): T => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, value === "" ? undefined : value])
  ) as T;
};
