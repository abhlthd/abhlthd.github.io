import React from 'react';
import { connect } from 'react-redux';
import FrontPage from './FrontPage';
import Home from './Home';
import { setToken, getAuthedUser } from '../actions/creators';
import getToken from '../services/get-token';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  resolveMainPage() {
    let mainPage = <FrontPage />;

    let cookie = document.cookie;
    if (cookie.startsWith('token=')) {
      const token = cookie.substring(6);
      this.props.setToken(token);

      mainPage = <Home />;
      this.props.getAuthedUser(getToken());
    }

    return mainPage;
  }

  render() {
    const mainPage = this.resolveMainPage();
    return (
      <div className="app">
        {mainPage}
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    token: state.credential.token
  }
);

const mapDispatchToProps = dispatch => (
  {
    setToken: token => dispatch(setToken(token)),
    getAuthedUser: token => {
      const credential = { token };
      dispatch(getAuthedUser(credential));
    }
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
