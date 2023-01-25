export const getLocalToken = () => {
  const userLocalStorage = localStorage.getItem('token');
  if (userLocalStorage) {
    return userLocalStorage;
  }
};

export const setLocalToken = (token) => {
  localStorage.setItem('token', token);
};
