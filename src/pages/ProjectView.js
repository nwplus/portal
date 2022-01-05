import React, { useEffect, useState } from 'react'
import { getSubmission } from '../utility/firebase'
import { Loading } from '../components/HeroPage'

const Project = ({ projectInfo }) => {
  const youtubeImgUrl = getYoutubeThumbnail(projectInfo.youtubeUrl);
}

export default ({ pid }) => {
  const [projectInfo, setProjectInfo] = useState(null);

  const getProject = async () => {
    const projectData = await getSubmission(pid);
    if (projectData.exists) {
      setProjectInfo(!projectData ? null : projectData)
    } else {
      setProjectInfo(null);
    }
  }

  useEffect(() => {
    getProject()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return !!projectInfo ? (
    <Project project={projectInfo}/>
  ) : (
    <Loading />
  )
}
