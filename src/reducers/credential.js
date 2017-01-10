import * as ActionTypes from '../actions';

const defaultState = {
  isFetching: false,
  didRegister: false,
  token: null
};

export const credential = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_REGISTER:
      return Object.assign({}, state, {
        isFetching: true,
        didRegister: false
      });
    case ActionTypes.REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didRegister: true
      });
    case ActionTypes.REQUEST_LOGIN:
      return Object.assign({}, state, {
        isFetching: true
      });
    case ActionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        token: action.token
      });
    case ActionTypes.SET_TOKEN:
      return Object.assign({}, state, {
        token: action.token
      });
    case ActionTypes.GET_AUTHED_USER_SUCCESS:
      return Object.assign({}, state, {
        authedUser: action.authedUser
      });
    default:
      return state;
  }
};
