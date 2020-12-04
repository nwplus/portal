import React, { useState } from 'react'
import Skills from '../../components/ApplicationForm/Skills'
// form part 2

export default () => {
  const [states, setStates] = useState({
    resume: null,
    github: '',
    linkedin: '',
    portfolio: '',
    longAnswer: '',
  })

  return (
    <>
      <Skills formInputs={states} onChange={setStates} />
    </>
  )
}
