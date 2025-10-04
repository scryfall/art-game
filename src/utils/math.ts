/**
 * Get a random item from an array.
 *
 * @param array The array to pick from
 * @returns A random item from that array
 */
export function pickRandomItem(array: []): undefined;
export function pickRandomItem<T>(array: T[]): T;
export function pickRandomItem<T>(array: T[]): T | undefined {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}
