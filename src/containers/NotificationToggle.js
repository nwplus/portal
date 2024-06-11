import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { H2 } from '../components/Typography'
import { ToggleSwitch } from '../components/Input'
import notifications from '../utility/notifications'
import {
  ANALYTICS_EVENTS,
  NOTIFICATION_PERMISSIONS as N_PERMISSIONS,
  NOTIFICATION_SETTINGS_CACHE_KEY as N_SETTINGS_CACHE_KEY,
} from '../utility/Constants'
import { analytics } from '../utility/firebase'
import Tooltip from '../components/Tooltip'

const NotificationToggleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 2rem;
`

const StyledH2 = styled(H2)`
  margin: 0 0 0 1em;
  opacity: 1;
  color: #48fff4;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 700;
`

const NotificationToggle = () => {
  const [toggled, setToggled] = useState(false)

  useEffect(() => {
    setToggled(notifications.areEnabled())
  }, [setToggled])

  const handleToggle = e => {
    // if user's first time on site, request notification permissions from browser
    if (notifications.isCurrentPermission(N_PERMISSIONS.DEFAULT)) {
      notifications.requestPermission(permission => {
        toggleNotifications(permission === N_PERMISSIONS.GRANTED)
      })
    }

    toggleNotifications(!toggled)
  }

  // toggle switch UI and cache notifications settings
  const toggleNotifications = notificationsEnabled => {
    setToggled(notificationsEnabled)
    analytics.logEvent(ANALYTICS_EVENTS.NotificationToggled, { enabled: notificationsEnabled })
    const nSettingsJSON = JSON.stringify({ notificationsEnabled })
    localStorage.setItem(N_SETTINGS_CACHE_KEY, nSettingsJSON)
  }

  return (
    <Tooltip text="Turn this on if you would like to receive a notification when we post announcements here! Please update your browser and system settings accordingly.">
      <NotificationToggleContainer>
        <ToggleSwitch
          checked={toggled}
          disabled={notifications.isCurrentPermission(N_PERMISSIONS.DENIED)}
          disabledTooltip={'Notifications blocked, change browser settings'}
          onChange={handleToggle}
        />
        <StyledH2>Notifications</StyledH2>
      </NotificationToggleContainer>
    </Tooltip>
  )
}

export default NotificationToggle
