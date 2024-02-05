import Cookies from 'js-cookie';
import config from '@/config';

const TokenKey = `${config.productSetCode}_access_token`;

export function getAuthToken() {
  return Cookies.get(TokenKey);
}

export function setAuthToken(token) {
  Cookies.set(TokenKey, token, {
    expires: 7,
  });
}
