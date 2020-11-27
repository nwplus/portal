import styled, { css } from 'styled-components'

// mix-ins
export const text = css`
  color: ${p => p.theme.colors.text};
`

export const H1 = styled.h1`
  ${text};
  font-weight: ${p => p.theme.typography.h1.weight};
  font-size: ${p => p.theme.typography.h1.size};
`

export const H2 = styled.h2`
  ${text};
  font-weight: ${p => p.theme.typography.h2.weight};
  font-size: ${p => p.theme.typography.h2.size};
  opacity: ${p => p.theme.typography.h2.opacity};
`

export const H3 = styled.h3`
  ${text};
  font-weight: ${p => p.theme.typography.h3.weight};
  font-size: ${p => p.theme.typography.h3.size};
  opacity: ${p => p.theme.typography.h3.opacity};
`

export const P = styled.p`
  ${text};
  ${p => p.highlight && `color: ${p.theme.colors.linkHover}`};
  margin: 0;
`

export const I = styled.i`
  ${text};
  ${p => p.highlight && `color: ${p.theme.colors.linkHover}`};
  margin: 0;
`

// note: didn't use text-decoration: underline here because the defaut underline doesn't match designs' thiccness - Allison
export const A = styled.a`
  cursor: pointer;
  text-decoration: none;
  font-weight: ${p => (p.bolded ? 600 : 400)};
  border-bottom: 1px solid ${p => (p.color ? p.theme.colors.primary : p.theme.colors.link)};
  color: ${p => (p.color ? p.color === "primary" && p.theme.colors.primary || p.color : p.theme.colors.link)};
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    color: ${p => p.theme.colors.linkHover};
    border-bottom: 1px solid ${p => p.theme.colors.linkHover};
  }
  &:focus {
    color: ${p => p.theme.colors.linkHover};
    border-bottom: 1px solid ${p => p.theme.colors.linkHover};
  }
`

export const UL = styled.ul`
  list-style: none;
  padding-inline-start: 10px;
`
export const LI = styled.li`
  margin: 10px 0;
  &:before {
    content: '-';
    padding-right: 8px;
    color: ${p => p.theme.colors.text};
  }
`

export const QuestionHeading = styled.p`
  color: ${p => p.theme.colors.primary};
  font-weight: 600;
  text-transform: uppercase;
`
