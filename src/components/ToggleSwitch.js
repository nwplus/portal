import React from 'react';

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <div>
      <input
        type="checkbox"
        className="toggle-switch-checkbox"
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};

export default ToggleSwitch;