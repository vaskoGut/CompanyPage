const hasConstent = (consent, accepted, type) => {
  const cookie = consent && accepted && accepted.find((s) => s === type);

  if (cookie) {
    return true;
  }

  return false;
};

export default hasConstent;
