import React from 'react';
import styled, { css } from 'styled-components';

const ToggleSwitchContainer = styled.div`
  display: inline-block;
`

const ToggleSwitchGraphic = styled.div`
  width: 35px;
  height: 30px;
  background: ${p => p.theme.colors.foreground};
  z-index: 0;
  cursor: pointer;
  position: relative;
  border-radius: 50px;
  line-height: 40px;
  text-align: right;
  padding: 0 10px;
  bottom: 10px;
  transition: all 250ms;

  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    left: 4px;
    bottom: 4px;
    height: 22px;
    width: 22px;
    background: #DFDCE5;
    border-radius: 50%;
    transition: all 400ms;
  }

  &:after {
    content: '';
    display: inline-block;
  }

  ${p =>
    p.disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.3;
    `};
`

const Input = styled.input`
  visibility: hidden;

  &:checked + ${ToggleSwitchGraphic} {
    background: ${p => p.theme.colors.primary};
    text-align: left;
  }

  &:checked + ${ToggleSwitchGraphic}:after {
    left:52px;
  }

  &:checked + ${ToggleSwitchGraphic}:before {
    content: '';
    position: absolute;
    left: 30px;
    border-radius: 50%;
  }
`

const ToggleSwitch = ({ checked, disabled, disabledTooltip, onChange }) => {
  return (
    <ToggleSwitchContainer>
      <label>
        <Input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
        <ToggleSwitchGraphic
          disabled={disabled}
          title={disabled ? disabledTooltip : ''}
        />
      </label>
    </ToggleSwitchContainer>
  );
};

export default ToggleSwitch;