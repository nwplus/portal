import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'wouter'
import { A } from './Typography'
import logo from '../assets/logo.svg'
import hc_logo from '../assets/hc_logo.svg'
import nwhacks_logo from '../assets/nwhacks_logo.svg'
import cmdf_logo from '../assets/cmdf_logo.svg'
import { Button } from './Input/index'
import { useAuth } from '../utility/Auth'
import { hackerStatuses } from './ApplicationDashboard'
import { getSponsors } from '../utility/firebase'

const SidebarContainer = styled.div`
  min-width: 275px;
  min-height: 100%;
  // border-right: 1px solid ${p => p.theme.colors.border};
  transition: opacity 1s ease-out;
  z-index: 1;
  background: #051439;
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
    case 'nwHacks':
      return nwhacks_logo
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
  text-transform: uppercase;
  display: block;
  font-weight: bold;
  padding: 1em 50px;
  border-bottom: none;
  color: ${p => (p.theme.name !== 'cmdf' && p.selected ? '#051439' : p.theme.colors.highlight)};
  ${p => p.selected && `background: #FFB72C;`}
  &:hover {
    color: #ffffff;
    background: ${p => p.theme.colors.secondaryBackgroundTransparent};
    border-bottom: none;
  }
  &:focus {
    color: #ffffff;
    background: ${p => p.theme.colors.secondaryBackgroundTransparent};
    border-bottom: none;
  }
`

const LiveDot = styled.span`
  height: 10px;
  width: 10px;
  background: ${p => p.theme.colors.background};
  border-radius: 50%;
  margin: 0 7px 0 4px;
  display: inline-block;
`

const LiveLabel = styled.p`
  margin: 1em 0 2em 60px;
  font-weight: 600;
  font-size: 0.9em;
  border-radius: 7px;
  // background-color: ${p => p.theme.colors.primary};
  background: linear-gradient(to bottom, #ffd12c, #fe800b);
  // color: ${p => p.theme.colors.background};
  color: #051439;
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

const SponsorLogo = styled.img`
  display: block;
  margin: 1em 0 0 50px;
  max-width: calc(200px - 2em);
`

const CategoryHeader = styled.h4`
  text-transform: uppercase;
  padding: 1em 50px 0;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.45);
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
  const linksDict = ['General', 'Tools', 'Information', '']
  const links = [
    // General
    [
      { location: '/quicklinks', text: 'Getting Started' },
      { location: '/', text: 'Home' },
      { location: '/schedule', text: 'Schedule' },
      { location: '/sponsors', text: 'Sponsors' },
    ],
    // Tools
    [
      { location: '/gallery', text: 'Project Gallery' },
      // (conditional) Project Submission
      // (conditional) Peer Judging
      // (conditional) Judging (Admin)
    ],
    // Information
    [
      { location: '/package', text: 'Info Package' },
      { location: '/judging', text: 'Judging' },
      { location: '/faq', text: 'FAQ' },
    ],
    // DEBUG/misc
    [],
  ]
  const [sponsors, setSponsors] = useState([])

  useEffect(() => {
    getSponsors().then(docs => {
      // Only keep platinum tier sponsors for sidebar
      const filteredDocs = docs
        .filter(doc => doc.data().tier && doc.data().tier.toLowerCase() === 'platinum')
        .map(doc => doc.data())
      setSponsors(filteredDocs)
    })
  }, [setSponsors])

  if (isSubmissionsOpen) {
    links[1].push({ location: '/submission', text: 'Project Submission' })
  }

  if (isJudgingOpen) {
    links[1].push({ location: '/judging', text: 'Peer Judging' })
  }

  if (user && user.admin) {
    links[1].push({ location: '/judging/admin', text: 'Judging Admin' })
  }

  if (process.env.NODE_ENV !== 'production') {
    links[3].push({ location: '/charcuterie', text: 'CHARCUTERIE' })
  }

  if (isApplicationOpen) {
    // List the application as the last item on the menu
    links[3].push({ location: '/application', text: 'APPLICATION' })
  }

  const [renderLinks, setRenderLinks] = useState([])

  useEffect(() => {
    let renderArray = []

    links.forEach((item, index) =>
      renderArray.push(
        <>
          <CategoryHeader>{linksDict[index]}</CategoryHeader>
          {item.map((link, i) => {
            return (
              <Link key={i} href={link.location} onClick={hideSidebarCallback}>
                <StyledA selected={location === link.location}>{link.text}</StyledA>
              </Link>
            )
          })}
        </>
      )
    )

    setRenderLinks(renderArray)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [links])

  return (
    <SidebarContainer showMobileSidebar={showMobileSidebar}>
      <Logo alt="logo" />
      <LiveLabel>
        <LiveDot />
        LIVE
      </LiveLabel>
      <ItemsContainer>
        {!hackerStatus || hackerStatus === 'acceptedAndAttending' ? (
          renderLinks
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
      {sponsors && sponsors.map(sponsor => <SponsorLogo key={sponsor.name} src={sponsor.imgURL} />)}
    </SidebarContainer>
  )
}
