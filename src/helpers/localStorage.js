// Retorna o valor da chave 'token' do localStorage
export const getLocalToken = () => {
  const userLocalStorage = localStorage.getItem('token');
  if (userLocalStorage) {
    return userLocalStorage;
  }
};

// Retorna o valor da chave 'ranking' do localStorage
export const getLocalRanking = () => {
  const rankingLocalStorage = localStorage.getItem('ranking');
  if (rankingLocalStorage) {
    return JSON.parse(rankingLocalStorage);
  }
};

// Verifica se o ranking está criado no localStorage, caso não esteja ele cria
export const initiateRanking = () => {
  const rankingLocalStorage = localStorage.getItem('ranking');
  if (!rankingLocalStorage) {
    localStorage.setItem('ranking', '');
  }
};

// Adiciona uma nova pontuação a chave 'ranking' do localStorage
export const setLocalRanking = ({ playerName, score, photo }) => {
  const prevState = getLocalRanking();
  const playerInfo = { name: playerName, score, picture: photo };

  if (prevState.length !== 0) {
    const updatedRank = [
      ...prevState,
      playerInfo,
    ];
    localStorage.setItem('ranking', JSON.stringify(updatedRank));
  } else {
    localStorage.setItem('ranking', JSON.stringify([playerInfo]));
  }
};

// Adiciona a chave 'token' com o token recebido da api ao localStorage
export const setLocalToken = (token) => {
  localStorage.setItem('token', token);
};
