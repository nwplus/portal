import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'wouter'
import { A } from './Typography'
import logo from '../assets/logo.svg'
import hc_logo from '../assets/hc_logo.svg'
import cmdf_logo from '../assets/cmdf_logo.svg'
import { Button } from './Input/index'
import { useAuth } from '../utility/Auth'
import { hackerStatuses } from './ApplicationDashboard'

const SidebarContainer = styled.div`
  min-width: 275px;
  min-height: 100%;
  border-right: 1px solid ${p => p.theme.colors.border};
  transition: opacity 1s ease-out;
  z-index: 1;
  background: ${p => p.theme.colors.background};
  ${p => p.theme.mediaQueries.mobile} {
    ${p => (p.showMobileSidebar ? 'visibility: visible' : 'visibility: hidden; display: none')};
  }
`
const chooseLogo = hackathon => {
  switch (hackathon) {
    case 'hackCamp':
      return hc_logo
    case 'cmdf':
      return cmdf_logo
    default:
      return logo
  }
}

const Logo = styled.img.attrs(p => ({
  src: chooseLogo(p.theme.name),
}))`
  width: 80px;
  height: 85px;
  margin: 30px 0 0px 50px;

  ${p =>
    p.theme.name === 'hackCamp' &&
    `
      width: 120px;
      margin: 30px 0 0px 60px;
    `}

  ${p =>
    p.theme.name === 'cmdf' &&
    `
        width: 120px;
        margin: 86px 0 24px 48px;
      `}
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
  color: ${p =>
    p.theme.name !== 'cmdf' && p.selected ? p.theme.colors.primary : p.theme.colors.highlight};
  ${p => p.selected && `background: ${p.theme.colors.secondaryBackgroundTransparent};`}
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
  background-color: ${p => p.theme.colors.background};
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
  color: ${p => p.theme.colors.background};
  width: 4em;
  padding: 5px;
`

const StyledButton = styled(Button)`
  margin: 1em 0 2em 60px;
`

const ApplicationText = styled.div`
  color: #ffffff;
`

const StatusText = styled.div`
  font-size: 0.8em;
  color: ${p => p.theme.colors.primary};
  margin-top: 5px;
`

const TitleSponsor = styled.img`
  margin: 1em 0 0 60px;
`

export default ({
  showMobileSidebar,
  isJudgingOpen,
  isSubmissionsOpen,
  isApplicationOpen,
  hideSidebarCallback,
  hackerStatus,
}) => {
  const [location] = useLocation()
  const { user, isAuthed, logout } = useAuth()
  const links = [
    { location: '/', text: 'DASHBOARD' },
    { location: '/schedule', text: 'SCHEDULE' },
    { location: '/quicklinks', text: 'QUICKLINKS' },
    { location: '/faq', text: 'FAQ' },
    { location: '/sponsors', text: 'SPONSORS' },
  ]

  if (isJudgingOpen) {
    links.push({ location: '/judging', text: 'JUDGING' })
  }

  if (isSubmissionsOpen) {
    links.push({ location: '/submission', text: 'SUBMISSION' })
  }

  if (user && user.admin) {
    links.push({ location: '/judging/admin', text: 'JUDGING ADMIN' })
  }

  if (process.env.NODE_ENV !== 'production') {
    links.push({ location: '/charcuterie', text: 'CHARCUTERIE' })
  }

  if (isApplicationOpen) {
    // List the application as the last item on the menu
    links.push({ location: '/application', text: 'APPLICATION' })
  }

  return (
    <SidebarContainer showMobileSidebar={showMobileSidebar}>
      <Logo alt="logo" />
      <LiveLabel>
        <LiveDot />
        LIVE
      </LiveLabel>
      <ItemsContainer>
        {!hackerStatus || hackerStatus === 'acceptedAndAttending' ? (
          links.map((link, i) => {
            return (
              <Link key={i} href={link.location} onClick={hideSidebarCallback}>
                <StyledA selected={location === link.location}>{link.text}</StyledA>
              </Link>
            )
          })
        ) : (
          <Link href={'/application'}>
            <StyledA selected={location === '/application'}>
              <ApplicationText>APPLICATION</ApplicationText>
              <StatusText>{hackerStatuses()[hackerStatus]?.sidebarText}</StatusText>
            </StyledA>
          </Link>
        )}
      </ItemsContainer>
      {isAuthed && (
        <StyledButton color="secondary" onClick={logout}>
          Logout
        </StyledButton>
      )}
      <a href="https://www.covalenthq.com" target="_blank" rel="noopener noreferrer">
        <TitleSponsor src="/title_sponsor.svg" alt="Covalent logo" />
      </a>
    </SidebarContainer>
  )
}
