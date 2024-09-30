import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { H1, H2, P } from '../components/Typography'

import { NotFound } from '.'
// import Hackcamp2023BG from '../components/BackgroundImage'
import { Loading } from '../components/HeroPage'
import { Button } from '../components/Input'
import Youtube from '../components/Youtube'
import { getSubmission } from '../utility/firebase'
import { useHackathon } from '../utility/HackathonProvider'

const StyledProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin: 0 50px;
`

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100%;
`

const LinkContainer = styled.div`
  display: flex;
  justify-contents: center;
`

const StyledYoutube = styled(Youtube)`
  width: 600px;
  height: 350px;
  border-radius: 3px;
`

const StyledBanner = styled.div`
  ${p => `
    color: ${p.theme.colors.text};
    background: transparent;
    border: 1px solid ${p.theme.colors.text};`}
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 100%;
`

const StyledH1 = styled(H1)`
  color: inherit;
  margin-bottom: 16px;
`

const StyledP = styled(P)`
  color: inherit;
  margin-bottom: 21px;
`

const StyledH2 = styled(H2)`
  opacity: 1;
`

const StyledButton = styled(Button)`
  margin-top: 0;
`

const Project = ({ project }) => {
  const teamMembers = Object.values(project.teamMembers).map(member => member.name)

  const getDisplayName = linkKey => {
    switch (linkKey) {
      case 'devpost':
        return 'Devpost'
      case 'youtube':
        return 'YouTube'
      case 'sourceCode':
        return 'Source code'
      default:
        return null
    }
  }

  const truncateLink = link => {
    if (link?.length > 10) {
      return `${link.substring(0, 7)}...`
    } else {
      return link
    }
  }

  // const arr = [
  //   '',
  //   `Peer2Pair`,
  //   `Post-That`,
  //   `Slingo`,
  //   `UBC Course Map`,
  //   `MovifyGames`,
  //   `UBOntime`,
  //   `Cooking on the Fly`,
  //   `// TODO: Tasks, Objectives, and Discussions Organized`,
  //   `Wear3Words`,
  //   `codeStreaks`,
  //   `UnDUE`,
  //   `Mode`,
  //   `Intelliphant`,
  //   `Chainlearn`,
  //   `sobriety.io`,
  //   `Moments`,
  //   `whisper`,
  //   `Stride`,
  //   `Build-A-Jous`,
  //   `Foodle`,
  //   `FOOD4MOOD`,
  //   `Complexion.ai`,
  //   `Check`,
  //   `classyfi`,
  //   `React Todo-List`,
  //   `Maya, Mental Health Assistant`,
  //   `Yudo`,
  //   `SayWhatever`,
  //   `Computer Science Forums - CSF`,
  //   `IMGUESSR.io`,
  //   `kizuna 絆`,
  //   `Aniprofinder`,
  //   `Text Reminder`,
  //   `PeerSafe`,
  //   `StarStruck`,
  //   `Pill Dispenser (PigeonPill)`,
  //   `Blinkr: Smart Eye Protection`,
  //   `VirtualPrep`,
  //   `TidBit`,
  //   `VR Speech Simulator`,
  //   `RateABox`,
  //   `Visual.ai.d`,
  //   `Future Store`,
  //   `Venture Bot`,
  //   `Reworkd.ai`,
  //   `TutorShare`,
  //   `Incode`,
  //   `sabr`,
  //   `LATER (Listen And Transcribe Easily and Rapidly)`,
  //   `Text Memoirs`,
  //   `WatchLog`,
  //   `PLANTIS`,
  //   `Xplore`,
  //   `Social Diary`,
  //   `noteAI Chrome Extension`,
  //   `Tabby Pals`,
  //   `peerAdvice`,
  //   `playc3`,
  //   `I Wet My Plants`,
  //   `Food Share`,
  //   `reCap`,
  //   `GroPay`,
  //   `Where2Eat`,
  //   `Quiz Flash`,
  //   `BuckIt`,
  //   `Propertization`,
  //   `Covinox- Where protection meets privacy`,
  //   `Make Your Cyber Friend`,
  //   `Kalsi Speakers`,
  //   `Beeno`,
  //   `Artificial Closet`,
  //   `Adventure Awaits`,
  //   `Mood Tracker and Mental Health Journal (Prototype)`,
  //   `Visto`,
  //   `Mindful OutLook`,
  //   `CaptionConcierge`,
  //   `Sync Up`,
  //   `HackaTeam`,
  //   `EatRight`,
  //   `Hungry Husky`,
  //   `Career Roaster`,
  //   `dont kill our plant`,
  //   `UniTalkCA`,
  //   `Plants Live Here`,
  //   `MediScribe`,
  //   `Scheduler`,
  //   `Lightweight`,
  //   `CarPoolPal`,
  //   `Recall`,
  //   `EcoSnap`,
  //   `compost`,
  //   `MEDiator`,
  //   `GitGoin'`,
  //   `BludBud`,
  //   `Orbi.`,
  //   `Verif.AI`,
  //   `SmartSlides`,
  //   `Workout Woulette`,
  //   `prescript`,
  //   `uniMatch`,
  //   `Flash`,
  //   `Pixel Perfect Match`,
  //   `mindfulU`,
  //   `The Sky's the Limit`,
  //   `UBC Course Scheduler`,
  //   `Survival Guide`,
  //   `WhereU@`,
  //   `GradLink`,
  //   `Chit Chat`,
  //   `journo: AI-Powered Journaling App`,
  //   `! What The Food`,
  //   `sprout.fyi`,
  //   `Time2Eat`,
  //   `Smart Foods`,
  //   `Missing Mystery`,
  //   `Maxiclip`,
  //   `R2C - Recommend 2 Friend`,
  //   `UBC NAVI-BOT`,
  //   `Who's That Birdy-mon?`,
  //   '',
  //   `UBC SOCIAL LIFE`,
  //   '',
  //   `Speech Analytics`,
  //   `Recycle it`,
  //   `Sleepy Ninja!`,
  //   `Live Sport Scores`,
  //   `Presently`,
  //   `Cloud Optimization Platform`,
  //   `Sipwise Web Application`,
  //   `Classic 9 Ball Game`,
  //   `KidsPedia: Unleashing the Power of Education through Breaking Barriers`,
  //   `Project Panini`,
  //   `Slice of Life`,
  // ]

  return (
    <StyledProjectContainer>
      {/* <Hackcamp2023BG version="noObjects" /> */}

      <StyledBanner>
        <StyledH1>{project.title}</StyledH1>
        <StyledP>Created By: {teamMembers.join(' | ')}</StyledP>
        {/* {arr.indexOf(project.title) !== -1 ? (
          <Bolded>Find this team at table #{arr.indexOf(project.title)}</Bolded>
        ) : (
          <StyledA
            href="https://docs.google.com/spreadsheets/d/1ZuFZ6tSdY-c8Iui_CH99hZDqbt_K-Aqf5f6Pmho08fU"
            target="_blank"
            rel="noreferrer noopener"
          >
            View project seating table numbers
          </StyledA>
        )} */}
      </StyledBanner>
      <StyledYoutube src={project.links.youtube} />
      <StyledDiv>
        <StyledH2>Description</StyledH2>
        <P>{project.description}</P>
      </StyledDiv>
      <StyledDiv>
        <StyledH2>Relevant Links</StyledH2>
        <LinkContainer>
          {Object.entries(project.links).map(([key, link]) => {
            const cleanedUpLink = link.replace(/https?:\/\//, '')
            return (
              <StyledButton
                color="primary"
                width="flex"
                href={`//${cleanedUpLink}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                {getDisplayName(key) ?? truncateLink(cleanedUpLink)}
              </StyledButton>
            )
          })}
        </LinkContainer>
      </StyledDiv>
    </StyledProjectContainer>
  )
}

const ProjectView = ({ pid }) => {
  const [loading, setLoading] = useState(true)
  const [projectInfo, setProjectInfo] = useState(null)
  const { dbHackathonName } = useHackathon()

  const getProject = async () => {
    const projectData = await getSubmission(pid, dbHackathonName)
    if (projectData.exists) {
      setProjectInfo(!projectData ? null : projectData)
    } else {
      setProjectInfo(null)
    }
    setLoading(false)
  }

  useEffect(() => {
    getProject()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return loading ? <Loading /> : !!projectInfo ? <Project project={projectInfo} /> : <NotFound />
}

export default ProjectView
