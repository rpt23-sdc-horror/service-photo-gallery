const isObject = (object) => {
  if (typeof object === 'object' && Array.isArray(object) === false) return true;

  return false;
};

module.exports = {
  isObject,
};
