import React from 'react';
import styled from 'styled-components';
import { format } from 'timeago.js';
import ReactMarkdown from 'react-markdown';
import { Card } from './Common';
import { H1, P, A } from './Typography';

const StyledH1 = styled(H1)`
  margin: 0 0 0.5em 0;
`

const StyledP = styled(P)`
  margin-bottom: 0.5em;
`

const Time = styled(P)`
  margin-bottom: 0.75em;
`

const Announcement = styled.div`
  margin: 1em 0;
`

export default ({ announcements }) => (
  <Card>
    <StyledH1>Announcements</StyledH1>
    {
      announcements.map(announcement => {
        const timeAgo = format(announcement.timestamp)
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        const date = (new Date(announcement.timestamp).toLocaleDateString('en-US', options))
        return <Announcement key={announcement.timestamp}>
          <ReactMarkdown
            linkTarget='_blank'
            allowedTypes={['text', 'paragraph', 'strong', 'emphasis', 'link', 'break', 'list', 'listItem']}
            renderers={{ link: A, paragraph: StyledP }}
            source={announcement.content}
          />
          <Time highlight>{timeAgo} @ {date}</Time>
        </Announcement>
      })
    }
  </Card>
)