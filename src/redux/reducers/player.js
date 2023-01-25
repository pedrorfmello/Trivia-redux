// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  playerName: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN_USER':
    return {
      ...state,
      playerName: action.payload.playerName,
      gravatarEmail: action.payload.email,
    };
  case 'CHANGE_SCORE':
    return {
      ...state,
      score: state.score + action.payload.score,
      assertions: state.assertions + action.payload.assertions,
    };
  case 'RESET_STORE':
    return {
      ...state,
      playerName: '',
      gravatarEmail: '',
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
}

export default player;
