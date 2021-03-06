import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const Login = (props) => {
  var errors = {};
  if (props.errors) {
    errors.usernameError = props.errors.username
      ? <p className="error">{props.errors.username}</p>
      : null;
    errors.emailError = props.errors.email
      ? <p className="error">{props.errors.email}</p>
      : null;
    errors.passwordError = props.errors.password
      ? <p className="error">{props.errors.password}</p>
      : null;
    errors.rePasswordError = props.errors.rePassword
      ? <p className="error">{props.errors.rePassword}</p>
      : null;
    errors.unexpectedError = props.errors.unexpected
      ? <p className="error">{props.errors.unexpected}</p>
      : null;
  }

  var successMessage = props.isSuccess
    ? <div className="success">
        Login successfully!
      </div>
    : null;

  return (
    <div className="login">
      <form className="user-form" noValidate>
        <div className="form-group">
          <input
            type="text" id="username" name="username" placeholder="Username"
            className="field"
            value={props.username}
            onChange={evt => props.onInputChange(evt)}/>
          {errors.usernameError}
        </div>
        <div className="form-group">
          <input type="password" id="password" name="password" placeholder="Password"
            className="field"
            value={props.password}
            onChange={evt => props.onInputChange(evt)}/>
          {errors.passwordError}
        </div>
        <input type="submit" value="Login"
          className="form-btn"
          onClick={evt => props.onLogin(props.username, props.password, evt)}/>
      </form>
      {errors.unexpectedError}
      {successMessage}
    </div>
  );
};

export default Login;
