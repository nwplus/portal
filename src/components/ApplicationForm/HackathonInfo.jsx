import React, { useEffect, useState } from 'react'
import { FormSpacing } from './index'
import { A, CenteredH1, P } from '../Typography'
import { useHackathon } from '../../utility/HackathonProvider'
import { getHackerAppQuestions } from '../../utility/firebase'
import parse, { domToReact } from 'html-react-parser'

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

  const options = {
    replace: ({ name, attribs, children }) => {
      if (name === 'p') {
        return <P>{domToReact(children, options)}</P>
      }
      if (name === 'a') {
        return (
          <A href={attribs.href} target={attribs.target}>
            {domToReact(children, options)}
          </A>
        )
      }
    },
  }
  return (
    <>
      <FormSpacing>
        <CenteredH1>{title}</CenteredH1>
        {parse(content, options)}
      </FormSpacing>
    </>
  )
}

export default HackathonInfo
