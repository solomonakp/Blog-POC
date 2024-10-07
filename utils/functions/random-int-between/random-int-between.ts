/**
 * generates random number between min and max
 * @param min - minimum number
 * @param max - maximum number
 * @returns random number
 *
 */

export const generateRandomIntBetween = (min = 1, max = 100) =>
  Math.floor(Math.random() * (max - min + 1) + min);
