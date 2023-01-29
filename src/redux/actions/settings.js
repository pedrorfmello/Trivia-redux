const changeConfig = (newConfig) => ({
  type: 'CHANGE_CONFIG',
  payload: {
    config: newConfig.config,
    value: newConfig.value,
  },
});

export {
  // eslint-disable-next-line import/prefer-default-export
  changeConfig,
};
