import React from 'react';
import restConfig from '../services/config';
import { Link } from 'react-router';

const FollowRow = (props) => {
  let member = props.member;
  let followIndicator;
  if (member.isFollowed) {
    followIndicator = <button className="unfollow-btn" onClick={() => props.unfollowMember(props.member)}>Following</button>;
  } else {
    followIndicator = <button className="follow-btn" onClick={() => props.followMember(props.member)}>Follow</button>;
  }
  return (
    <div className="follow-row">
      <div className="member">
        <Link to={'/profile/' + member._id} className="avatar">
          <img src={restConfig.baseUrl + '/' + member.avatar} alt="avatar" width="50" />
        </Link>
        <div className="username">
        <Link to={'/profile/' + member._id}>
          <h2>{member.username}</h2>
        </Link>
        <p>{member.description}</p>
        </div>
      </div>
      {followIndicator}
    </div>
  )
};

export default FollowRow;
