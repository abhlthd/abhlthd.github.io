import * as ActionTypes from '../actions';

const defaultState = {
  photos: []
};

const timeline = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_TIMELINE_PHOTOS_SUCCESS:
      return Object.assign({}, state, {
        photos: action.photos
      });
    case ActionTypes.FETCH_LIKES_SUCCESS: {
      let idx = state.photos.findIndex((photo) => {
        return photo._id === action.photoId;
      });
      let updatedPhoto = Object.assign({}, state.photos[idx], {
        likes: action.likes
      });
      return Object.assign({}, state, {
        photos: [
          ...state.photos.slice(0, idx),
          updatedPhoto,
          ...state.photos.slice(idx + 1, state.photos.length)
        ]
      });
    }
    case ActionTypes.LIKE_SUCCESS: {
      let photoId = state.photos.findIndex((photo) => {
        return photo._id === action.photoId;
      });
      let likesCount = state.photos[photoId].likesCount || 0;
      let likes = state.photos[photoId].likes || [];
      let likedPhoto = Object.assign({}, state.photos[photoId], {
        isLiked: true,
        likesCount: likesCount + 1,
        likes: [
          ...likes,
          action.like
        ]
      });
      return Object.assign({}, state, {
        photos: [
          ...state.photos.slice(0, photoId),
          likedPhoto,
          ...state.photos.slice(photoId + 1, state.photos.length)
        ]
      });
    }
    case ActionTypes.UNLIKE_SUCCESS: {
      let photoId = state.photos.findIndex((photo) => {
        return photo._id === action.photoId;
      });
      let likeId = state.photos[photoId].likes.findIndex((like) => {
        return like._id === action.like._id;
      });
      let unlikedPhoto = Object.assign({}, state.photos[photoId], {
        isLiked: false,
        likes: [
          ...state.photos[photoId].likes.slice(0, likeId),
          ...state.photos[photoId].likes.slice(likeId + 1, state.photos[photoId].likes.length)
        ]
      });
      return Object.assign({}, state, {
        photos: [
          ...state.photos.slice(0, photoId),
          unlikedPhoto,
          ...state.photos.slice(photoId + 1, state.photos.length)
        ]
      });
    }
    case ActionTypes.FETCH_COMMENTS_SUCCESS: {
      let idx = state.photos.findIndex((photo) => {
        return photo._id === action.photoId;
      });
      let updatedPhoto = Object.assign({}, state.photos[idx], {
        comments: action.comments
      });
      return Object.assign({}, state, {
        photos: [
          ...state.photos.slice(0, idx),
          updatedPhoto,
          ...state.photos.slice(idx + 1, state.photos.length)
        ]
      });
    }
    case ActionTypes.COMMENT_SUCCESS: {
      let photoId = state.photos.findIndex((photo) => {
        return photo._id === action.photoId;
      });
      let comments = state.photos[photoId].comments || [];
      let photo = Object.assign({}, state.photos[photoId], {
        comments: [
          ...comments,
          action.comment
        ]
      });
      return Object.assign({}, state, {
        photos: [
          ...state.photos.slice(0, photoId),
          photo,
          ...state.photos.slice(photoId + 1, state.photos.length)
        ]
      });
    }
    default:
      return state;
  }
};

export default timeline;
