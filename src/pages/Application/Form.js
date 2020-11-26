import React from 'react'
import { Redirect } from 'wouter'
import Part1 from '../../containers/Application/Part1'
import Part2 from '../../containers/Application/Part2'
import Part3 from '../../containers/Application/Part3'

export default ({ part }) => {
  switch (part) {
    case 'part-1':
      return <Part1>Tell us about yourself!</Part1>
    case 'part-2':
      return <Part2>Flex your skills</Part2>
    case 'part-3':
      return <Part3>Almost there</Part3>
    default:
      return <Redirect to="/login" />
  }
}
