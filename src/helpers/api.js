import * as local from './localStorage';

const URL_TRIVIA_TOKEN = 'https://opentdb.com/api_token.php?command=request';

// Pega um token pelo fetch.
export const fetchTriviaToken = async () => {
  const response = await fetch(URL_TRIVIA_TOKEN);
  const data = await response.json();
  return data.token;
};

// Gera um token e adiciona ao localstorage
export const getTriviaToken = async () => {
  const token = await fetchTriviaToken();
  local.setLocalToken(token);
  if (token) return token;
};
