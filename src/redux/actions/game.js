const changeScore = (setScore) => ({
  type: 'CHANGE_SCORE',
  payload: {
    score: setScore.score,
    assertions: setScore.assertions,
  },
});

export {
  // eslint-disable-next-line import/prefer-default-export
  changeScore,
};
