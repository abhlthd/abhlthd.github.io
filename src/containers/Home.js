import React from 'react';
import Header from './Header';
import PhotoUploadZone from './PhotoUploadZone';
import FollowTable from './FollowTable';
import Timeline from './Timeline';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Header />
        <div className="content">
          <PhotoUploadZone />
          <FollowTable />
          <Timeline />
        </div>
      </div>
    );
  }
}

export default Home;
