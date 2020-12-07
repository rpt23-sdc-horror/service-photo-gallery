const isObject = (object) => {
  if (typeof object === 'object' && Array.isArray(object) === false) return true;
  return false;
};

const validateUpdateValue = (object) => {
  const keys = Object.keys(object);
  if (keys.length !== 1) throw new Error('More than 1 key');
  return keys[0];
};

module.exports = {
  isObject,
  validateUpdateValue,
};
