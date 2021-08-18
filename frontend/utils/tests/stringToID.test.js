import { stringToID } from '@/utils';

describe('stringToID', () => {
  it('should return lowercase string with dashes', () => {
    const result = stringToID('This is a string');
    expect(result).toBe('this-is-a-string');
  });

  it('should return string when parsing a number', () => {
    const result = stringToID(123);
    expect(result).toBe('123');
  });

  it('should return string when parsing a special characters', () => {
    const result = stringToID('String with special characters #*&(@');
    expect(result).toBe('string-with-special-characters------');
  });

  it('should return string when parsing a string with variable', () => {
    const variable = 123;
    const result = stringToID(`This is a string with a variable: ${variable}`);
    expect(result).toBe('this-is-a-string-with-a-variable--123');
  });
});
