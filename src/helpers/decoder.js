/* eslint-disable import/prefer-default-export */

// Recebe uma string em HTML e retorna ela decofidicada
export const decoder = (encoded) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = encoded;
  return txt.value;
};
