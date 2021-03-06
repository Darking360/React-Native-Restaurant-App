import request from './request';
import { LOGIN_URL, REGISTER_URL, UPDATE_URL, RECOVER_URL } from './api_constants';

function doLogin(email, password) {
  const data = {
    email,
    password,
  };
  return request({ url: LOGIN_URL, method: 'POST', data });
}

function doRegister(email, password, address, name, description, role) {
  const data = {
    email,
    password,
    address,
    name,
    description,
    role,
  };
  return request({ url: REGISTER_URL, method: 'POST', data });
}

function updateProfile(email, password, name, description, address, headers) {
  const data = {
    email,
    password,
    name,
    description,
    address,
  };
  return request({ url: UPDATE_URL, method: 'PATCH', data, headers });
}

function recoverPassword(email) {
  return request({ url: `${RECOVER_URL}?email=${email}`, method: 'GET' });
}

export default {
  doLogin,
  doRegister,
  updateProfile,
  recoverPassword,
};
