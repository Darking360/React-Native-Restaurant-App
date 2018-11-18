import request from './request';
import { LOGIN_URL, REGISTER_URL, UPDATE_URL } from './api_constants';

function doLogin(email, password) {
  const data = {
    email,
    password,
  };
  return request({ url: LOGIN_URL, method: 'POST', data });
}

function doRegister(email, password) {
  const data = {
    email,
    password,
  };
  return request({ url: REGISTER_URL, method: 'POST', data });
}

function updateProfile(email, password, name, description, headers) {
  const data = {
    email,
    password,
    name,
    description
  };
  return request({ url: UPDATE_URL, method: 'PATCH', data, headers });
}

export default {
  doLogin,
  doRegister,
  updateProfile,
};
