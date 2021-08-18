const createExcerpt = (text, options) => {
  const { length, suffix } = options || {};

  if (!typeof text === 'string') {
    return '';
  }

  return `${text.substring(0, length || text.length)}${suffix || ''}`;
};

export default createExcerpt;
