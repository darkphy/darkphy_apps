import { AUTH_TOKEN, REFRESH_TOKEN } from './constants.js';

export const saveToken = ({access_token, refresh_token}) => {
  localStorage.setItem(AUTH_TOKEN, access_token);
  localStorage.setItem(REFRESH_TOKEN, refresh_token);
}
