import * as local from './localStorage';

const URL_TRIVIA_TOKEN = 'https://opentdb.com/api_token.php?command=request';
const URL_TRIVIA_QUESTION = 'https://opentdb.com/api.php?amount=5&token=';

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

// Fazendo o fetch nas perguntas.
export const fetchTriviaQuestion = async () => {
  const token = await getTriviaToken();
  const response = await fetch(URL_TRIVIA_QUESTION + token);
  const data = await response.json();
  return data.results;
};
