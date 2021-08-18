import { isUrlValid } from '@/utils';

describe('isUrlValid', () => {
  it('should return true on valid URL', () => {
    const result = isUrlValid('https://www.glamrock.nl');
    expect(result).toBeTruthy();
  });

  it('should return false on invalid URL', () => {
    const result = isUrlValid('htps://www.glamrock.nl');
    expect(result).toBeFalsy();
  });

  it('should return true on valid URL with parameters', () => {
    const result = isUrlValid('https://www.glamrock.nl/?var=test&id=1');
    expect(result).toBeTruthy();
  });

  it('should return true on valid URL without prefix', () => {
    const result = isUrlValid('glamrock.nl/?var=test&id=1');
    expect(result).toBeTruthy();
  });
});
