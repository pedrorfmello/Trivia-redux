/* eslint-disable import/prefer-default-export */

// Embaralha um array
export const shuffle = (array) => {
  const diff = 0.5;
  array.sort(() => Math.random() - diff);
  return array;
};
