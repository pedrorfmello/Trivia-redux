const loginUser = (loginInfo) => ({
  type: 'LOGIN_USER',
  payload: {
    playerName: loginInfo.playerName,
    email: loginInfo.email,
  },
});

export {
  // eslint-disable-next-line import/prefer-default-export
  loginUser,
};
