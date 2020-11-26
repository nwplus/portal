import React from 'react'
import { useLocation } from 'wouter'
import Part1 from '../../containers/Application/Part1'
import Part2 from '../../containers/Application/Part2'
import Part3 from '../../containers/Application/Part3'

export default ({ part }) => {
  const [location, setLocation] = useLocation()

  switch (part) {
    case 'part-1':
      return <Part1>Tell us about yourself!</Part1>
    case 'part-2':
      return <Part2>Flex your skills</Part2>
    case 'part-3':
      return <Part3>Almost there</Part3>
    default:
      return (
        <div>
          <h1>Uh-oh, we can't seem to find what you're looking for</h1>
          <button onClick={() => setLocation('/login')}>Take me back to the login page</button>
        </div>
      )
  }
}
