import React from 'react'
import ReactSelect from 'react-select'
import CreatableSelect from 'react-select/creatable'
import AsyncSelect from 'react-select/async'
import AsyncCreatableSelect from 'react-select/async-creatable'
import styled, { withTheme, css } from 'styled-components'
import { components } from 'react-select'
import customCursor from '../../assets/custom-cursor.png'
import Icon from '../Icon'

const dropdownWidth = {
  normal: '300px',
  searchable: '400px',
}

const sharedStyle = css`
  .react-select__control {
    background-color: transparent;
    margin: 1em 0 2.5em 0;
    border: 2px solid;
    border-radius: 7px;
    box-shadow: none;
    max-width: ${p => (p.isSearchable ? dropdownWidth.searchable : dropdownWidth.normal)};
    height: 2.5em;
    border-color: ${p => (p.isValid ? p.theme.colors.selects.border : p.theme.colors.warning)};
    padding-right: 17px;
    padding-left: 7px;
    flex-direction: ${p => p.isSearchable && `row-reverse`};
    cursor: url(${customCursor}), auto;
  }

  .react-select__control:hover,
  .react-select__control--is-focused {
    border-color: ${p =>
      p.isValid ? p.theme.colors.selects.hover : p.theme.colors.secondaryWarning};
  }

  .react-select__option {
    color: ${p => p.theme.colors.text};
    overflow-wrap: break-word;
  }

  .react-select__menu {
    background-color: ${p => p.theme.colors.secondaryBackground};
    border-radius: 7px;
    margin-top: 0px;
    max-width: ${p => (p.isSearchable ? dropdownWidth.searchable : dropdownWidth.normal)};
    cursor: url(${customCursor}), auto;
  }

  .react-select__menu-list::-webkit-scrollbar {
    width: 24px;
    background: transparent;
  }

  .react-select__menu-list::-webkit-scrollbar-thumb {
    border: solid 8px transparent;
    background-clip: padding-box;
    border-radius: 15px;
    box-shadow: inset 0 0 14px 14px ${p => p.theme.colors.scrollbar};
  }

  .react-select__option {
    cursor: url(${customCursor}), auto;
  }

  .react-select__option:hover,
  .react-select__option--is-selected {
    background-color: ${p => p.theme.colors.primary};
    border-radius: 5px;
    font-weight: bold;
  }

  .react-select__placeholder {
    color: ${p => p.theme.colors.selects.text};
  }

  .react-select__single-value,
  .react-select__input {
    color: ${p => p.theme.colors.selects.text};
  }

  .react-select__menu-notice--no-options {
    padding: 0;
    text-align: left;
  }
`

const StyledCreatableDropdown = styled(CreatableSelect)`
  ${sharedStyle}
`

const StyledNormalDropdown = styled(ReactSelect)`
  ${sharedStyle}
`

const StyledAsyncDropdown = styled(AsyncSelect)`
  ${sharedStyle}
`

const StyledAsyncCreatableDropdown = styled(AsyncCreatableSelect)`
  ${sharedStyle}
`

const StyledUserMessage = styled.div`
  // color: ${p => p.theme.colors.background};
  color: ${p => p.theme.colors.selects.text};
  font-weight: bold;
  padding: 8px 12px;
`

const StyledErrorMsg = styled.div`
  color: ${p => p.theme.colors.warning};
  font-weight: 400;
  font-size: 16px;
  position: absolute;
  top: 56px;
  text-align: left;
`

const DropdownIcon = ({ className, isSearchable }) =>
  isSearchable ? (
    <Icon icon="search" color={p => p.theme.colors.selects.text} />
  ) : (
    <svg
      className={className}
      width="10"
      height="8"
      viewBox="0 0 10 8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4.53582 6.89842C4.93534 7.44394 5.74984 7.44394 6.14936 6.89842L9.67032 2.09087C10.1541 1.43027 9.68237 0.5 8.86355 0.5H1.82163C1.00282 0.5 0.531054 1.43027 1.01486 2.09086L4.53582 6.89842Z" />
    </svg>
  )

const StyledDropdownIcon = styled(DropdownIcon)`
  transform: ${p => !p.isSearchable && p.menuIsOpen && `rotate(90deg)`};
  fill: ${p =>
    p.isSearchable
      ? p.theme.colors.primary
      : p.menuIsOpen || p.hasValue
      ? p.theme.colors.default
      : p.theme.colors.default};
`

const Control = props => {
  const {
    selectProps: { menuIsOpen, isValid, errorMessage },
  } = props
  return (
    <>
      <components.Control {...props}>{props.children}</components.Control>
      {!isValid && !menuIsOpen && <StyledErrorMsg>{errorMessage}</StyledErrorMsg>}
    </>
  )
}

const MenuList = props => {
  const {
    selectProps: {
      isSearchable,
      inputValue,
      emptySearchDefaultOption,
      canCreateNewOption,
      value,
      isLoading,
    },
    hasValue,
    children,
  } = props
  return (
    <components.MenuList {...props}>
      {isSearchable && inputValue === '' ? (
        <StyledUserMessage>{emptySearchDefaultOption}</StyledUserMessage>
      ) : (
        <>
          {canCreateNewOption &&
            hasValue &&
            inputValue.toLowerCase() === value.label.toLowerCase() && (
              <StyledUserMessage>Your input is the same as the previous value!</StyledUserMessage>
            )}
          {isLoading && <StyledUserMessage>Loading...</StyledUserMessage>}
          {children}
        </>
      )}
    </components.MenuList>
  )
}

const DropdownIndicator = props => {
  const {
    selectProps: { isSearchable, menuIsOpen },
    hasValue,
  } = props
  return (
    <components.DropdownIndicator {...props}>
      <StyledDropdownIcon isSearchable={isSearchable} menuIsOpen={menuIsOpen} hasValue={hasValue} />
    </components.DropdownIndicator>
  )
}

const NoOptionsMessage = props => {
  const {
    selectProps: { canCreateNewOption },
    children,
  } = props
  return (
    <components.NoOptionsMessage {...props}>
      {!canCreateNewOption && <StyledUserMessage>{children}</StyledUserMessage>}
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
  isValid,
  errorMessage,
  theme,
  canCreateNewOption,
  debounceEnabled,
  throttleTime,
  className,
  value,
  customRef,
}) => {
  // These props are used by react-select directly, the rest are custom props
  const userProps = {
    options,
    placeholder,
    isSearchable,
    onChange,
    formatCreateLabel,
    noOptionsMessage,
    theme,
  }

  const DropdownVariant = debounceEnabled
    ? canCreateNewOption
      ? StyledAsyncCreatableDropdown
      : StyledAsyncDropdown
    : canCreateNewOption
    ? StyledCreatableDropdown
    : StyledNormalDropdown

  const debounceFilter = inputValue => {
    return options.filter(o => o.label.toLowerCase().includes(inputValue.toLowerCase()))
  }

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(debounceFilter(inputValue))
    }, throttleTime)
  }

  return (
    <DropdownVariant
      className={className}
      classNamePrefix="react-select"
      components={{
        Control,
        DropdownIndicator,
        MenuList,
        IndicatorSeparator: () => null,
        NoOptionsMessage,
        LoadingIndicator: () => null,
        LoadingMessage: () => null,
      }}
      maxMenuHeight={200}
      emptySearchDefaultOption={emptySearchDefaultOption}
      errorMessage={errorMessage}
      canCreateNewOption={canCreateNewOption}
      isValid={isValid}
      cacheOptions
      loadOptions={debounceEnabled && loadOptions}
      value={value}
      ref={customRef}
      {...userProps}
    />
  )
}

// withTheme is used to access the themeProvider to replace the default theme in react-select
export default withTheme(Dropdown)
