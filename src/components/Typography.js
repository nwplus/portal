import styled, { css } from 'styled-components'
import { Link } from 'wouter'

// mix-ins
export const text = css`
  color: ${p => p.theme.colors.text};
`

const headerText = css`
  ${text};
  font-family: ${p => p.theme.typography.headerFont};
`

export const H1 = styled.h1`
  ${headerText};
  font-weight: ${p => p.theme.typography.h1.weight};
  font-size: ${p => p.size || p.theme.typography.h1.size};
`

export const H2 = styled.h2`
  ${headerText};
  font-weight: ${p => p.theme.typography.h2.weight};
  font-size: ${p => p.theme.typography.h2.size};
  opacity: ${p => p.theme.typography.h2.opacity};
`

export const H3 = styled.h3`
  ${headerText};
  font-weight: ${p => p.theme.typography.h3.weight};
  font-size: ${p => p.theme.typography.h3.size};
  opacity: ${p => p.theme.typography.h3.opacity};
  color: #ffffff;
`

export const P = styled.p`
  ${text};
  ${p => p.highlight && `color: ${p.theme.colors.linkHover}`};
  margin: 10px 0;
  line-height: 1.5;
`

export const I = styled.i`
  ${text};
  ${p => p.highlight && `color: ${p.theme.colors.linkHover}`};
  margin: 0;
`

export const ErrorMessage = styled.p`
  color: ${p => p.theme.colors.warning};
  margin: 0.5em 0em;
`

export const Message = styled.p`
  color: ${p => p.theme.colors.highlight};
  margin: 0.5em 0em;
`

export const ErrorSpan = styled.span`
  color: ${p => p.theme.colors.warning};
  &:after {
    content '${p => p.content || '*'}';
  }
`

export const HR = styled.hr`
  margin: 40px 0;
  border-color: ${p => p.theme.colors.border};
`

// note: didn't use text-decoration: underline here because we didn't use it for the A component below - kevo
// this uses the wouter Link component so we can link to our own pages and not have a reload forced
export const PortalLink = styled(Link)`
  text-decoration: none;
  font-weight: ${p => (p.bolded ? 600 : 400)};
  border-bottom: 1px solid ${p => (p.color ? p.theme.colors.primary : p.theme.colors.link)};
  color: ${p =>
    p.color ? (p.color === 'primary' && p.theme.colors.primary) || p.color : p.theme.colors.link};
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

// note: didn't use text-decoration: underline here because the defaut underline doesn't match designs' thiccness - Allison
export const A = styled.a`
  cursor: pointer;
  text-decoration: none;
  width: ${p => p.width || 'auto'};
  font-weight: ${p => (p.bolded ? 600 : 400)};
  border-bottom: 1px solid ${p => (p.color ? p.theme.colors.primary : p.theme.colors.link)};
  color: #fff;
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
  color: ${p => p.theme.colors.text};
  opacity: 0.5;
  font-weight: 600;
  text-transform: uppercase;
`
// old style   color: ${p => (p.color ? p.color : p.theme.colors.primary)};
export const Label = styled.label`
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  font-weight: bold;
`

export const CenteredH1 = styled(H1)`
  text-align: center;
`

export const Code = styled.code`
  background-color: #1e1e1e;
  color: #ffffff;
  font-size: 0.9rem;
  padding: 2px 4px;
  border-radius: 4px;
`
