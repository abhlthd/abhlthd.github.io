import { put, call, fork, takeEvery, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from '../actions';
import api from '../services/api';

function* fetchTimelinePhotos(action) {
  try {
    let photos = yield call(api.fetchTimelinePhotos, action.credential);
    yield put({
      type: ActionTypes.FETCH_TIMELINE_PHOTOS_SUCCESS,
      photos
    });
  } catch (error) {
    // Add later
  }
}

function* fetchLikes(action) {
  try {
    let likes = yield call(api.fetchLikes, action.photo);
    yield put({
      type: ActionTypes.FETCH_LIKES_SUCCESS,
      photoId: action.photo._id,
      likes
    });
  } catch (error) {
    // Add later
  }
}

function* like(action) {
  try {
    let like = yield call(api.like, action.credential, action.photo);
    yield put({
      type: ActionTypes.LIKE_SUCCESS,
      photoId: action.photo._id,
      like
    });
  } catch (error) {
    // Add later
  }
}

function* unlike(action) {
  try {
    let like = yield call(api.unlike, action.credential, action.photo);
    yield put({
      type: ActionTypes.UNLIKE_SUCCESS,
      photoId: action.photo._id,
      like
    });
  } catch (error) {
    // Add later
  }
}

function* fetchComments(action) {
  try {
    let comments = yield call(api.fetchComments, action.photo);
    yield put({
      type: ActionTypes.FETCH_COMMENTS_SUCCESS,
      photoId: action.photo._id,
      comments
    });
  } catch (error) {
    // Add later
  }
}

function* comment(action) {
  try {
    let comment = yield call(api.comment, action.credential, action.photo, action.comment);
    yield put({
      type: ActionTypes.COMMENT_SUCCESS,
      photoId: action.photo._id,
      comment
    });
  } catch (error) {
    // Add later
  }
}

export function* watchFetchTimelinePhotos() {
  yield takeEvery(ActionTypes.FETCH_TIMELINE_PHOTOS, fetchTimelinePhotos);
}

export function* watchFetchLikes() {
  yield takeEvery(ActionTypes.REQUEST_FETCH_LIKES, fetchLikes);
}

export function* watchLike() {
  yield takeEvery(ActionTypes.REQUEST_LIKE, like);
}

export function* watchUnLike() {
  yield takeEvery(ActionTypes.REQUEST_UNLIKE, unlike);
}

export function* watchFetchComments() {
  yield takeEvery(ActionTypes.REQUEST_FETCH_COMMENTS, fetchComments);
}

export function* watchComment() {
  yield takeEvery(ActionTypes.REQUEST_COMMENT, comment);
}
