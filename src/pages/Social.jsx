import React from 'react'
import SocialC from '../containers/Social'

const Social = ({ params }) => {
  return <SocialC userId={params?.userId} />
}

export default Social
