/**
 * Get a promise that resolves after `ms` milliseconds.
 * @param ms The milliseconds to wait
 */
export function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
