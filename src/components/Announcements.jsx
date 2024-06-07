import React from 'react'
import styled from 'styled-components'
import { format } from 'timeago'
import ReactMarkdown from 'react-markdown'
import { Card, CardWithHeader } from './Common'
import { P, A } from './Typography'
import NotificationToggle from '../containers/NotificationToggle'
import { IS_DEVICE_IOS } from '../utility/Constants'

const StyledP = styled(P)`
  margin-bottom: 0.5em;
`

const Time = styled(P)`
  margin-bottom: 0.75em;
`

const Announcement = styled(Card)`
  margin: 1em 0;
  padding: 1em;
  background-color: ${p => p.theme.colors.border};
`

const AnnouncementContainer = styled(CardWithHeader)`
  display: flex;
`

// hide notification toggle on IOS devices because Notification API incompatible
export default ({ announcements }) => (
  <AnnouncementContainer header="Announcements">
    {!IS_DEVICE_IOS ? <NotificationToggle /> : null}
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
  </AnnouncementContainer>
)
