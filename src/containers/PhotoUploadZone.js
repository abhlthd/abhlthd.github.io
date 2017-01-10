import React from 'react';
import { connect } from 'react-redux';
import restConfig from '../services/config';
import { postPhoto } from '../actions/creators';

window.URL = window.URL || window.webkitURL;

class PhotoUploadZone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: '',
      photoUrl: ''
    };
  }

  onStatusChange(status) {
    this.setState({
      status
    });
  }

  displayThumbnail(photo) {
    this.setState({
      photoUrl: window.URL.createObjectURL(photo)
    });
  }

  onChoosePhoto() {
    let files = this.photoInput.files;
    this.displayThumbnail(files[0]);
  }

  setDropZone(statusArea) {
    if (statusArea) {
      statusArea.addEventListener('dragenter', (e) => {
        e.stopPropagation();
        e.preventDefault();
      }, false);

      statusArea.addEventListener('dragover', (e) => {
        e.stopPropagation();
        e.preventDefault();
      }, false);

      statusArea.addEventListener('drop', (e) => {
        e.stopPropagation();
        e.preventDefault();

        let data = e.dataTransfer;
        let files = data.files;

        this.displayThumbnail(files[0]);
      }, false);
    }
  }

  render() {
    const thumbnail = this.state.photoUrl
      ? <img className="thumbnail" src={this.state.photoUrl} />
      : null;
    const successMessage = this.props.isSuccess
      ? <p>Photo uploaded successfully!</p>
      : null;
    const errorMessage = this.props.error
      ? <p>{this.props.error}</p>
      : null;
    return (
      <div className="post-status">
        {successMessage}
        {errorMessage}
        <textarea className="type-status" cols="12" rows="12" placeholder="Write something..."
          value={this.state.status}
          ref={statusArea => this.setDropZone(statusArea)}
          onChange={evt => this.onStatusChange(evt.target.value)}/>
        <input type="file" id="photo-file" accept="image/*" style={{display:'none'}}
          ref={photoInput => this.photoInput = photoInput}
          onChange={() => this.onChoosePhoto()}/>
        <div className="action">
          <label htmlFor="photo-file"><img src='img/instagram-logo.png'/></label>
          <button className="post-btn"
            onClick={() => this.props.onPostPhoto(this.state.status, this.photoInput.files[0], this.props.token)}>
            Post
          </button>
        </div>

        {thumbnail}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.credential.token,
    error: state.errorMessage,
    isSuccess: state.photo.didPostPhoto && !state.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPostPhoto: (status, photo, token) => {
      const credential = {
        token
      };
      dispatch(postPhoto(credential, status, photo));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoUploadZone);
