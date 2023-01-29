export const changeScore = (setScore) => ({
  type: 'CHANGE_SCORE',
  payload: {
    score: setScore.score,
    assertions: setScore.assertions,
  },
});

export const resetGame = () => ({
  type: 'RESET_STORE',
  payload: {},
});
