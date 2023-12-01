import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'wouter'
import cmdf_logo from '../assets/cmdf_logo.png'
import hc_logo from '../assets/hc_logo.svg'
import logo from '../assets/logo.svg'
import nwhacks_logo from '../assets/nwhacks_logo_white.svg'
import { useAuth } from '../utility/Auth'
import { getSponsors } from '../utility/firebase'
import { hackerStatuses } from './ApplicationDashboard'
import { Button } from './Input/index'
import { A } from './Typography'

/* Old styles
border-right: 1px solid ${p => p.theme.colors.border};
*/
const SidebarContainer = styled.div`
  min-width: 275px;
  min-height: 100%;
  transition: opacity 1s ease-out;
  z-index: 1;
  background: ${p => p.theme.colors.secondaryBackground};
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
  height: 6em;
  margin: 30px 0 0px 2rem;

  ${p =>
    p.theme.name === 'hackCamp' &&
    `
      width: 120px;
      margin: 30px 0 0px 2rem;
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

/* Old styles
  background: ${p => p.theme.colors.secondaryBackground};
  color: ${p =>
    p.theme.name !== 'cmdf' && p.selected ? p.theme.colors.primary : p.theme.colors.highlight};
  ${p => p.selected && `background: ${p.theme.colors.secondaryBackgroundTransparent};`}

  &:hover {
    background: ${p => p.theme.colors.secondaryBackground};
  }
  &:focus {
    background: ${p => p.theme.colors.secondaryBackground};
  }
*/
const StyledA = styled(A)`
  text-transform: uppercase;
  display: block;
  font-weight: bold;
  padding: 1em 50px 1em 2rem;
  border-bottom: none;
  background: transparent;

  color: ${p => p.theme.colors.sidebar.link};

  ${p =>
    p.selected &&
    `
    background: #433860;
    color: #ffffff;

    &:hover {
      color: #ffffff;
      background: ${p => p.theme.colors.secondaryBackgroundTransparentHover};
      border-bottom: none;
    }
  `}

  &:hover {
    color: ${p => p.theme.colors.text};
    background: ${p => p.theme.colors.card};
    border-bottom: none;
  }
  &:focus {
    color: ${p => p.theme.colors.text};
    border-bottom: none;
  }
`

const LiveDot = styled.span`
  height: 10px;
  width: 10px;
  background: ${p => p.theme.colors.primary};
  border-radius: 50%;
  margin: 0 7px 0 4px;
  display: inline-block;
`
/* Old styles
background-color: ${p => p.theme.colors.primary};
*/
const LiveLabel = styled.p`
  margin: 1em 0 2em 2rem;
  font-weight: bold;
  font-size: 0.9em;
  border-radius: 7px;
  background: ${p => p.theme.colors.primaryGradient};
  color: ${p => p.theme.colors.cardText};
  width: 4em;
  padding: 5px;
`

const StyledButton = styled(Button)`
  margin: 1em 0 1em 2rem;
`

const ApplicationText = styled.div`
  color: #ffffff;
`

const StatusText = styled.div`
  font-size: 0.8em;
  color: ${p => p.theme.colors.sidebar.statusText};
  margin-top: 5px;
`

const SponsorContainer = styled.div`
  margin: 40px 0 40px 50px;
  max-width: calc(200px - 2em);
`

const SponsorLogo = styled.img`
  width: 100%;

  &:not(:last-of-type) {
    margin-bottom: 1em;
  }
`

const CategoryHeader = styled.h4`
  text-transform: uppercase;
  padding: 1em 50px 0 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${p => p.theme.colors.secondaryBackgroundTransparent};
`

const LogoContainer = styled.div`
  display: flex;
  align-items: flex-end;
`

// const SponsorIcon = styled.img`
//   width: 100px;
//   height: 42px;
// `

export default ({
  showMobileSidebar,
  isJudgingOpen,
  isJudgingReleased,
  isSubmissionsOpen,
  isApplicationOpen,
  hideSidebarCallback,
  hackerStatus,
}) => {
  const [location] = useLocation()
  const { user, isAuthed, logout } = useAuth()
  const links = {
    // General
    general: [
      { location: '/', text: 'Home' },
      { location: '/schedule', text: 'Schedule' },
      { location: '/sponsors', text: 'Sponsors' },
    ],
    // Tools
    tools: [
      // (conditional) Project Gallery
      // (conditional) Project Submission
      // (conditional) Peer Judging
      // (conditional) Judging (Admin)
    ],
    // Information
    information: [
      // { location: '/getting-started', text: 'Getting Started' },
      // { location: '/discord-bot', text: 'Discord Bot' },
      { location: '/faq', text: 'FAQ' },
    ],
  }
  const [sponsors, setSponsors] = useState([])

  useEffect(() => {
    getSponsors().then(docs => {
      // Only keep platinum tier sponsors for sidebar
      // const filteredDocs = docs
      //   .filter(doc => doc.data().tier && doc.data().tier.toLowerCase() === 'platinum')
      //   .map(doc => doc.data())
      // console.log(filteredDocs)
      // setSponsors(filteredDocs)
      // TODO: Revert this change
      // For cmd-f 2022 the logos in the sidebar should be light variants
      // HackCamp22 has no plat sponsors :(
      // setSponsors([
      //   {
      //     name: 'TTT Studios',
      //     imgURL: tttStudios,
      //   },
      //   {
      //     name: 'Covalent',
      //     imgURL: covalent,
      //   },
      //   {
      //     name: 'Hootsuite',
      //     imgURL: hootsuite,
      //   },
      // ])
    })
  }, [setSponsors])

  // if (isSubmissionsOpen || isJudgingOpen || isJudgingReleased) {
  //   links.tools.push({ location: '/projects', text: 'Project Gallery' })
  // }

  if (isSubmissionsOpen || isJudgingReleased) {
    links.tools.push({ location: '/submission', text: 'Project Submission' })
  }

  if (isJudgingOpen) {
    links.tools.push({ location: '/judging', text: 'Peer Judging' })
  }

  if (user && user.admin) {
    links.tools.push({ location: '/judging/admin', text: 'Judging Admin' })
  }

  if (process.env.NODE_ENV !== 'production') {
    links.information.push({ location: '/charcuterie', text: 'CHARCUTERIE' })
  }

  if (isApplicationOpen) {
    // List the application as the last item on the menu
    links.information.push({ location: '/application', text: 'APPLICATION' })
  }

  return (
    <SidebarContainer showMobileSidebar={showMobileSidebar}>
      <LogoContainer>
        <Logo alt="logo" />
        {/* <SponsorIcon src={poweredBy} alt="powered by Livepeer" /> */}
      </LogoContainer>
      <LiveLabel>
        <LiveDot />
        LIVE
      </LiveLabel>
      <ItemsContainer>
        {!hackerStatus || hackerStatus === 'acceptedAndAttending' ? (
          Object.entries(links).map((t, k) => {
            return (
              t[1].length > 0 && (
                <>
                  <CategoryHeader>{t[0]}</CategoryHeader>
                  {t[1].map((v, i) => (
                    <Link key={i} href={v.location} onClick={hideSidebarCallback}>
                      <StyledA selected={location === v.location}>{v.text}</StyledA>
                    </Link>
                  ))}
                </>
              )
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
      {isAuthed ? (
        <StyledButton color="secondary" onClick={logout}>
          Logout
        </StyledButton>
      ) : (
        <StyledButton color="secondary" href="/login">
          Log In
        </StyledButton>
      )}
      <SponsorContainer>
        {sponsors &&
          sponsors.map(sponsor => <SponsorLogo key={sponsor.name} src={sponsor.imgURL} />)}
      </SponsorContainer>
    </SidebarContainer>
  )
}
