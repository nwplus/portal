import React from 'react'
import NavigationButtons from '../../components/NavigationButtons'
import VerticalProgressBar from '../../components/VerticalProgressBar'
// form part 2

export default () => {
  return (
    <>
      {/* Progress bar should increase with each filled input */}
      <VerticalProgressBar percent={100} />
      <NavigationButtons
        firstButtonText="Back"
        firstButtonHref="/application/part-2"
        secondButtonText="Next"
        secondButtonHref="/application/review"
        autosaveTime="4:20pm"
      />
    </>
  )
}
