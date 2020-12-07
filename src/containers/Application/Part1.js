import React from 'react'
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
   * TODO remove this eslint thing once this is used
   */
  // eslint-disable-next-line no-unused-vars
  const nextPage = async () => {
    await forceSave()
    setLocation('/application/part-2')
  }

  // https://github.com/nwplus/livesite/pull/190/files
  const handleNavigation = href => {
    // await forceSave()  ** add async when forceSave() is used **
    setLocation(href)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <BasicInfo formInputs={application.basicInfo} onChange={updateBasicInfo} />
    </>
  )
}
