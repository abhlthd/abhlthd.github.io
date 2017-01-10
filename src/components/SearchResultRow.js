import React from 'react';
import { Link } from 'react-router';
import restConfig from '../services/config';

const SearchResultRow = (props) => (
  <Link to={'/profile/' + props.user._id} className="search-result-row">
    <img src={restConfig.baseUrl + '/' + props.user.avatar} alt="avatar" width="50"/>
    <span>{props.user.username}</span>
    <span className="descripton">{props.user.description}</span>
  </Link>
);

export default SearchResultRow;
