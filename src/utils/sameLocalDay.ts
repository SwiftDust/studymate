/**
 * @description Compares two dates to see if they are the same local day.
 * @param a - The first date to compare.
 * @param b - The second date to compare.
 * @returns `true` if the dates are the same local day, `false` otherwise.
 */

export function sameLocalDay(a: number | Date, b: number | Date): boolean {
  const dateA = new Date(a);
  const dateB = new Date(b);
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}
