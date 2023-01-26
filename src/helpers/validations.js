export const emailValidation = (email) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!email || regex.test(email) === false) {
    return false;
  }
  return true;
};

export const nameValidation = (name) => {
  const minLength = 3;
  if (name.length < minLength) {
    return false;
  }
  return true;
};
