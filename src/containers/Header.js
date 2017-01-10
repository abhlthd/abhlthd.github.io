import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import restConfig from '../services/config';
import SearchResultRow from '../components/SearchResultRow';
import getToken from '../services/get-token';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      authedUser: {}
    };
  }

  searchUser(username) {
    if (!username) {
      this.setState({ searchResults: [] });
      return;
    }

    $.ajax({
      url: restConfig.baseUrl + '/api/users?username=' + username,
      method: 'GET',
      success: (data, status, xhr) => {
        this.setState({
          searchResults: data
        });
      },
      error: (xhr, status, err) => {
        this.setState({
          searchResults: []
        });
      }
    });
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
    const searchResults = this.state.searchResults;
    let searchResultList = searchResults.map(result => (
      <SearchResultRow key={result._id} user={result} />
    ));

    return (
      <div className="header">
        <div className="header-container">
          <div className="Logo">
            <a href ="/#"><img src="img/logo.png"/></a>
          </div>
          <div className="searchbox">
            <input type="text" placeholder="Search"
              onChange={evt => this.searchUser(evt.target.value)}/>
          </div>
          <div className="search-result" style={{position: 'absolute'}}>
            {searchResultList}
          </div>
          <div className="headerControl">
            <div className= "headerNavigation">
              <ul>
                <li><Link to={'/profile/' + this.state.authedUser._id} className="profile"><img src="img/profile.png"/></Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.credential.token
  };
}

export default connect(mapStateToProps, null)(Header);
