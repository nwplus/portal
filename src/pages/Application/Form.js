import React from 'react'
import { Redirect } from 'wouter'
import Part0 from '../../containers/Application/Part0'
import Part1 from '../../containers/Application/Part1'
import Part2 from '../../containers/Application/Part2'
import Part3 from '../../containers/Application/Part3'

export default ({ part }) => {
  switch (part) {
    case 'part-0':
      return <Part0 />
    case 'part-1':
      return <Part1 />
    case 'part-2':
      return <Part2 />
    case 'part-3':
      return <Part3 />
    default:
      return <Redirect to="/login" />
  }
}
