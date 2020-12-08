import React from 'react'
import styled from 'styled-components'
import { format } from 'timeago.js'
import ReactMarkdown from 'react-markdown'
import { Card } from './Common'
import { H1, P, A } from './Typography'
import NotificationToggle from '../containers/NotificationToggle'
import { IS_DEVICE_IOS } from '../utility/Constants'

const StyledH1 = styled(H1)`
  margin: 0 0 0 0;
`

const StyledP = styled(P)`
  margin-bottom: 0.5em;
`

const Time = styled(P)`
  margin-bottom: 0.75em;
`

const Announcement = styled(Card)`
  margin: 1em 0;
  padding: 1em;
  background-color: ${p => p.theme.colors.background};
`

const AnnouncementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 1em 0;
  ${p => p.theme.mediaQueries.xs} {
    display: inline-block;
  }
`

// hide notification toggle on IOS devices because Notification API incompatible
export default ({ announcements }) => (
  <Card>
    <AnnouncementHeader>
      <StyledH1>Announcements</StyledH1>
      {!IS_DEVICE_IOS ? <NotificationToggle /> : null}
    </AnnouncementHeader>
    {announcements.map(announcement => {
      const timeAgo = format(announcement.timestamp)
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }
      const date = new Date(announcement.timestamp).toLocaleDateString('en-US', options)
      return (
        <Announcement key={announcement.timestamp}>
          <ReactMarkdown
            linkTarget="_blank"
            allowedTypes={[
              'text',
              'paragraph',
              'strong',
              'emphasis',
              'link',
              'break',
              'list',
              'listItem',
            ]}
            renderers={{ link: A, paragraph: StyledP }}
            source={announcement.content}
          />
          <Time highlight>
            {timeAgo} @ {date}
          </Time>
        </Announcement>
      )
    })}
  </Card>
)
