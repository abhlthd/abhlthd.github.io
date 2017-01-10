import React from 'react';
import { connect } from 'react-redux';
import TimelinePhotoCard from './TimelinePhotoCard';
import restConfig from '../services/config';
import { fetchTimelinePhotos, fetchLikes, like, unlike, fetchComments, comment } from '../actions/creators';
import getToken from '../services/get-token';

class Timeline extends React.Component {
  constructor(props) {
    super(props);

    this.props.getTimelinePhotos(this.props.token);

    this.state = {
      authedUser: this.props.authedUser
    }
  }

  getAuthedUser() {
    let token = getToken();
    $.ajax({
      url: restConfig.baseUrl + '/api/users/authed',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      },
      success: (data, status, xhr) => {
        this.setState({
          authedUser: data
        });
      },
      error: (xhr, status, e) => {
        console.log("Unexpected error while requesting authed user.");
      }
    });
  }

  componentWillMount() {
    this.getAuthedUser();
  }

  render() {
    const photoCardList = this.props.photos.filter(photo => {
      if (!photo.uploader) {
        return false;
      }
      return true;
    }).map(photo => (
      <TimelinePhotoCard
        photo={photo}
        key={photo._id}
        authedUser={this.state.authedUser}
        likesCount={photo.likesCount || 0}
        getLikes={photo => this.props.getLikes(photo)}
        like={photo => this.props.like(this.props.token, photo)}
        unlike={photo => this.props.unlike(this.props.token, photo)}
        comment={(photo, comment) => this.props.comment(this.props.token, photo, comment)}
        getComments={photo => this.props.getComments(photo)}/>
    ));

    return (
      <div className="timeline">
        {photoCardList}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.credential.token,
    photos: state.timeline.photos,
    authedUser: state.credential.authedUser
  }
};

const mapDispatchToProps = dispatch => (
  {
    getTimelinePhotos: token => {
      const credential = { token };
      dispatch(fetchTimelinePhotos(credential))
    },
    getLikes: photo => dispatch(fetchLikes(photo)),
    like: (token, photo) => {
      const credential = { token };
      dispatch(like(credential, photo));
    },
    unlike: (token, photo) => {
      const credential = { token };
      dispatch(unlike(credential, photo));
    },
    comment: (token, photo, c) => {
      const credential = { token };
      dispatch(comment(credential, photo, c));
    },
    getComments: photo => dispatch(fetchComments(photo))
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
