import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Register from '../components/Register';
import Login from '../components/Login';
import Footer from '../components/Footer';
import { doRegister, doLogin, setToken } from '../actions/creators';
import restConfig from '../services/config';

class FrontPage extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      registerTab: true,
      username: '',
      email: '',
      password: '',
      rePassword: ''
    };
  }

  onNavLinkClick(evt) {
    evt.preventDefault();

    this.setState({
      registerTab: !this.state.registerTab
    });
  }

  onInputChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  onLoginWithFacebook() {
    FB.login(response => {
      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        $.ajax({
          url: restConfig.baseUrl + '/api/authentication/fb',
          method: 'POST',
          data: {
            accessToken: response.authResponse.accessToken,
            userID: response.authResponse.userID
          },
          success: (data, status, xhr) => {
            const token = data.token;
            document.cookie = "token=" + token;
            window.location.reload(false);
          },
          error: (xhr, status, err) => {
            console.log(xhr);
          }
        });
      } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
      } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
      }
    }, {scope: 'email'});
  }

  render() {
    const registerTab = (
      <div className="top">
        <div className="site-intro">
          <h1 className="logo">photosgram</h1>
          <p className="sign-up-instruction">
            Sign up to see photos and videos from your friends.
          </p>
          <button className="login-with-fb" onClick={() => this.onLoginWithFacebook()}>Login with Facebook</button>
        </div>
        <div className="or-seperator">
          <div className="left-seperator"></div>
          <span>OR</span>
          <div className="right-seperator"></div>
        </div>
        <div className="registration">
          <Register
            username={this.state.username}
            email={this.state.email}
            password={this.state.password}
            rePassword={this.state.rePassword}
            onInputChange={(evt) => this.onInputChange(evt)}
            onRegister={(username, email, password, rePassword, evt) => this.props.onRegister(username, email, password, rePassword, evt)}
            errors={this.props.errors}
            isSuccess={this.props.isRegisterSuccess}/>
          <p className="terms-agreement">By signing up, you agree to our <Link to="terms">Terms & Privacy Policy.</Link></p>
        </div>
      </div>
    );

    const loginTab = (
      <div className="top">
        <div className="site-intro">
          <h1 className="logo">photosgram</h1>
        </div>
        <div className="login-tab">
          <Login
            username={this.state.username}
            password={this.state.password}
            onInputChange={(evt) => this.onInputChange(evt)}
            onLogin={(username, password, evt) => this.props.onLogin(username, password, evt)}
            errors={this.props.errors}
            isSuccess={this.props.isLoginSuccess}/>
        </div>
      </div>
    );

    const loginInform = (
      <div className="account-access-inform">
        Have an account?
        <a href="#" onClick={evt => this.onNavLinkClick(evt)}> Login</a>
      </div>
    );

    const registerInform = (
      <div className="account-access-inform">
        Do not have an account?
        <a href="#" onClick={evt => this.onNavLinkClick(evt)}> Sign up</a>
      </div>
    );

    let accountAccessNav = loginInform;
    let accountAccessTab = registerTab;
    if (!this.state.registerTab) {
      accountAccessTab = loginTab;
      accountAccessNav = registerInform;
    }

    return (
      <div className="front-page">
        <div className="left-side">
          <div className="mobile-app-ads">
            <img className="iphone" src="../img/iphone.png" alt="my-iphone"/>
            <img className="iphone-app" src="../img/hucau.jpg" alt="copy-from-instagram"/>
          </div>
        </div>
        <div className="right-side">
          {accountAccessTab}
          <div className="middle">
            {accountAccessNav}
          </div>
          <div className="bottom">
            <div className="get-the-app">
              <p>Get the app</p>
              <a href="#"><img src="../img/google_play_badge.png"/></a>
              <a className="app-store-badge" href="#"><img src="../img/app-store-badge.svg"/></a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    errors: state.errorMessage,
    isRegisterSuccess: state.credential.didRegister && !state.errorMessage,
    isLoginSuccess: state.credential.token ? true : false
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegister: (username, email, password, rePassword, evt) => {
      evt.preventDefault();
      dispatch(doRegister(username, email, password, rePassword));
    },
    onLogin: (username, password, evt) => {
      evt.preventDefault();
      dispatch(doLogin(username, password));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPage);
