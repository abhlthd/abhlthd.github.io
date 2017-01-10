import restConfig from './config';
import getToken from './get-token';

function validateEmail (email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const api = {
  register: (username, email, password, rePassword) => {
    return new Promise((resolve, reject) => {
      var errors = {};
      var hasError = false;

      var usernameRegex = /^[a-zA-Z0-9._-]+$/;
      if (!usernameRegex.test(username)) {
        errors.username = 'Username is invalid.';
        hasError = true;
      }

      if (!validateEmail(email)) {
        errors.email = 'Email is invalid.';
        hasError = true;
      }

      var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{6,}$/;
      if (!passwordRegex.test(password)) {
        errors.password = 'Password is invalid.';
        hasError = true;
      }

      if (rePassword !== password) {
        errors.rePassword = 'Your password is not match.';
        hasError = true;
      }

      if (!hasError) {
        // do Register
        $.ajax({
          url: restConfig.baseUrl + '/api/authentication/register',
          method: 'POST',
          data: {
            username,
            email,
            password
          },
          success: (data, status, xhr) => {
            resolve();
          },
          error: (xhr, status, err) => {
            var errorHint = xhr.responseText;
            var isKnownError = false;

            var usernameErrorRegex = /Username .* already exists./
            if (usernameErrorRegex.test(errorHint)) {
              errors.username = errorHint;
              isKnownError = true;
            }

            var emailErrorRegex = /Email .* already exists./
            if (emailErrorRegex.test(errorHint)) {
              errors.email = errorHint;
              isKnownError = true;
            }

            if (!isKnownError) {
              errors.unexpected = errorHint;
            }

            reject(errors);
          }
        });
      } else {
        reject(errors);
      }
    });
  },
  login: (username, password) => {
    return new Promise((resolve, reject) => {
      var errors = {};
      var hasError = false;

      var usernameRegex = /^[a-zA-Z0-9._-]+$/;
      if (!usernameRegex.test(username)) {
        errors.username = 'Username is invalid.';
        hasError = true;
      }

      var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{6,}$/;
      if (!passwordRegex.test(password)) {
        errors.password = 'Password is invalid.';
        hasError = true;
      }

      if (!hasError) {
        // do login
        $.ajax({
          url: restConfig.baseUrl + '/api/authentication/login',
          method: 'POST',
          data: {
            username,
            password
          },
          success: (data, status, xhr) => {
            resolve(data.token);
          },
          error: (xhr, status, err) => {
            errors.unexpected = "Username or password is invalid.";
            reject(errors);
          }
        });
      } else {
        reject(errors);
      }
    });
  },
  postPhoto: (credential, status, photo) => {
    return new Promise((resolve, reject) => {
      if (!status) {
        return reject("Status can not be empty.");
      }

      if (!photo) {
        return reject("You must choose a photo.");
      }

      let formData = new FormData();
      formData.append('status', status);
      formData.append('photo', photo);

      $.ajax({
        url: restConfig.baseUrl + '/api/photos/upload',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        headers: {
          Authorization: 'Bearer ' + getToken()
        },
        success: (data, status, xhr) => {
          resolve();
        },
        error: (xhr, status, e) => {
          reject("Unexpected error while posting photo to server.");
        }
      });
    });
  },
  fetchFollowSuggestionList: (credential, limit) => (
    new Promise((resolve, reject) => {
      let membersLimit = limit || 3;
      $.ajax({
        url: restConfig.baseUrl + '/api/follows/users?filter=largest&limit=' + membersLimit,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + getToken()
        },
        success: (data, status, xhr) => {
          resolve(data)
        },
        error: (xhr, status, e) => {
          reject("Unexpected error while fetching members suggestion from server.");
        }
      });
    })
  ),
  followMember: (credential, member) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: restConfig.baseUrl + '/api/follows/' + member._id,
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + getToken()
        },
        success: (data, status, xhr) => {
          resolve(data)
        },
        error: (xhr, status, e) => {
          reject("Unexpected error while requesting follow.");
        }
      });
    })
  },
  unfollowMember: (credential, member) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: restConfig.baseUrl + '/api/follows/' + member._id,
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + getToken()
        },
        success: (data, status, xhr) => {
          resolve(data)
        },
        error: (xhr, status, e) => {
          reject("Unexpected error while requesting unfollow.");
        }
      });
    })
  },
  fetchTimelinePhotos: (credential) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: restConfig.baseUrl + '/api/follows/photos',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + getToken()
        },
        success: (data, status, xhr) => {
          resolve(data);
        },
        error: (xhr, status, e) => {
          reject("Unexpected error while requesting timeline photos.");
        }
      });
    });
  },
  fetchLikes: (photo) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: restConfig.baseUrl + '/api/likes/' + photo._id,
        method: 'GET',
        success: (data, status, xhr) => {
          resolve(data);
        },
        error: (xhr, status, e) => {
          reject("Unexpected error while requesting likes of photos.");
        }
      });
    });
  },
  like: (credential, photo) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: restConfig.baseUrl + '/api/likes/' + photo._id,
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + getToken()
        },
        success: (data, status, xhr) => {
          resolve(data);
        },
        error: (xhr, status, e) => {
          reject("Unexpected error while requesting like photos.");
        }
      });
    });
  },
  unlike: (credential, photo) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: restConfig.baseUrl + '/api/likes/' + photo._id,
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + getToken()
        },
        success: (data, status, xhr) => {
          resolve(data);
        },
        error: (xhr, status, e) => {
          reject("Unexpected error while requesting unlike photos.");
        }
      });
    });
  },
  fetchComments: (photo) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: restConfig.baseUrl + '/api/comments/' + photo._id,
        method: 'GET',
        success: (data, status, xhr) => {
          resolve(data);
        },
        error: (xhr, status, e) => {
          reject("Unexpected error while requesting comments of photos.");
        }
      });
    });
  },
  comment: (credential, photo, comment) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: restConfig.baseUrl + '/api/comments/',
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + getToken()
        },
        data: {
          photo_id: photo._id,
          comment: comment
        },
        success: (data, status, xhr) => {
          resolve(data);
        },
        error: (xhr, status, e) => {
          reject("Unexpected error while requesting comment photos.");
        }
      });
    });
  },
  getAuthedUser: credential => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: restConfig.baseUrl + '/api/users/authed',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + credential.token
        },
        success: (data, status, xhr) => {
          resolve(data);
        },
        error: (xhr, status, e) => {
          reject("Unexpected error while requesting authed user.");
        }
      })
    });
  }
}


export default api;
