import * as ActionTypes from '.';
import restConfig from '../services/config';

export const doRegister = (username, email, password, rePassword) => {
  return {
    type: ActionTypes.REGISTER,
    username,
    email,
    password,
    rePassword
  };
}

export const doLogin = (username, password) => {
  return {
    type: ActionTypes.LOGIN,
    username,
    password
  };
}

export const setToken = (token) => {
  return {
    type: ActionTypes.SET_TOKEN,
    token
  };
}

export const postPhoto = (credential, status, photo) => {
  return {
    type: ActionTypes.POST_PHOTO,
    credential,
    status,
    photo
  };
}

export const fetchFollowSuggestionList = (credential, limit) => {
  return {
    type: ActionTypes.FETCH_FOLLOW_SUGGESTION_LIST,
    credential,
    limit
  };
}

export const requestFollowMember = (credential, member) => {
  return {
    type: ActionTypes.REQUEST_FOLLOW,
    credential,
    member
  };
}

export const requestUnFollowMember = (credential, member) => {
  return {
    type: ActionTypes.REQUEST_UNFOLLOW,
    credential,
    member
  };
}

export const fetchTimelinePhotos = credential => {
  return {
    type: ActionTypes.FETCH_TIMELINE_PHOTOS,
    credential
  };
}

export const fetchLikes = (photo) => {
  return {
    type: ActionTypes.REQUEST_FETCH_LIKES,
    photo
  };
}

export const like = (credential, photo) => {
  return {
    type: ActionTypes.REQUEST_LIKE,
    credential,
    photo
  }
}

export const unlike = (credential, photo) => {
  return {
    type: ActionTypes.REQUEST_UNLIKE,
    credential,
    photo
  }
}

export const fetchComments = (photo) => {
  return {
    type: ActionTypes.REQUEST_FETCH_COMMENTS,
    photo
  };
}

export const comment = (credential, photo, comment) => {
  return {
    type: ActionTypes.REQUEST_COMMENT,
    credential,
    photo,
    comment
  };
}

export const getAuthedUser = credential => {
  return {
    type: ActionTypes.REQUEST_AUTHED_USER,
    credential
  };
}
