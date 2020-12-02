import React, { useState } from 'react'
import Skills from '../../components/Skills'
// form part 2

export default () => {
  const [states, setStates] = useState({
    resume: '',
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
