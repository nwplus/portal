import React from 'react';

// TODO have to have "blocked" dead state for toggle switch when permission is "denied"
const ToggleSwitch = ({ checked, disabled, onChange }) => {
  return (
    <div>
      <input
        type="checkbox"
        className="toggle-switch-checkbox"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};

export default ToggleSwitch;