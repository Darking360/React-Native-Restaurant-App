import { call, put, select, takeLatest } from 'redux-saga/effects';
import API from '../service/orders';
import APIFood from '../service/food';
import { ToastAndroid } from 'react-native';

const authTokenSelector = state => state.auth.loginMessage.token;
const userIdSelector = state => state.auth.loginMessage.userId;

function* orderFetchTask(action) {
  try {
    const { payload } = action;

    const authToken = yield select(authTokenSelector);
    const userId = yield select(userIdSelector);

    const res = yield call(API.getOrders, userId, {
      Authorization: `Bearer ${authToken}`,
    });

    if (res.status === 200) {
      yield put({
        type: 'FETCH_ORDERS_SUCCESS',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'FETCH_ORDERS_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: 'FETCH_ORDERS_ERROR',
      payload: e.data,
    });
  }
}

function* orderTask(action) {
  try {
    const { payload } = action;

    const authToken = yield select(authTokenSelector);
    const userId = yield select(userIdSelector);

    const res = yield call(API.createOrder, userId, payload.items, payload.total, {
      Authorization: `Bearer ${authToken}`,
    });

    if (res.status === 200) {
      yield put({
        type: 'CREATE_ORDER_SUCCESS',
        payload: res.data.order,
      });
    } else {
      yield put({
        type: 'CREATE_ORDER_ERROR',
        payload: res.data,
      });
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: 'CREATE_ORDER_ERROR',
      payload: e.data,
    });
  }
}

function* doSearch(action) {
  console.log('AIUDA ----->')
  try {
    const { payload } = action;

    yield put({
      type: 'SEARCHING_ON',
    });

    const method = payload.option === 0 ? APIFood.doSearchFood : APIFood.doSearchRestaurant;

    const res = yield call(method, payload.search);

    if (res.status === 200) {
      yield put({
        type: 'SEARCHING_OFF',
      });
      yield put({
        type: 'SET_SEARCH_RESULTS',
        payload: res.data,
      });
    } else {
      yield put({
        type: 'SEARCHING_OFF',
      });
      ToastAndroid.show('Hubo un error buscando', ToastAndroid.SHORT);
    }
  } catch (e) {
    console.log(e);
    ToastAndroid.show('Error de servidor en busqueda, contacta a soporte', ToastAndroid.SHORT);
    yield put({
      type: 'SEARCHING_OFF',
    });
  }
}

function* orderSaga() {
  yield takeLatest('FETCH_ORDERS', orderFetchTask);
  yield takeLatest('CREATE_ORDER', orderTask);
  yield takeLatest('DO_SEARCH', doSearch);
}

export default orderSaga;
