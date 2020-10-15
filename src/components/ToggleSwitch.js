import React from 'react';
import styled from 'styled-components';

// set the default checkbox invisible
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckbox = styled.div`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  background: ${props => props.checked ? '#31E0E0' : '#4F4A59'};
  border-radius: 34px;
  transition: all 150ms;
  ${props => props.checked ? checkedStyles : uncheckedStyles};
`

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

const Checkbox = ({ className, checked, ...props }) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked}>
      <Slider></Slider>
    </StyledCheckbox>
  </CheckboxContainer>
)

const Slider = styled.span`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 34px;
  background-color: #4F4A59;
  -webkit-transition: .4s;
  transition: .4s;
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    border-radius: 50%;
    background-color: #DFDCE5;
    -webkit-transition: .4s;
    transition: .4s;
  }
`

const checkedStyles = styled(Slider)`
  background-color: white;
`
const uncheckedStyles = styled(Slider)`
  &:checked {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
    background-color: #FFF;
  }
`

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <div>
      <label>
      <Checkbox>
      </Checkbox>
      </label>
    </div>
    /*
    <div>
      <input
        type="checkbox"
        className="toggle-switch-checkbox"
        // checked={checked}
        // onChange={(e) => console.log("clicked")}
      />
    </div>
    */
  );
};

export default ToggleSwitch;