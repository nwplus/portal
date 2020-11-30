import React from 'react'
import { Redirect } from 'wouter'
import Part1 from '../../containers/Application/Part1'
import Part2 from '../../containers/Application/Part2'
import Part3 from '../../containers/Application/Part3'
import FormContainer from '../../components/ApplicationForm'

export default ({ part }) => {
  switch (part) {
    case 'part-1':
      return (
        <FormContainer>
          <Part1 />
        </FormContainer>
      )
    case 'part-2':
      return (
        <FormContainer>
          <Part2 />
        </FormContainer>
      )
    case 'part-3':
      return (
        <FormContainer>
          <Part3 />
        </FormContainer>
      )
    default:
      return <Redirect to="/login" />
  }
}
