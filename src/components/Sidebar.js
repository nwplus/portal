import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'wouter'
import { A } from './Typography'
import logo from '../assets/logo.svg'
import hc_logo from '../assets/hc_logo.svg'

const SidebarContainer = styled.div`
  min-width: 275px;
  min-height: 100%;
  border-right: 1px solid ${p => p.theme.colors.border};
  transition: opacity 1s ease-out;
  ${p => p.theme.mediaQueries.mobile} {
    ${p => (p.showMobileSidebar ? 'visibility: visible' : 'visibility: hidden; display: none')};
  }
`

const Logo = styled.img.attrs(p => ({
  src: p.theme.custom_imgs === 'hc' ? hc_logo : logo,
}))`
  width: 80px;
  height: 85px;
  margin: 30px 0 0px 50px;

  ${p =>
    p.theme.custom_imgs === 'hc' &&
    `
      width: 120px;
      margin: 30px 0 0px 60px;
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
  color: ${p => (p.selected ? p.theme.colors.primary : p.theme.colors.highlight)};
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

export default ({ showMobileSidebar, isJudgingOpen, isSubmissionsOpen, isApplicationOpen }) => {
  const [location] = useLocation()

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

  if (process.env.NODE_ENV !== 'production') {
    links.push({ location: '/judging/admin', text: 'JUDGING ADMIN' })
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
