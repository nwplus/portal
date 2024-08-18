import React from 'react'
import { CenteredH1, P, QuestionHeading, ErrorSpan as Required } from '../Typography'
import { FormSpacing, SubHeading } from './index'
import {
  Country,
  School,
  SelectAll,
  AppDropdown,
  MultipleChoice,
  ShortAnswer,
  LongAnswer,
  Portfolio,
} from '../ApplicationQuestions'
import { useHackerApplication } from '../../utility/HackerApplicationContext'

const Skills = ({ refs, errors, formInputs, onChange, role, handleResume }) => {
  const { basicInfoQuestions, skillsQuestions } = useHackerApplication()
  const startingIndex = basicInfoQuestions.length

  const renderQuestion = (question, index) => {
    switch (question.type) {
      case 'Multiple Choice':
        return (
          <MultipleChoice
            refs={refs}
            errors={errors}
            formInputs={formInputs}
            onChange={onChange}
            question={question}
          />
        )

      case 'Dropdown':
        return (
          <AppDropdown
            refs={refs}
            errors={errors}
            formInputs={formInputs}
            onChange={onChange}
            question={question}
          />
        )

      case 'Select All':
        return (
          <SelectAll
            refs={refs}
            errors={errors}
            formInputs={formInputs}
            onChange={onChange}
            question={question}
          />
        )

      case 'Short Answer':
        return (
          <ShortAnswer
            refs={refs}
            errors={errors}
            formInputs={formInputs}
            onChange={onChange}
            question={question}
          />
        )

      case 'Long Answer':
        return (
          <LongAnswer
            refs={refs}
            errors={errors}
            formInputs={formInputs}
            onChange={onChange}
            question={question}
          />
        )

      case 'School':
        return <School refs={refs} errors={errors} formInputs={formInputs} onChange={onChange} />

      case 'Country':
        return <Country refs={refs} errors={errors} formInputs={formInputs} onChange={onChange} />

      case 'Portfolio':
        return (
          <Portfolio
            refs={refs}
            errors={errors}
            formInputs={formInputs}
            onChange={onChange}
            handleResume={handleResume}
          />
        )

      default:
        return null
    }
  }

  return (
    <>
      <FormSpacing>
        <CenteredH1>
          Flex your skills!{' '}
          <span role="img" aria-label="muscle">
            💪
          </span>
        </CenteredH1>
      </FormSpacing>

      {skillsQuestions.map((question, index) => (
        <FormSpacing key={index}>
          <QuestionHeading>{`question ${index + startingIndex + 1}`}</QuestionHeading>
          <SubHeading>
            {question.title}
            {question.required && <Required />}
          </SubHeading>
          {question.description && <P>{question.description}</P>}
          {renderQuestion(question, index)}
        </FormSpacing>
      ))}
    </>
  )
}

export default Skills
