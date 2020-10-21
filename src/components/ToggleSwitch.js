import React from 'react';
import styled from 'styled-components';

const ToggleSwitchContainer = styled.div`
  display: inline-block;
`

// TODO maybe put 'off' background colour in ThemeProvider?
const ToggleSwitchGraphic = styled.div`
  width: 35px;
  height: 30px;
  background: #4F4A59;
  z-index: 0;
  cursor: pointer;
  position: relative;
  border-radius: 50px;
  line-height: 40px;
  text-align: right;
  padding: 0 10px;
  bottom: 10px;
  color: rgba(0,0,0,.5);
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

// TODO have to have "blocked" dead state for toggle switch when permission is "denied"
const ToggleSwitch = ({ checked, disabled, onChange }) => {
  return (
    <ToggleSwitchContainer>
      <label>
        <Input
          type="checkbox"
        // checked={checked}
        // onChange={(e) => console.log("clicked")}
        />
        <ToggleSwitchGraphic />
      </label>
    </ToggleSwitchContainer>
  );
};

export default ToggleSwitch;