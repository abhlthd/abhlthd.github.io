import React from 'react';
import { Link } from 'react-router';
import restConfig from '../services/config';
import Comment from '../components/Comment';
import getToken from '../services/get-token';

class TimelinePhotoCard extends React.Component {
  constructor(props) {
    super(props);

    this.props.getLikes(this.props.photo);
    this.props.getComments(this.props.photo);

    this.state = {
      likesOffset: 0,
      isLiked: false,
      comment: '',
      commentList: ''
    };
  }

  getCommentList(comments) {
    $.ajax({
      url: restConfig.baseUrl + '/api/comments/' + this.props.photo._id,
      method: 'GET',
      success: (data, status, xhr) => {
        let comments = data.map(comment => {
          return <Comment key={comment._id} comment={comment} />;
        });
        this.setState({
          commentList: comments
        });
      },
      error: (xhr, status, e) => {
        console.log("Unexpected error while requesting comments of photos.");
      }
    });
  }

  like() {
    this.props.like(this.props.photo);
    this.setState({
      likesOffset: 1,
      isLiked: true
    });
  }

  unlike() {
    this.props.unlike(this.props.photo);
    this.setState({
      likesOffset: -1,
      isLiked: false
    });
  }

  checkLikes() {
    $.ajax({
      url: restConfig.baseUrl + '/api/users/authed',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      success: (authedUser, status, xhr) => {
        $.ajax({
          url: restConfig.baseUrl + '/api/likes/' + this.props.photo._id,
          method: 'GET',
          success: (likes, status, xhr) => {
            for (let i = 0; i < likes.length; i++) {
              let like = likes[i];
              if (like.user._id === authedUser._id) {
                this.setState({ isLiked: true });
                break;
              }
            }
          },
          error: (xhr, status, e) => {
            console.log("Unexpected error while requesting likes of photos.");
          }
        });
      },
      error: (xhr, status, e) => {
        console.log("Unexpected error while requesting authed user.");
      }
    });
  }

  componentWillMount() {
    this.getCommentList();
    this.checkLikes();
  }

  onInputChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  comment() {
    $.ajax({
      url: restConfig.baseUrl + '/api/comments/',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      data: {
        photo_id: this.props.photo._id,
        comment: this.state.comment
      },
      success: (data, status, xhr) => {
        this.getCommentList();
      },
      error: (xhr, status, e) => {
        console.log("Unexpected error while requesting comment photos.");
      }
    });
  }

  render() {
    const photo = this.props.photo;
    const uploader = photo.uploader;
    const photoUrl = restConfig.baseUrl + '/upload/' + photo.filename;

    let likeBtn = <a className="like-btn" onClick={() => this.like()}><img src="img/like.png"/></a>;
    if (this.state.isLiked) {
      likeBtn = <a className="like-btn" onClick={() => this.unlike()}><img src="img/liked.png"/></a>;
    }

    return (

      /*<div className="photo-card">
        <div className="card-header">
          <div className="uploader">
            <a href="#" className="avatar">
              <img src={restConfig.baseUrl + '/' + uploader.avatar} alt="avatar" width="50" />
            </a>
            <a href="#" className="username">
              <span>{uploader.username}</span>
            </a>
          </div>
          <span className="upload-date">{this.props.photo.date}</span>
        </div>
        <div className="card-content">
          <img src={photoUrl} alt="photo" width="600"/>
          <span>{(this.props.photo.likes ? this.props.photo.likes.length : 0)} likes</span>
          <div className="card-status">
            <a href="#" className="username">
              <span>{uploader.username}</span>
            </a>
            <p className="status">{this.props.photo.status}</p>
          </div>
        </div>
        <div className="card-comment">
          <span>Comments</span>
          {commentList}
        </div>
        <div className="card-footer">
          {likeBtn}
          <input type="text" name="comment" placeholder="Add a comment..."
            value={this.state.comment}
            onChange={evt => this.onInputChange(evt)}/>
          <button className="submit-comment-btn" onClick={() => this.props.comment(photo, this.state.comment)}>Send</button>
        </div>
      </div>*/
      <div className="photo-card">
        <div className="card-header">
          <div className="uploader">
            <Link to={'/profile/' + uploader._id} className="avatar">
              <img src={restConfig.baseUrl + '/' + uploader.avatar} alt="avatar" width="50" />
            </Link>
            <Link to={'/profile/' + uploader._id} className="username">
              <h2>{uploader.username}</h2>
            </Link>
          </div>
          <p className="upload-date">{this.props.photo.date}</p>
        </div>
        <div className="card-content">
          <img src={photoUrl} alt="photo" width="600"/>
          <p className="num-liked">{this.props.photo.likes ? this.props.photo.likes.length : 0} likes</p>
          <div className="card-status">
            <Link to={'/profile/' + uploader._id} className="usernamestt">
              <p>{uploader.username}</p>
            </Link>
            <p className="status">{this.props.photo.status}</p>
          </div>
        </div>
        <div className="card-comment">
          {this.state.commentList}
        </div>
        <div className="card-footer">
          {likeBtn}
          <input type="text" name="comment" placeholder="Add a comment..." value={this.state.comment}
          onChange={evt => this.onInputChange(evt)}/>
          <a className="submit-comment-btn" onClick={() => this.comment()}><img src="img/send.png"/></a>
        </div>
      </div>
    );
  }
}

export default TimelinePhotoCard;
