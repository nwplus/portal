import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'wouter'
import cmdf_logo from '../assets/cmdf_logo.svg'
import hc_logo from '../assets/hc_logo.svg'
import nwhacks_logo from '../assets/nwhacks_logo.svg'
import nwplus_logo from '../assets/nwplus_icon.svg'
import { useAuth } from '../utility/Auth'
import { getSponsors } from '../utility/firebase'
import { hackerStatuses } from './ApplicationDashboard'
import { Button } from './Input/index'
import { A } from './Typography'
import NotificationToggle from '../containers/NotificationToggle'
import { IS_DEVICE_IOS, APPLICATION_STATUS } from '../utility/Constants'
import { useHackathon } from '../utility/HackathonProvider'

const SidebarContainer = styled.div`
  min-width: 235px;
  min-height: 100%;
  transition: opacity 1s ease-out;
  z-index: 999;
  border-right: 2px solid ${p => p.theme.colors.sidebar.secondary};
  background: ${p => p.theme.colors.sidebar.background};
  ${p => p.theme.mediaQueries.mobile} {
    ${p => (p.showMobileSidebar ? 'visibility: visible' : 'visibility: hidden; display: none')};
  }
`

const chooseLogo = hackathon => {
  switch (hackathon) {
    case 'hackcamp':
      return hc_logo
    case 'cmd-f':
      return cmdf_logo
    case 'nwhacks':
      return nwhacks_logo
    default:
      return nwplus_logo
  }
}

const Logo = styled.img.attrs(p => ({
  src: chooseLogo(p.hackathon),
}))`
  max-height: 100px;
  margin: 24px auto;
  display: block;
  cursor: pointer; // Add this to indicate it's clickable

  ${p =>
    p.hackathon === 'hackcamp' &&
    `
      width: 150px;
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
  padding: 1em 50px 1em 2rem;
  border-bottom: none;
  background: transparent;

  color: ${p => p.theme.colors.sidebar.textDefault};

  &:hover {
    color: ${p => p.theme.colors.sidebar.textHover};
    background: ${p => p.theme.colors.sidebar.backgroundHover};
    border-bottom: none;
  }

  &:focus {
    color: ${p => p.theme.colors.sidebar.textSelected};
    border-bottom: none;
  }

  ${p =>
    p.selected &&
    `
    background: ${p.theme.colors.sidebar.backgroundSelected};
    color: ${p.theme.colors.sidebar.textSelected};

    &:hover, &:focus {
      background: ${p.theme.colors.sidebar.backgroundHover};
      border-bottom: none;
    }
  `}
`

const BackLink = styled(StyledA)`
  padding-top: 32px;
  color: ${p => p.theme.colors.sidebar.textDefault};
  opacity: 0.8;
  font-weight: 600;

  &:hover {
    opacity: 1;
    background: transparent;
  }
`

// const LiveDot = styled.span`
//   height: 10px;
//   width: 10px;
//   background: ${p => p.theme.colors.primary};
//   border-radius: 50%;
//   margin: 0 7px 0 4px;
//   display: inline-block;
// `
/* Old styles
background-color: ${p => p.theme.colors.primary};
*/
// const LiveLabel = styled.p`
//   margin: 1em 0 2em 2rem;
//   font-weight: bold;
//   font-size: 0.9em;
//   border-radius: 7px;
//   background: ${p => p.theme.colors.primaryGradient};
//   color: ${p => p.theme.colors.cardText};
//   width: 4em;
//   padding: 5px;
// `

const StyledButton = styled(Button)`
  margin: 1em 0 1em 2rem;
  display: inline-block;
  text-transform: capitalize;
`

const ApplicationText = styled.div`
  color: #ffffff;
`

const StatusText = styled.div`
  font-size: 0.8em;
  color: ${p => p.theme.colors.sidebar.secondary};
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
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${p => p.theme.colors.sidebar.textSectionHeader};
`

const LogoContainer = styled.div`
  display: flex;
  align-items: flex-end;
`

// const ExternalLink = styled.a`
//   color: ${p => p.theme.colors.sidebar.primary};
//   text-decoration: none;
// `

// const SponsorIcon = styled.img`
//   width: 100px;
//   height: 42px;
// `

const Sidebar = ({
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
      { location: '/livestream', text: 'Livestream' },
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
    information: [{ location: '/faq', text: 'FAQ' }],
    useful_links: [
      {
        location:
          'https://nwplus.notion.site/PUBLIC-nwHacks-2024-Hacker-Info-Package-c22183ec8a0f4ccc9900a8200db4fd86',
        text: 'Hacker Package',
      },
      {
        location: 'https://discord.gg/U3SgBJUHsV',
        text: 'Discord',
      },
    ],
  }
  const [sponsors, setSponsors] = useState([])
  const { activeHackathon, dbHackathonName } = useHackathon()

  useEffect(() => {
    getSponsors(dbHackathonName).then(docs => {
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
  }, [dbHackathonName])

  if (isSubmissionsOpen || isJudgingOpen || isJudgingReleased) {
    links.tools.push({ location: '/projects', text: 'Project Gallery' })
  }

  if (isSubmissionsOpen || isJudgingReleased) {
    links.tools.push({ location: '/submission', text: 'Project Submission' })
  }

  if (isJudgingOpen) {
    links.tools.push({ location: '/judging', text: 'Peer Judging' })
  }

  if (user && user.admin) {
    links.tools.push({ location: '/judging/admin', text: 'Judging Admin' })
  }

  // if (import.meta.env.NODE_ENV !== 'production') {
  //   links.information.push({ location: '/charcuterie', text: 'CHARCUTERIE' })
  // }

  if (isApplicationOpen) {
    // List the application as the last item on the menu
    links.information.push({ location: '/application', text: 'APPLICATION' })
  }

  if (user && user.status === APPLICATION_STATUS.accepted && isAuthed && user.uid) {
    links.general[0] = { location: '/', text: 'My Ticket' }
  }

  return (
    <SidebarContainer showMobileSidebar={showMobileSidebar}>
      <Link href="~/">
        <BackLink>← BACK</BackLink>
      </Link>

      <LogoContainer>
        <Link href="~/" onClick={hideSidebarCallback}>
          <Logo alt="logo" hackathon={activeHackathon} />
        </Link>
        {/* <SponsorIcon src={poweredBy} alt="powered by Livepeer" /> */}
      </LogoContainer>
      <ItemsContainer>
        {!hackerStatus || hackerStatus === 'acceptedAndAttending' ? (
          <>
            {Object.entries(links).map((t, k) => {
              return (
                t[1].length > 0 &&
                t[0] !== 'useful_links' && (
                  <React.Fragment key={k}>
                    <CategoryHeader>{t[0].replace('_', ' ')}</CategoryHeader>
                    {t[1].map((v, i) => (
                      <Link key={v.location} href={v.location} onClick={hideSidebarCallback}>
                        <StyledA selected={location === v.location}>{v.text}</StyledA>
                      </Link>
                    ))}
                  </React.Fragment>
                )
              )
            })}
            {/* {!IS_DEVICE_IOS ? <NotificationToggle /> : null} */}
          </>
        ) : (
          <Link href={'/application'}>
            <StyledA selected={location === '/application'}>
              <ApplicationText>APPLICATION</ApplicationText>
              <StatusText>{hackerStatuses()[hackerStatus]?.sidebarText}</StatusText>
            </StyledA>
          </Link>
        )}
      </ItemsContainer>

      {/* {user?.status === APPLICATION_STATUS.accepted && isAuthed && user.uid ? (
        <ItemsContainer>
          <CategoryHeader>Useful Links</CategoryHeader>
          {links.useful_links.map((v, i) => (
            <ExternalLink key={i} href={v.location} target="_blank" rel="noopener noreferrer">
              <StyledA>{v.text}</StyledA>
            </ExternalLink>
          ))}
        </ItemsContainer>
      ) : (
        <></>
      )} */}

      {isAuthed ? (
        <StyledButton color="secondary" onClick={logout}>
          Log out
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

export default Sidebar
