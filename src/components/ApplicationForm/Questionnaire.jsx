import React from 'react'
import { QuestionHeading, ErrorSpan as Required } from '../Typography'
import { CenteredH1 } from '../Typography'
import { FormSpacing, SubHeading } from './index'
import { useHackerApplication } from '../../utility/HackerApplicationContext'
import {
  SelectAll,
  AppDropdown,
  MultipleChoice,
  ShortAnswer,
  LongAnswer,
} from '../ApplicationQuestions'

// form part 3
const Questionnaire = ({ errors, formInputs, onChange }) => {
  const { basicInfoQuestions, skillsQuestions, questionnaireQuestions } = useHackerApplication()
  const startingIndex = basicInfoQuestions.length + skillsQuestions.length

  const renderQuestion = (question, index) => {
    switch (question.type) {
      case 'Multiple Choice':
        return (
          <MultipleChoice
            refs={null}
            errors={errors}
            formInputs={formInputs}
            onChange={onChange}
            question={question}
          />
        )

      case 'Dropdown':
        return (
          <AppDropdown
            refs={null}
            errors={errors}
            formInputs={formInputs}
            onChange={onChange}
            question={question}
          />
        )

      case 'Select All':
        return (
          <SelectAll
            refs={null}
            errors={errors}
            formInputs={formInputs}
            onChange={onChange}
            question={question}
          />
        )

      case 'Short Answer':
        return (
          <ShortAnswer
            refs={null}
            errors={errors}
            formInputs={formInputs}
            onChange={onChange}
            question={question}
          />
        )

      case 'Long Answer':
        return (
          <LongAnswer
            refs={null}
            errors={errors}
            formInputs={formInputs}
            onChange={onChange}
            question={question}
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
          Almost there...{' '}
          <span role="img" aria-label="Grinning face with star eyes emoji">
            🤩
          </span>
        </CenteredH1>
      </FormSpacing>

      {questionnaireQuestions.map((question, index) => (
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

export default Questionnaire
