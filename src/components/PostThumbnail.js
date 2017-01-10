import React from 'react';
import restConfig from '../services/config';

const PostThumbnail = (props) => (
  <div className="post-thumbnail">
    <a href="#"><img src={restConfig.baseUrl + '/upload/' + props.post.filename} /></a>
  </div>
);

export default PostThumbnail;
