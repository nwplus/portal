import React, { useEffect, useState } from 'react'
import { FormSpacing } from './index'
import { CenteredH1 } from '../Typography'
import { useHackathon } from '../../utility/HackathonProvider'
import { getHackerAppQuestions } from '../../utility/firebase'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const HackathonInfo = () => {
  const { dbHackathonName } = useHackathon()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    const fetchQuestions = async () => {
      const questions = await getHackerAppQuestions(dbHackathonName, 'Welcome')
      setTitle(questions[0].title || '')
      setContent(questions[0].content || '')
    }
    fetchQuestions()
  }, [dbHackathonName])

  return (
    <>
      <FormSpacing>
        <CenteredH1>{title}</CenteredH1>
        <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
      </FormSpacing>
    </>
  )
}

export default HackathonInfo
