import React, { useState } from 'react';
import styled from 'styled-components';
import { H2 } from '../components/Typography';
import ToggleSwitch from '../components/ToggleSwitch';

const StyledH2 = styled(H2)`
  margin: 0 0 0 0.5em;
`

const ToggleSwitchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export default () => {
  const [enabled, setEnabled] = useState(false);

  const requestPermissions = (e) => {
    if (enabled) {
      setEnabled(false)
    } else {
      Notification.requestPermission().then((permission) => {
        setEnabled(permission === 'granted')
      })
    }
  }

  return (
    <ToggleSwitchContainer>
      <ToggleSwitch
        checked={enabled}
        onChange={requestPermissions}
      />
      <StyledH2>Notifications</StyledH2>
    </ToggleSwitchContainer>
  );
};
