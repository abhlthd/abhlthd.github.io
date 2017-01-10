import * as ActionTypes from '../actions';

const defaultState = {
  didPostPhoto: false,
  isFetching: false
};

const photo = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_POST_PHOTO:
      return Object.assign({}, state, {
        isFetching: true,
        didPostPhoto: false
      });
    case ActionTypes.POST_PHOTO_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didPostPhoto: true
      });
    default:
      return state;
  }
};

export default photo;
