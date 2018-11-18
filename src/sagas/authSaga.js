import { call, put, takeLatest } from 'redux-saga/effects';
import storage from 'redux-persist/lib/storage';
import { ToastAndroid } from 'react-native';

const authTokenSelector = state => state.auth.loginMessage.token;

import Auth from '../service/login';

function* loginTask(action) {
  try {
    yield put({
      type: 'UPDATE_LOADING_ON',
    });
    const { payload } = action;

    const authToken = yield select(authTokenSelector);

    const res = yield call(Auth.update, payload.email, payload.password, payload.name, payload.description, {
      Authorization: `Bearer ${authToken}`,
    });

    if (res.status === 200) {
      yield put({
        type: 'UPDATE_LOADING_OFF',
      });
      ToastAndroid.show('Perfil actualizado!', ToastAndroid.SHORT);
    } else {
      yield put({
        type: 'UPDATE_LOADING_OFF',
      });
      ToastAndroid.show('Algo ha ido mal, intenta de nuevo!', ToastAndroid.SHORT);
    }
  } catch (e) {
    console.log(e);
    const payload = typeof e === 'string' ? { message: e } : e.data;
    yield put({
      type: 'UPDATE_LOADING_OFF',
    });
    ToastAndroid.show('Algo ha ido mal, intenta de nuevo!', ToastAndroid.SHORT);
  }
}

function* loginTask(action) {
  try {
    yield put({
      type: 'AUTH_LOGIN_LOADING',
    });
    const { payload } = action;

    const res = yield call(Auth.doLogin, payload.email, payload.password);

    if (res.status === 200) {
      yield put({
        type: 'AUTH_LOGIN_SUCCESS',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'AUTH_LOGIN_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    console.log(e);
    const payload = typeof e === 'string' ? { message: e } : e.data;
    yield put({
      type: 'AUTH_LOGIN_ERROR',
      payload,
    });
  }
}

function* registerTask(action) {
  try {
    yield put({
      type: 'AUTH_REGISTER_LOADING',
    });

    const { payload } = action;

    const res = yield call(Auth.doRegister, payload.email, payload.password);

    if (res.status === 200) {
      yield put({
        type: 'AUTH_REGISTER_SUCCESS',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'AUTH_REGISTER_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    console.log(e);
    const payload = typeof e === 'string' ? { message: e } : e.data;
    yield put({
      type: 'AUTH_REGISTER_ERROR',
      payload,
    });
  }
}

function* logoutTask() {
  try {
    storage.removeItem('authToken');
    yield put({
      type: 'AUTH_LOGOUT_RESET',
    });
  } catch (e) {
    yield put({
      type: 'AUTH_LOGOUT_RESET',
    });
  }
}

function* authSaga() {
  yield takeLatest('AUTH_LOGIN', loginTask);
  yield takeLatest('AUTH_REGISTER', registerTask);
  yield takeLatest('AUTH_LOGOUT', logoutTask);
}

export default authSaga;
