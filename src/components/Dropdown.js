import React from 'react'
import CreatableSelect from 'react-select/creatable'
import styled from 'styled-components'

const StyledDropdown = styled(CreatableSelect)`
  .react-select__control {
    background-color: transparent;
    margin: 2em 0;
    border: 2px solid;
    border-radius: 7px;
    box-shadow: none;
    width: ${p => (p.isSearchable ? `387px` : `287px`)};
    height: 48px;
  }

  .react-select__control:hover,
  .react-select__control--is-focused {
    border-color: ${p => p.theme.colors.dropdown};
  }

  .react-select__menu {
    background-color: ${p => p.theme.colors.dropdown};
    border-radius: 7px;
    margin-top: 0px;
    width: ${p => (p.isSearchable ? `387px` : `287px`)};
  }

  .react-select__option {
    color: ${p => p.theme.colors.background};
    overflow-wrap: break-word;
  }

  .react-select__option:hover,
  .react-select__option--is-focused,
  .react-select__option--is-selected {
    background-color: ${p => p.theme.colors.dropdownHover};
    border-radius: 5px;
    font-weight: bold;
  }

  .react-select__single-value {
    color: ${p => p.theme.colors.dropdown};
  }

  .react-select__input {
    color: ${p => p.theme.colors.dropdown};
  }
`

// Destructure elements so other ppl know which props to pass in?
// or use 'props' instead
export default props => (
  <StyledDropdown
    classNamePrefix="react-select"
    components={{ IndicatorSeparator: () => null }}
    maxMenuHeight={228}
    {...props}
  />
)
