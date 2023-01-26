// Retorna o valor da chave 'token' do localStorage
export const getLocalToken = () => {
  const userLocalStorage = localStorage.getItem('token');
  if (userLocalStorage) {
    return userLocalStorage;
  }
};

// Adiciona a chave 'token' com o token recebido da api ao localStorage
export const setLocalToken = (token) => {
  localStorage.setItem('token', token);
};
