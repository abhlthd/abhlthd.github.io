import { put, call, fork, takeEvery, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from '../actions';
import api from '../services/api';

/*--------------------------
          WORKERS
---------------------------*/
function* requestRegister(action) {
  try {
    yield put({ type: ActionTypes.REQUEST_REGISTER });
    yield call(api.register, action.username, action.email, action.password, action.rePassword);
    yield put({ type: ActionTypes.RESET_ERROR_MESSAGE });
    yield put({ type: ActionTypes.REGISTER_SUCCESS });
  } catch (error) {
    yield put({
      type: ActionTypes.REGISTER_FAILURE,
      error
    });
  }
}

function* requestLogin(action) {
  try {
    yield put({ type: ActionTypes.REQUEST_LOGIN });
    let token = yield call(api.login, action.username, action.password);
    document.cookie = "token=" + token;
    yield put({ type: ActionTypes.RESET_ERROR_MESSAGE });
    yield put({
      type: ActionTypes.LOGIN_SUCCESS,
      token
    });
  } catch (error) {
    yield put({
      type: ActionTypes.LOGIN_FAILURE,
      error
    });
  }
}

function* requestAuthedUser(action) {
  try {
    let authedUser = yield call(api.getAuthedUser, action.credential);
    yield put({
      type: ActionTypes.GET_AUTHED_USER_SUCCESS,
      authedUser
    });
  } catch (error) {
    // Add later
  }
}

/*---------------------------
          WATCHERS
----------------------------*/
export function* watchRegister() {
  yield takeEvery(ActionTypes.REGISTER, requestRegister);
}

export function* watchLogin() {
  yield takeEvery(ActionTypes.LOGIN, requestLogin);
}

export function* watchGetAuthedUser() {
  yield takeEvery(ActionTypes.REQUEST_AUTHED_USER, requestAuthedUser);
}
