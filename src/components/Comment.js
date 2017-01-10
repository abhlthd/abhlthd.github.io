import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const Comment = (props) => (
  <div className="comment">
    <Link to={'/profile/' + props.comment.user._id}><span>{props.comment.user ? props.comment.user.username : props.user.username}</span></Link>
    <p>{props.comment.comment}</p>
  </div>
);

const mapStateToProps = (state) => (
  {
    user: state.credential.authedUser
  }
);

export default connect(mapStateToProps, null)(Comment);
