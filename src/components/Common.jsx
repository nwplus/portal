import React from 'react'
import styled, { css, withTheme } from 'styled-components'
import { H1, P } from './Typography'

export const CardLike = css`
  padding: 2em;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

  color: ${p => p.theme.colors.cardText};
  background-color: ${p => p.theme.colors.backgroundSecondary};
  margin: 1em 0;
  ${p => p.theme.mediaQueries.mobile} {
    padding: 1em;
    margin: 0.75em 0;
  }

  & > h1,
  h2,
  h3,
  p {
    color: ${p => p.theme.colors.text};
  }
`

export const Card = styled.div`
  ${CardLike};
`

const CardContainer = styled(Card)`
  position: relative;
`
const Header = styled(H1)`
  margin: 0 0 0 0;
`
export const CardWithHeader = withTheme(({ header, children }) => {
  return (
    <CardContainer>
      <Header>{header ?? '\u00A0'}</Header>
      {children}
    </CardContainer>
  )
})

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  ${p => p.theme.mediaQueries.mobile} {
    display: block;
  }
`

export const DetailColumn = styled.ul`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0;
  margin-right: 1em;
  padding: 0;

  ${p => p.theme.mediaQueries.mobile} {
    margin-right: 0em;
  }

  & > li {
    ${CardLike};
    margin: 0;
    padding: 0.5em 1em;
    margin-bottom: 1em;
    list-style-type: none;
  }
`

export const DetailAnswer = styled(P)`
  margin-bottom: 0.85em;
`

export const HR = styled.hr`
  border: 1px solid ${p => p.theme.colors.border};
  margin: 3em 0;
`

export const TextInputLike = css`
  max-width: 100%;
  background-color: transparent;
  padding: 10px;
  border: 2px solid ${p => p.theme.colors.input.border};
  border-radius: 7px;
  color: ${p => p.theme.colors.text};
  font-family: ${p => p.theme.typography.bodyFont};
  font-size: ${p => p.theme.typography.h3.size};
  ::placeholder {
    color: ${p => `${p.theme.colors.text}99`}; /* 60% opacity */
  }
  :hover {
    border: 2px solid ${p => p.theme.colors.input.hover};
  }
  :focus {
    border: 2px solid ${p => p.theme.colors.input.hover};
    outline: none;
  }
  :disabled {
    border: 2px solid ${p => p.theme.colors.input.disabled};
    background-color: ${p => `${p.theme.colors.input.disabledBackground}66`}; /* 40% opacity */
    opacity: ${p => p.theme.opacity.disabled};
  }
  ${p =>
    p.invalid &&
    `border: 2px solid ${p.theme.colors.error};
    ::placeholder {
      // color: ${p.theme.colors.error};
    }
    :hover {
      // border: 2px solid ${p.theme.colors.secondaryWarning};
    }
    :focus {
      // border: 2px solid ${p.theme.colors.secondaryWarning};
    }`}
`

export const TextInputNoOutline = css`
  font-weight: bold;
  box-sizing: border-box;
  border-radius: 0;
  border-style: none;
  border-bottom-style: solid;
  border-bottom-width: thin;
`

export const ScrollbarLike = css`
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${p => p.theme.colors.scrollbar};
    border-radius: 10px;
    border: 1px solid ${p => p.theme.colors.scrollbar};
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  ::-webkit-resizer {
    background-color: transparent;
  }
`

export const CenterHorizontally = css`
  margin: 0 50%;
  transform: translateX(-50%);
`
