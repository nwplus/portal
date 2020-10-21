import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { H2 } from '../components/Typography';
import ToggleSwitch from '../components/ToggleSwitch';
import notifications from '../utility/notifications';
import {
  NOTIFICATION_PERMISSIONS as N_PERMISSIONS,
  NOTIFICATION_SETTINGS_CACHE_KEY as N_SETTINGS_CACHE_KEY
} from '../utility/Constants';

const NotificationToggleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StyledH2 = styled(H2)`
  margin: 0 0 0 0.5em;
  opacity: 1;
`

export default () => {
  const [toggled, setToggled] = useState(false)

  useEffect(() => {
    setToggled(notifications.areEnabled())
  }, [])

  const handleToggle = (e) => {
    if (notifications.isCurrentPermission(N_PERMISSIONS.DEFAULT)) {
      notifications.requestPermission(permission => {
        toggleNotifications(permission === N_PERMISSIONS.GRANTED)
      })
    }

    toggleNotifications(!toggled)
  }

  // toggle switch UI and cache notifications settings
  const toggleNotifications = (notificationsEnabled) => {
    setToggled(notificationsEnabled)

    const nSettingsJSON = JSON.stringify({ notificationsEnabled })
    localStorage.setItem(N_SETTINGS_CACHE_KEY, nSettingsJSON)
  }

  return (
    <NotificationToggleContainer>
      <ToggleSwitch
        checked={toggled}
        disabled={notifications.isCurrentPermission(N_PERMISSIONS.DENIED)}
        disabledTooltip={"Notifications blocked, change browser settings"}
        onChange={handleToggle}
      />
      <StyledH2>Notifications</StyledH2>
    </NotificationToggleContainer>
  );
};
