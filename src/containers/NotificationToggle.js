import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { H2 } from '../components/Typography';
import ToggleSwitch from '../components/ToggleSwitch';
import { NP_CACHE_KEY } from '../utility/Constants';

const StyledH2 = styled(H2)`
  margin: 0 0 0 0.5em;
`

const ToggleSwitchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const checkNotificationPromise = () => {
  try {
    Notification.requestPermission().then();
  } catch (e) {
    return false;
  }
  return true;
}

export default () => {
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    const notifPermissionsJSON = localStorage.getItem(NP_CACHE_KEY)
    if (notifPermissionsJSON) {
      const notifPermissions = JSON.parse(notifPermissionsJSON);
      setToggled(notifPermissions.enabled === true)
    }
  }, [])

  // TODO have to have "blocked" dead state for toggle switch when permission is "denied"
  const toggleNotifications = (e) => {
    if (Notification.permission !== 'granted') {
      if (checkNotificationPromise()) {
        Notification.requestPermission().then(handlePermission)
      } else {
        Notification.requestPermission(handlePermission);
      }
    } else {
      cacheNotificationPermissions(!toggled)
    }
  }

  const handlePermission = (permission) => {
    cacheNotificationPermissions(permission === 'granted')
  }

  const cacheNotificationPermissions = (enabled) => {
    setToggled(enabled)
    const notifPermissionsJSON = JSON.stringify({ enabled })
    localStorage.setItem(NP_CACHE_KEY, notifPermissionsJSON)
  }

  return (
    <ToggleSwitchContainer>
      <ToggleSwitch
        checked={toggled}
        onChange={toggleNotifications}
      />
      <StyledH2>Notifications</StyledH2>
    </ToggleSwitchContainer>
  );
};
