import React from 'react'
import ReviewCards from '../../components/ApplicationForm/ReviewCards'
import { useHackerApplication } from '../../utility/HackerApplicationContext'

export default () => {
  const { application } = useHackerApplication()
  return (
    <>
      <ReviewCards formInputs={application} />
    </>
  )
}
