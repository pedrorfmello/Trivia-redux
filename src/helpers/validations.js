// Valida se o email tem um formato válido
export const emailValidation = (email) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!email || regex.test(email) === false) {
    return false;
  }
  return true;
};

// Valida se o nome inserido contém ao menos 3 catacteres
export const nameValidation = (name) => {
  const minLength = 3;
  if (name.length < minLength) {
    return false;
  }
  return true;
};
