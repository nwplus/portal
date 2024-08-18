import React from 'react'
import { CenteredH1, H2, P, QuestionHeading, ErrorSpan as Required } from '../Typography'
import { FormSpacing, SubHeading } from './index'
import {
  Country,
  School,
  SelectAll,
  AppDropdown,
  MultipleChoice,
  ShortAnswer,
  LongAnswer,
  FullLegalName,
  Major,
} from '../ApplicationQuestions'
import { useHackerApplication } from '../../utility/HackerApplicationContext'

// form part 1
const BasicInfo = ({ refs, errors, formInputs, onChange }) => {
  const { basicInfoQuestions } = useHackerApplication()

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

      case 'Full Legal Name':
        return (
          <FullLegalName refs={refs} errors={errors} formInputs={formInputs} onChange={onChange} />
        )

      case 'Major':
        return <Major refs={refs} errors={errors} formInputs={formInputs} onChange={onChange} />

      default:
        return null
    }
  }

  return (
    <>
      <FormSpacing>
        <CenteredH1>General Questions</CenteredH1>
        <H2>
          First, we’d like to ask a few general questions about you. The information entered here
          does not affect your application as a hacker.
        </H2>
      </FormSpacing>

      {basicInfoQuestions.map((question, index) => (
        <FormSpacing key={index}>
          <QuestionHeading>{`question ${index + 1}`}</QuestionHeading>
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

export default BasicInfo
