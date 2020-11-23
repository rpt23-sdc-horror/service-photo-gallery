const rng = (inputMin, inputMax) => {
  const min = Math.ceil(inputMin);
  const max = Math.floor(inputMax);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = {
  rng,
};
