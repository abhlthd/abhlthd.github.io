import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import restConfig from '../services/config';
import getToken from '../services/get-token';
import PostThumbnail from '../components/PostThumbnail';

class ProfileDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      postsCount: 0,
      followerCount: 0,
      followingCount: 0,
      isOwned: false,
      followIndicator: null
    }
  }

  getPostsCount() {
    const url = restConfig.baseUrl;
    $.ajax({
      url: url + '/api/users/' + this.props.user._id + '/photos',
      method: 'GET',
      success: (data, status, xhr) => {
        this.setState({
          posts: data.photos,
          postsCount: data.photos.length
        });
      },
      error: (xhr, status, err) => {
        this.setState({
          postsCount: 0
        });
      }
    });
  }

  follow() {
    $.ajax({
      url: restConfig.baseUrl + '/api/follows/' + this.props.user._id,
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      success: (data, status, xhr) => {
        this.getFollowerCount();
      },
      error: (xhr, status, e) => {
        console.log("Unexpected error while requesting follow.");
      }
    });
  }

  unfollow() {
    $.ajax({
      url: restConfig.baseUrl + '/api/follows/' + this.props.user._id,
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      success: (data, status, xhr) => {
        this.getFollowerCount();
      },
      error: (xhr, status, e) => {
        console.log("Unexpected error while requesting unfollow.");
      }
    });
  }

  checkFollow(followers) {
    let token = getToken();
    $.ajax({
      url: restConfig.baseUrl + '/api/users/authed',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      success: (authedUser, status, xhr) => {
        let followIndicator = <button className="follow-btn" onClick={() => this.follow()}>Follow</button>;
        for (let i = 0; i < followers.length; i++) {
          let follower = followers[i];
          if (follower.user._id === authedUser._id) {
            followIndicator = <button className="unfollow-btn" onClick={() => this.unfollow()}>Following</button>;
            break;
          }
        }
        this.setState({
          followerCount: followers.length,
          followIndicator
        });
      },
      error: (xhr, status, e) => {
        console.log("Unexpected error while requesting authed user.");
      }
    });
  }

  getFollowerCount() {
    $.ajax({
      url: restConfig.baseUrl + '/api/follows/' + this.props.user._id + '/followers',
      success: (followers, status, xhr) => {
        this.checkFollow(followers);
      },
      error: (xhr, status, err) => {
        this.checkFollow([]);
      }
    });
  }

  getFollowingCount() {
    $.ajax({
      url: restConfig.baseUrl + '/api/follows/' + this.props.user._id + '/following',
      success: (data, status, xhr) => {
        this.setState({
          followingCount: data.length
        });
      },
      error: (xhr, status, err) => {
        this.setState({
          followingCount: 0
        });
      }
    });
  }

  checkOwned() {
    const token = getToken();
    $.ajax({
      url: restConfig.baseUrl + '/api/users/authed',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      },
      success: (data, status, xhr) => {
        let isOwned = false;
        if (data._id === this.props.user._id) {
          isOwned = true;
        }
        this.setState({ isOwned });
      },
      error: (xhr, status, e) => {
        this.setState({ isOwned: false });
      }
    });
  }

  componentWillMount() {
    this.getPostsCount();
    this.getFollowerCount();
    this.getFollowingCount();
    this.checkOwned();
  }

  logout() {
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = '/';
  }

  render() {
    let postList = this.state.posts.map(post => (
      <PostThumbnail post={post} key={post._id} />
    ));
    let options = null;
    if (this.state.isOwned) {
      options = (
        <div className="options">
          <button><Link to={'/profile/' + this.props.user._id + '/edit'} className="edit-btn">Edit Profile</Link></button>
          <button onClick={() => this.logout()}>Logout</button>
        </div>
      );
    } else {
      options = (
        <div className="options">
          {this.state.followIndicator}
        </div>
      );
    }
    return (
      <div className="profile-detail">
        <div className="overview">
          <img src={restConfig.baseUrl + '/' + this.props.user.avatar} width="300" />
          <div className="info">
            <div className="top-row">
              <h1>{this.props.user.username}</h1>
              {options}
            </div>
            <div className="middle-row">
              <span className="posts-count"><span>{this.state.postsCount}</span> posts</span>
              <span className="follower-count"><span>{this.state.followerCount}</span> followers</span>
              <span className="following-count"><span>{this.state.followingCount}</span> followings</span>
            </div>
            <div className="bottom-row">
              <span className="description">{this.props.user.description}</span>
            </div>
          </div>
        </div>
        <div className="posts">
          {postList}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.credential.token
  };
}

export default connect(mapStateToProps, null)(ProfileDetail);
