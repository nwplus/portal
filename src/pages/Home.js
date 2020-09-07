import React from 'react';
import Announcements from '../containers/Announcements'
import HackerCountdown from '../containers/HackerCountdown'
import Livestream from '../components/Livestream'

export default () => {
  return (
    <>
      <HackerCountdown />
      <Livestream />
      <Announcements />
    </>
  );
}