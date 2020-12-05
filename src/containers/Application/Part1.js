import React, { useState } from 'react'
import { useLocation } from 'wouter'
import BasicInfo from '../../components/ApplicationForm/BasicInfo'
import { useHackerApplication } from '../../utility/HackerApplicationContext'
// form part 1
export default () => {
  const { application, updateApplication, forceSave } = useHackerApplication()
  const [, setLocation] = useLocation()
  const updateBasicInfo = change => {
    updateApplication({
      basicInfo: {
        ...change,
      },
    })
  }

  /**
   * Saves and moves to next page
   * TODO I need a button !
   */
  const nextPage = async () => {
    await forceSave()
    setLocation('/application/part-2')
  }

  return (
    <>
      <BasicInfo formInputs={application.basicInfo} onChange={updateBasicInfo} />
    </>
  )
}
