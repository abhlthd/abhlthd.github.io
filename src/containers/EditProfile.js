import React from 'react';
import Header from './Header';
import Footer from '../components/Footer';
import restConfig from '../services/config';
import getToken from '../services/get-token';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'edit_profile',
      user: null,
      oldPassword: '',
      newPassword: '',
      reNewPassword: '',
      errorMessage: null,
      successMessage: null
    };
  }

  componentWillMount() {
    const userId = this.props.params.user_id;
    $.ajax({
      url: restConfig.baseUrl + '/api/users/' + userId + '/info',
      success: (data, status, xhr) => {
        this.setState({
          user: data
        });
      },
      error: (xhr, status, e) => {
        console.log("Unexpected error while requesting user.");
      }
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

  onDescriptionChange(description) {
    var userClone = Object.assign({}, this.state.user, {
      description
    });
    this.setState({
      user: userClone
    });
  }

  onEditProfileSubmit() {
    if (!this.state.user.description.length) {
      this.setState({
        errorMessage: 'Description can not be empty!',
        successMessage: null
      });
      return;
    }

    var token = getToken();

    let formData = new FormData();
    formData.append('description', this.state.user.description);
    formData.append('avatar', this.photoInput.files[0]);
    $.ajax({
      url: restConfig.baseUrl + '/api/users/info',
      method: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      headers: {
        Authorization: 'Bearer ' + token
      },
      formData: formData,
      success: (data, status, xhr) => {
        this.setState({
          user: data,
          errorMessage: null,
          successMessage: 'Your profile changed successfully!'
        });
      },
      error: (xhr, status, errr) => {
        this.setState({
          errorMessage: xhr.responseText,
          successMessage: null
        });
      }
    });
  }

  onInputChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  editProfile(evt) {
    evt.preventDefault();
    this.setState({
      activeTab: 'edit_profile'
    });
  }

  changePassword(evt) {
    evt.preventDefault();
    this.setState({
      activeTab: 'change_password'
    });
  }

  onChangePassword() {
    let oldPassword = this.state.oldPassword;
    let newPassword = this.state.newPassword;
    let reNewPassword = this.state.reNewPassword;

    console.log(oldPassword, newPassword, reNewPassword);

    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      this.setState({
        errorMessage: 'Your new password is invalid.',
        successMessage: null
      });
      return;
    }

    if (newPassword !== reNewPassword) {
      this.setState({
        errorMessage: 'Your password does not match.',
        successMessage: null
      });
      return;
    }

    var token = getToken();

    $.ajax({
      url: restConfig.baseUrl + '/api/users/password',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      },
      data: {
        old_password: oldPassword,
        new_password: newPassword
      },
      success: (data, status, xhr) => {
        this.setState({
          user: data,
          errorMessage: null,
          successMessage: 'Your password changed successfully!'
        });
      },
      error: (xhr, status, errr) => {
        this.setState({
          errorMessage: xhr.responseText,
          successMessage: null
        });
      }
    });
  }

  render() {
    let editArea = null;

    const errorMessage = this.state.errorMessage
      ? <p>{this.state.errorMessage}</p>
      : null;

    const successMessage = this.state.successMessage
      ? <p>{this.state.successMessage}</p>
      : null;

    if (this.state.user) {
      const thumbnail = this.state.photoUrl
        ? <img className="thumbnail" src={this.state.photoUrl} />
        : <img className="thumbnail" src={restConfig.baseUrl + '/' + this.state.user.avatar} width="50" />;
      if (this.state.activeTab === 'edit_profile') {
        editArea = (
          <div className="edit-area">
            <div className="overview-edit">
              {thumbnail}
              <h1>{this.state.user.username}</h1>
            </div>
            <div className="choose-avatar">
              <label htmlFor="photo-file">Change your avatar</label>
              <input type="file" id="photo-file" accept="image/*" style={{display:'none'}}
                ref={photoInput => this.photoInput = photoInput}
                onChange={() => this.onChoosePhoto()}/>
            </div>
            <div className="change-description">
              <label htmlFor="description">Descripton</label>
              <input type="text"
                value={this.state.user.description}
                onChange={evt => this.onDescriptionChange(evt.target.value)} />
            </div>
            <button className="btn-update" onClick={() => this.onEditProfileSubmit()}>Change</button>
            <div className="errorMessage">{errorMessage}</div>
            <div className="successMessage">{successMessage}</div>
          </div>
        );
      } else if (this.state.activeTab === 'change_password') {
        editArea = (
          <div className="edit-area">
            <div className="overview-edit">
              {thumbnail}
              <h1>{this.state.user.username}</h1>
            </div>
            <div className="changPass">
              <div className="form-group1">
                <label htmlFor="old-password">Old Password</label>
                <input type="text"
                  className="filed"
                  id="old-password"
                  name="oldPassword"
                  value={this.state.oldPassword}
                  onChange={evt => this.onInputChange(evt)} />
              </div>
              <div className="form-group1">
                <label htmlFor="new-password">New Password</label>
                <input type="text"
                  className="filed"
                  id="new-password"
                  name="newPassword"
                  value={this.state.newPassword}
                  onChange={evt => this.onInputChange(evt)} />
              </div>
              <div className="form-group1">
                <label htmlFor="re-new-password">Re-enter Password</label>
                <input type="text"
                  className="filed"
                  id="re-new-password"
                  name="reNewPassword"
                  value={this.state.reNewPassword}
                  onChange={evt => this.onInputChange(evt)} />
              </div>
            </div>
            <button className="change-password-btn" onClick={() => this.onChangePassword()}>Change</button>
            <div className="errorMessage">{errorMessage}</div>
            <div className="successMessage">{successMessage}</div>
          </div>
        );
      }
    }

    return (
      <div className="main">
        <Header />
        <div className="edit-profile" style={{ 'paddingTop': '200px' }}>
          <div className="edit-tab">
            <ul>
              <li className={this.state.activeTab === 'edit_profile' ? 'active' : null}>
                <a href="#" onClick={(evt) => this.editProfile(evt)}>Edit Profile</a>
              </li>
              <li className={this.state.activeTab === 'change_password' ? 'active' : null}>
                <a href="#" onClick={(evt) => this.changePassword(evt)}>Change Password</a>
              </li>
            </ul>
          </div>
          {editArea}
        </div>
        <Footer />
      </div>
    );
  }
}

export default EditProfile;
