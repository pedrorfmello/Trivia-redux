import * as local from './localStorage';
import store from '../redux/store';

const URL_TRIVIA_TOKEN = 'https://opentdb.com/api_token.php?command=request';
const URL_TRIVIA_CATEGORIES = 'https://opentdb.com/api_category.php';

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

// Acessa o Redux, confere as configurações no estado e atualiza a URL da requisição
const genetareSettingsURL = () => {
  const state = store.getState().settings;
  let URL_SETTINGS = 'https://opentdb.com/api.php?amount=5&';

  if (state.category !== 'any') {
    URL_SETTINGS = `${URL_SETTINGS}category=${state.category}&`;
  }

  if (state.difficulty !== 'any') {
    URL_SETTINGS = `${URL_SETTINGS}difficulty=${state.difficulty}&`;
  }

  if (state.type !== 'any') {
    URL_SETTINGS = `${URL_SETTINGS}type=${state.type}&`;
  }

  return `${URL_SETTINGS}token=`;
};

// Fazendo o fetch nas perguntas.
export const fetchTriviaQuestion = async () => {
  const token = await getTriviaToken();
  const response = await fetch(genetareSettingsURL() + token);
  const data = await response.json();
  return data.results;
};

export const fetchAllCategories = async () => {
  const response = await fetch(URL_TRIVIA_CATEGORIES);
  const data = await response.json();
  return data.trivia_categories;
};
