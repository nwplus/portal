import React, { useRef, useState } from 'react'
import { Button } from '../components/Button'
import { QuestionHeading } from '../components/Typography'

const resumeStyle = {
  display: 'flex',
  alignItems: 'center'
};

const ResumeUploadBtn = () => {
  const [hint, setHint] = useState(null)
  const inputFile = useRef(null);

  const handleClick = () => {
    inputFile.current.click();
  }

  const handleChange = (e) => {
    if (e.target.value) {
      setHint(<span>{e.target.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]}</span>)
    }

    else {
      setHint(<span style={{ color: '#F18383' }}>Please upload your resume</span>)
    }
  }

  var resumeFile = <input ref={inputFile} type='file' hidden='hidden' onChange={handleChange} />
  var button = <Button style={{ marginLeft: '9em' }} color="secondary" onClick={handleClick}>Upload</Button>

  return (
    <div style={resumeStyle}>
      <QuestionHeading>resume</QuestionHeading>
      {resumeFile}
      {button}
      {hint}
    </div>
  )
}

export default ResumeUploadBtn
