import React from 'react';
import { connect } from 'react-redux';
import { fetchFollowSuggestionList, requestFollowMember, requestUnFollowMember } from '../actions/creators';
import FollowRow from '../components/FollowRow';

class FollowTable extends React.Component {
  constructor(props) {
    super(props);

    this.props.getFollowSuggestionList(this.props.token, 3);
  }

  render() {
    const followRowList = this.props.members.map(member => (
      <FollowRow member={member}
        key={member._id}
        followMember={(member) => this.props.followMember(this.props.token, member)}
        unfollowMember={(member) => this.props.unfollowMember(this.props.token, member)}/>
    ));
    return (
      <div className="follow-suggestion">
        <div className="suggestion-header">
          <h1>Suggestions for you</h1>
        </div>
        {followRowList}
      </div>
    )
  }
}

const mapStatetoProps = state => (
  {
    token: state.credential.token,
    members: state.followSuggestion.members
  }
);

const mapDispatchToProps = dispatch => (
  {
    getFollowSuggestionList: (token, limit) => {
      const credential = { token };
      dispatch(fetchFollowSuggestionList(credential, limit));
    },
    followMember: (token, member) => {
      const credential = { token };
      dispatch(requestFollowMember(credential, member));
    },
    unfollowMember: (token, member) => {
      const credential = { token };
      dispatch(requestUnFollowMember(credential, member));
    }
  }
);

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(FollowTable);
