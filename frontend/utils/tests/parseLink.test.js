import { parseLink } from '@/utils';

describe('parseLink', () => {
  it('should return link object', () => {
    const result = parseLink('https://www.glamrock.nl');
    expect(result).toStrictEqual({
      hash: '',
      host: 'www.glamrock.nl',
      hostname: 'www.glamrock.nl',
      href: 'https://www.glamrock.nl',
      pathname: '',
      port: undefined,
      protocol: 'https:',
      search: '',
    });
  });

  it('should return link object with search params', () => {
    const result = parseLink('https://www.glamrock.nl?search=zoeken');
    expect(result).toStrictEqual({
      hash: '',
      host: 'www.glamrock.nl',
      hostname: 'www.glamrock.nl',
      href: 'https://www.glamrock.nl?search=zoeken',
      pathname: '',
      port: undefined,
      protocol: 'https:',
      search: '?search=zoeken',
    });
  });

  it('should return link object with hash', () => {
    const result = parseLink('https://www.glamrock.nl#hash');
    expect(result).toStrictEqual({
      hash: '#hash',
      host: 'www.glamrock.nl',
      hostname: 'www.glamrock.nl',
      href: 'https://www.glamrock.nl#hash',
      pathname: '',
      port: undefined,
      protocol: 'https:',
      search: '',
    });
  });

  it('should return link object with search params and hash', () => {
    const result = parseLink('https://www.glamrock.nl?search=zoeken&type=test#hash');
    expect(result).toStrictEqual({
      hash: '#hash',
      host: 'www.glamrock.nl',
      hostname: 'www.glamrock.nl',
      href: 'https://www.glamrock.nl?search=zoeken&type=test#hash',
      pathname: '',
      port: undefined,
      protocol: 'https:',
      search: '?search=zoeken&type=test',
    });
  });

  it('should return link object with pathname', () => {
    const result = parseLink('https://www.glamrock.nl/path/post');
    expect(result).toStrictEqual({
      hash: '',
      host: 'www.glamrock.nl',
      hostname: 'www.glamrock.nl',
      href: 'https://www.glamrock.nl/path/post',
      pathname: '/path/post',
      port: undefined,
      protocol: 'https:',
      search: '',
    });
  });

  it('should return link object with pathname, search params and hash', () => {
    const result = parseLink('https://www.glamrock.nl/path/post?search=test#anchor');
    expect(result).toStrictEqual({
      hash: '#anchor',
      host: 'www.glamrock.nl',
      hostname: 'www.glamrock.nl',
      href: 'https://www.glamrock.nl/path/post?search=test#anchor',
      pathname: '/path/post',
      port: undefined,
      protocol: 'https:',
      search: '?search=test',
    });
  });
});
