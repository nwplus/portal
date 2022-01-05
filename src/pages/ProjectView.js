import React, { useEffect, useState } from 'react'
import { getSubmission } from '../utility/firebase'
import { Loading } from '../components/HeroPage'
import Youtube from '../components/Youtube'

const Project = ({ project }) => {
  return (
    <div>
      <Youtube src={project.youtubeUrl} />
    </div>
  )
}

export default ({ pid }) => {
  const [projectInfo, setProjectInfo] = useState(null)

  const getProject = async () => {
    const projectData = await getSubmission(pid)
    console.log(projectData, ' logging the result of getting submission')
    if (projectData.exists) {
      setProjectInfo(!projectData ? null : projectData)
    } else {
      setProjectInfo(null)
    }
  }

  useEffect(() => {
    getProject()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return !!projectInfo ? <Project project={projectInfo} /> : <Loading />
}
