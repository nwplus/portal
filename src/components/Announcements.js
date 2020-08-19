import React from 'react';
import styled from 'styled-components';
import { format } from 'timeago.js';
import { Card } from './Common';
import { H1, P } from './Typography';

const StyledH1 = styled(H1)`
  margin: 0 0 0.5em 0;
`

export default ({announcements}) => (
  <Card>
    <StyledH1>Announcements</StyledH1>
    {
      announcements.map(announcement => {
        const timeAgo = format(Date.parse(announcement.timestamp))
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        const date = (new Date(announcement.timestamp).toLocaleDateString('en-US', options))
        return <div key={announcement.timestamp}>
          <P>{announcement.content}</P>
          <P highlight>{timeAgo} @ {date}</P>
        </div>
      })
    }
  </Card>
)