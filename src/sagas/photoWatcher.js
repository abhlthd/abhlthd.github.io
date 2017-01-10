import { put, call, fork, takeEvery, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from '../actions';
import api from '../services/api';

function* requestPostPhoto(action) {
  try {
    yield put({ type: ActionTypes.REQUEST_POST_PHOTO });
    yield call(api.postPhoto, action.credential, action.status, action.photo);
    yield put({ type: ActionTypes.RESET_ERROR_MESSAGE });
    yield put({ type: ActionTypes.POST_PHOTO_SUCCESS });
  } catch (error) {
    yield put({
      type: ActionTypes.POST_PHOTO_FAILURE,
      error
    });
  }
}

export function* watchPostPhoto() {
  yield takeEvery(ActionTypes.POST_PHOTO, requestPostPhoto);
}
