/* eslint-disable import/prefer-default-export */
import md5 from 'crypto-js/md5';

export const hashEmail = (email) => {
  const emailHash = md5(email).toString();
  return `https://www.gravatar.com/avatar/${emailHash}`;
};
