import React from 'react'
import CreatableSelect from 'react-select/creatable'
import styled, { withTheme } from 'styled-components'
import { components } from 'react-select'
import customCursor from '../assets/custom-cursor.png'

const StyledDropdown = styled(CreatableSelect)`
  .react-select__control {
    background-color: transparent;
    margin: 2em 0;
    border: 2px solid;
    border-radius: 7px;
    box-shadow: none;
    max-width: ${p => (p.isSearchable ? `387px` : `287px`)};
    height: 48px;
    border-color: ${p => p.theme.colors.dropdownNeutral};
    padding-right: 17px;
    padding-left: 7px;
    flex-direction: ${p => p.isSearchable && `row-reverse`};
    cursor: url(${customCursor}), auto;
  }

  .react-select__control:hover,
  .react-select__control--is-focused {
    border-color: ${p => p.theme.colors.dropdown};
  }

  .react-select__option {
    color: ${p => p.theme.colors.background};
    overflow-wrap: break-word;
  }

  .react-select__menu {
    background-color: ${p => p.theme.colors.dropdown};
    border-radius: 7px;
    margin-top: 0px;
    max-width: ${p => (p.isSearchable ? `387px` : `287px`)};
    cursor: url(${customCursor}), auto;
  }

  .react-select__menu-list::-webkit-scrollbar {
    width: 24px;
  }

  .react-select__menu-list::-webkit-scrollbar-thumb {
    border-radius: 15px;
    box-shadow: inset 0 0 14px 14px #615b82;
    border: solid 8px transparent;
  }

  .react-select__option {
    cursor: url(${customCursor}), auto;
  }

  .react-select__option:hover,
  .react-select__option--is-selected {
    background-color: ${p => p.theme.colors.dropdownHover};
    border-radius: 5px;
    font-weight: bold;
  }

  .react-select__placeholder {
    color: ${p => p.theme.colors.dropdownNeutral};
  }

  .react-select__single-value,
  .react-select__input {
    color: ${p => p.theme.colors.dropdown};
  }

  .react-select__menu-notice--no-options {
    padding: 0px 0px;
    text-align: left;
  }
`

const StyledUserMessage = styled.div`
  color: ${p => p.theme.colors.background};
  font-weight: bold;
  padding: 8px 12px;
`

const DropdownIcon = ({ isSearchable, color, transform }) =>
  isSearchable ? (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xlink="http://www.w3.org/1999/xlink"
    >
      <rect width="21" height="21" fill="url(#pattern0)" />
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use href="#image0" transform="scale(0.02)" />
        </pattern>
        <image
          id="image0"
          width="50"
          height="50"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAEaUlEQVRoQ+2ZXeiecxjHP19xwCQH2EbCwWK2vCRqirzuwAHbkAMrJ0KMZvNOWCvW8pKssOWtcOZtkkQka+Ul2ZgiceCd7EBeCrn01f3ot9v93Pf9+z2P9ezf/zr697+v3/f6fe/r9b4eMUVEU4QH00QmzZPTHpmSHomIY4GFwBHATGAP4FfgS+B94EVJX/+f5ItDKyL2B64DzgcO6bhkAO8AjwAPS/pz3KSyiUTEnsBK4Fpgn4ILfQzcIOm5grNDj2QRiYgDgWeBE8ZwifXAMkl/jAGrfx+JiGMc64DJNMk2YBPwLfAT4NA7GDgTOGDImVeBxZJ+HpVML49UnnCM10n4bW4A7pX0adNlImI34CTgNuDUBp3ngSWS/hqFTCeRKifeAI6vGdrqRJf0Sd8LRMQS4NGG3LpD0s19cZr0+hC5BVhdO/wycF5JSETEPMDnD0ow7Y3jJLlUF0krkarEOmTS6vQRsECS86BIqr7jfNorAXhd0mlFgNCe7BGxtiqzA3znxPyccBp2sYi4Criv9vxkSW+WkOnyyGfAYQnwOklXlhiqn4kId39XujnjwB9KpHL/e7ULzBlWnUrIRcRyV7zk7BeeEiR5EsiSNiLXA2sStG2S5mehdyhHhL1tr6cyT5LzMEvaiDwGXJSgrZd0aRZ6D+WI8GCZVjBXw6d7HN1BpY2Iu/hZifbtklblGujSj4i3az3qckkPdJ2rP28j4vHh9OTACklpPOfaatSPiFeAM5KHyyXVq1mnrTYiHh3OThDWSLqxEzFTISK2AEclx5ZKejITZngfiYh1wBUJ4FOSLsw10KZfzWE/Avsmegsl2UtZ0uaRS4CHErTvgdmjDnfp7SJiAbA5+Z/L7kxJP2SxaOvs1cTripKSPUWSB8ixSETcDaxIwLZKOroEvKuzv1X7iHpNUloASmz+cyYiZgGe42YkIKsl3VoC2kXEfePBGvC5kp4pMVYLqyeANOd+Bw6V9E0JdheR3YEPgcMTcE+9J0rynFQkEXEZUO8VGyQ5L4ukz/fIouo7PTXwFbBI0ru5VisS9wN+SQNxIZkraXsu3kC/k0gVzza8rGbkN29D/Gb7LBAiwvuuu4ClDZcdyRvG60vEb++lWgce3McJ656zUdLntTzw97o3Lt59Od/SxK7zuUaSq1iR9CJSeWVvwAl6ToslbxMdds4jb068RUmbXdcli8n0JlKR8Rv297tDyn+XinNiI3BxA0ARmSwiA6PVjsufwd5Z5YhL7OPVpnF7RHhj6bypy0pJ9+QAFxFJCHlfdUE1XDqMmsRjh0u4V6QuDDv0iXGRGYlIQsg4c4Ejgf0A74c9L33nbXzX7DQOMmMhkhMCw3Qj4mqgKZxuknRnl42JIVIVk2IyE0WkIlPfrAyc0eqZiSNSkfFo39Qcvez2zxr/kYkk0kLmBUnp5/e/hCaWyBAyayV537breCQp7YsBj/cfAKsk/bJLEukqu4PnEx1afUlYb5pIztvaGbrTHtkZbznHxt+6w2NCwq5TogAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  ) : (
    <svg
      width="10"
      height="8"
      fill={color}
      viewBox="0 0 10 8"
      transform={transform}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4.53582 6.89842C4.93534 7.44394 5.74984 7.44394 6.14936 6.89842L9.67032 2.09087C10.1541 1.43027 9.68237 0.5 8.86355 0.5H1.82163C1.00282 0.5 0.531054 1.43027 1.01486 2.09086L4.53582 6.89842Z" />
    </svg>
  )

const MenuList = props => {
  const {
    selectProps: { isSearchable, inputValue, emptySearchDefaultOption },
    children,
  } = props
  return (
    <components.MenuList {...props}>
      {isSearchable && inputValue === '' ? (
        <StyledUserMessage>{emptySearchDefaultOption}</StyledUserMessage>
      ) : (
        children
      )}
    </components.MenuList>
  )
}

const DropdownIndicator = props => {
  const {
    selectProps: { isSearchable, menuIsOpen },
    hasValue,
    theme,
  } = props
  return (
    <components.DropdownIndicator {...props}>
      <DropdownIcon
        isSearchable={isSearchable}
        color={menuIsOpen || hasValue ? theme.colors.dropdown : theme.colors.dropdownNeutral}
        transform={menuIsOpen && 'rotate(90)'}
      />
    </components.DropdownIndicator>
  )
}

const NoOptionsMessage = props => {
  const {
    selectProps: { inputValue, value },
    children,
  } = props
  return (
    <components.NoOptionsMessage {...props}>
      {inputValue.toLowerCase() === value.label.toLowerCase() ? (
        <StyledUserMessage>Your input is the same as the previous value!</StyledUserMessage>
      ) : (
        children
      )}
    </components.NoOptionsMessage>
  )
}

const Dropdown = ({
  options,
  placeholder,
  isSearchable,
  onChange,
  formatCreateLabel,
  emptySearchDefaultOption,
  noOptionsMessage,
  theme,
}) => {
  const userProps = {
    options,
    placeholder,
    isSearchable,
    onChange,
    formatCreateLabel,
    emptySearchDefaultOption,
    noOptionsMessage,
    theme,
  }

  return (
    <StyledDropdown
      classNamePrefix="react-select"
      components={{
        DropdownIndicator,
        MenuList,
        IndicatorSeparator: () => null,
        NoOptionsMessage,
      }}
      maxMenuHeight={200}
      {...userProps}
    />
  )
}

export default withTheme(Dropdown)
