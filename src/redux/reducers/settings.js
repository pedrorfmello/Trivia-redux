// Esse reducer será responsável por tratar as configurações do jogo na chamada para a API
const INITIAL_STATE = {
  category: 'any',
  difficulty: 'any',
  type: 'any',
};

function settings(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'CHANGE_CONFIG':
    return {
      ...state,
      [action.payload.config]: action.payload.value,
    };
  default:
    return state;
  }
}

export default settings;
