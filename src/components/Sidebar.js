import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'wouter'
import { A } from './Typography'
import logo from '../assets/logo.svg'
import { maxWidthMediaQueries } from './Common'

const SidebarContainer = styled.div`
  min-width: 275px;
  min-height: 100%;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  transition: opacity 1s ease-out;
  ${maxWidthMediaQueries('mobile')} {
    ${props =>
    props.showMobileSidebar ? 'visibility: visible' : 'visibility: hidden; display: none'};
  }
`

const Logo = styled.img`
  width: 80px;
  height: 85px;
  margin: 30px 0 0px 50px;
`

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledA = styled(A)`
  display: block;
  font-weight: bold;
  padding: 1em 60px;
  border-bottom: none;
  color: ${p => (p.selected ? p.theme.colors.linkHover : p.theme.colors.highlight)};
  ${p => p.selected && `background: ${p.theme.colors.secondaryBackground};`}
  &:hover {
    background: ${p => p.theme.colors.secondaryBackground};
    border-bottom: none;
  }
  &:focus {
    background: ${p => p.theme.colors.secondaryBackground};
    border-bottom: none;
  }
`

const LiveDot = styled.span`
  height: 10px;
  width: 10px;
  background-color: ${p => p.theme.colors.text};
  border-radius: 50%;
  margin: 0 7px 0 4px;
  display: inline-block;
`

const LiveLabel = styled.p`
  margin: 1em 0 2em 60px;
  font-weight: 600;
  font-size: 0.9em;
  border-radius: 7px;
  background-color: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.secondaryBackground};
  width: 4em;
  padding: 5px;
`

export default ({ showMobileSidebar, isJudgingEnabled }) => {
  const [location] = useLocation()

  const links = [
    { location: '/', text: 'DASHBOARD' },
    { location: '/schedule', text: 'SCHEDULE' },
    { location: '/quicklinks', text: 'QUICKLINKS' },
    { location: '/faq', text: 'FAQ' },
    { location: '/sponsors', text: 'SPONSORS' },
  ]

  if (isJudgingEnabled) {
    links.push({ location: '/judging', text: 'JUDGING' })
  }

  if (process.env.NODE_ENV !== 'production') {
    links.push({ location: '/charcuterie', text: 'CHARCUTERIE' })
  }

  return (
    <SidebarContainer showMobileSidebar={showMobileSidebar}>
      <Logo src={logo} alt="logo" />
      <LiveLabel>
        <LiveDot />
        LIVE
      </LiveLabel>
      <ItemsContainer>
        {links.map((link, i) => {
          return (
            <Link key={i} href={link.location}>
              <StyledA selected={location === link.location}>{link.text}</StyledA>
            </Link>
          )
        })}
      </ItemsContainer>
    </SidebarContainer>
  )
}
