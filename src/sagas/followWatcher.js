import { put, call, fork, takeEvery, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from '../actions';
import api from '../services/api';

function* fetchFollowSuggestionList(action) {
  try {
    let members = yield call(api.fetchFollowSuggestionList, action.credential, action.limit);
    yield put({
      type: ActionTypes.FETCH_FOLLOW_SUGGESTION_LIST_SUCCESS,
      members
    });
  } catch (error) {
    // Do nothing
  }
}

function* requestFollow(action) {
  try {
    let result = yield call(api.followMember, action.credential, action.member);
    yield put({
      type: ActionTypes.FOLLOW_SUCCESS,
      follow: result
    })
  } catch (error) {
    // Add later
  }
}

function* requestUnFollow(action) {
  try {
    let result = yield call(api.unfollowMember, action.credential, action.member);
    yield put({
      type: ActionTypes.UNFOLLOW_SUCCESS,
      follow: result
    })
  } catch (error) {
    // Add later
  }
}

export function* watchFollowSuggestion() {
  yield takeEvery(ActionTypes.FETCH_FOLLOW_SUGGESTION_LIST, fetchFollowSuggestionList);
}

export function* watchFollowMember() {
  yield takeEvery(ActionTypes.REQUEST_FOLLOW, requestFollow);
}

export function* watchUnFollowMember() {
  yield takeEvery(ActionTypes.REQUEST_UNFOLLOW, requestUnFollow);
}
