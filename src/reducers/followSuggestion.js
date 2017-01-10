import * as ActionTypes from '../actions';

const defaultState = {
  members: [],
};

const followSuggestion = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_FOLLOW_SUGGESTION_LIST_SUCCESS:
      return Object.assign({}, state, {
        members: action.members
      });
    case ActionTypes.FOLLOW_SUCCESS:
      let idx = state.members.findIndex((member) => {
        return member._id === action.follow.target_user_id;
      });
      let followedMember = Object.assign({}, state.members[idx], {
        isFollowed: true
      });
      return Object.assign({}, state, {
        members: [
          ...state.members.slice(0, idx),
          followedMember,
          ...state.members.slice(idx + 1, state.members.length)
        ]
      });
    case ActionTypes.UNFOLLOW_SUCCESS:
      let unFollowMemberIdx = state.members.findIndex((member) => {
        return member._id === action.follow.target_user_id;
      });
      let unfollowedMember = Object.assign({}, state.members[unFollowMemberIdx], {
        isFollowed: false
      });
      return Object.assign({}, state, {
        members: [
          ...state.members.slice(0, unFollowMemberIdx),
          unfollowedMember,
          ...state.members.slice(unFollowMemberIdx + 1, state.members.length)
        ]
      });
    default:
      return state;
  }
};

export default followSuggestion;
