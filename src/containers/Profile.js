import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from '../components/Footer';
import ProfileDetail from './ProfileDetail';
import restConfig from '../services/config';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      user_id: this.props.params.user_id
    };
  }

  componentWillReceiveProps() {
    this.state = {
      user: null,
      user_id: this.props.params.user_id
    };
    this.componentWillMount();
  }

  componentWillMount() {
    const userId = this.state.user_id;
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

  render() {
    let profileDetail = null;
    if (this.state.user) {
      profileDetail = <ProfileDetail user={this.state.user} />;
    }

    return (
      <div className="main">
        <Header />
        <div className="profile-container">
          {profileDetail}
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authedUser: state.credential.authedUser
  };
};

export default connect(mapStateToProps, null)(Profile);
