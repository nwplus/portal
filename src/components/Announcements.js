import React from 'react';
import { Card } from './Common';

export default ({announcements}) => {
  return  <Card>
    {
      announcements.map(announcement => {
        return <h1>{announcement.title}</h1>
      })
    }
  </Card>
}