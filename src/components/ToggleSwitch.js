import React from 'react';
import styled from 'styled-components';

const Styled = styled.div`
  display: inline-block;
  .switch {
    opacity: 0;
    > div {
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
    }
    > input:checked + div {
      background: #31E0E0;
      text-align: left;
    }
    > div:before {
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
    > div:after {
      content: '';
      display: inline-block;
    }
    > input:checked + div:after {
      left:52px;
    }
    > input:checked + div:before {
      content: '';
      position: absolute;
      left: 30px;
      border-radius: 50%;
    }
  }
`

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <Styled>
      <label class="switch">
        <input 
        type="checkbox"
        // checked={checked}
        // onChange={(e) => console.log("clicked")}
        ></input>
        <div class=""></div>
      </label>
    </Styled>
  );
};

export default ToggleSwitch;