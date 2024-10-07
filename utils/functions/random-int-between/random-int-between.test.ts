import { generateRandomIntBetween } from './random-int-between';

describe('generateRandomIntBetween', () => {
  it('should generate a random number between the given min and max values', () => {
    const min = 1;
    const max = 100;
    const randomNumber = generateRandomIntBetween(min, max);
    expect(randomNumber).toBeGreaterThanOrEqual(min);
    expect(randomNumber).toBeLessThanOrEqual(max);
  });

  it('should generate a random number between 1 and 100 when no arguments are provided', () => {
    const randomNumber = generateRandomIntBetween();
    expect(randomNumber).toBeGreaterThanOrEqual(1);
    expect(randomNumber).toBeLessThanOrEqual(100);
  });

  it('should generate a random number between negative min and max values', () => {
    const min = -50;
    const max = -1;
    const randomNumber = generateRandomIntBetween(min, max);
    expect(randomNumber).toBeGreaterThanOrEqual(min);
    expect(randomNumber).toBeLessThanOrEqual(max);
  });

  it('should generate a random number when min and max are the same', () => {
    const min = 5;
    const max = 5;
    const randomNumber = generateRandomIntBetween(min, max);
    expect(randomNumber).toBe(min);
  });
});
