import ResumeUploadBtn from '../ResumeUploadBtn'
import { TextInput } from '../Input'
import { ErrorMessage, P, QuestionHeading, ErrorSpan as Required } from '../Typography'
import styled from 'styled-components'

const QuestionForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  & > div {
    display: flex;
    align-items: center;
    width: 100%;
    & > *:nth-child(1) {
      flex-grow: 1;
      margin: 0;
      width: 30%;
    }
    & > *:nth-child(2) {
      flex-grow: 1;
      margin: 0;
      width: 60%;
      & > div {
        margin-left: 0;
        padding-right: 0.5em;
      }
    }
  }
  ${p => p.theme.mediaQueries.tabletLarge} {
    & > div {
      flex-direction: column;
      align-items: stretch;
      & > * {
        width: 100%;
        display: block;
        margin: 0.5em 0;
      }
      & > *:nth-child(1),
      & > *:nth-child(2) {
        width: 100%;
      }
    }
  }
`

const QuestionRow = styled(QuestionHeading)`
  padding-right: 4em;
  ${p => p.theme.mediaQueries.xs} {
    padding-right: 1em;
  }
`

const FormRow = ({ fieldValue, required, children }) => (
  <div>
    <QuestionRow>
      {fieldValue}
      {required && <Required />}
    </QuestionRow>
    <div>{children}</div>
  </div>
)

const Portfolio = ({ refs, errors, formInputs, onChange, question }) => {
  return (
    <QuestionForm>
      <FormRow fieldValue="resume" required>
        <ResumeUploadBtn
          onChange={e => {
            if (e.target.files[0]) {
              handleResume(e.target.files[0])
            }
          }}
          hint={formInputs.resume}
          customRef={refs['resumeRef']}
        />
        {errors?.resume && <ErrorMessage>{errors?.resume}</ErrorMessage>}
      </FormRow>
      <P>Maximum file size of 2MB</P>
      <FormRow fieldValue="GitHub/BitBucket/GitLab">
        <TextInput
          placeholder="Optional"
          size="large"
          value={formInputs.github}
          invalid={!!errors.github}
          errorMsg={errors.github}
          onChange={e =>
            onChange({
              github: e.target.value,
            })
          }
        />
      </FormRow>
      <FormRow fieldValue="Personal website/portfolio link">
        <TextInput
          placeholder="Optional"
          size="large"
          value={formInputs.portfolio}
          invalid={!!errors.portfolio}
          errorMsg={errors.portfolio}
          onChange={e =>
            onChange({
              portfolio: e.target.value,
            })
          }
          customRef={refs['portfolioRef']}
        />
      </FormRow>

      <FormRow fieldValue="linkedin">
        <TextInput
          placeholder="Optional"
          size="large"
          value={formInputs.linkedin}
          invalid={!!errors.linkedin}
          errorMsg={errors.linkedin}
          onChange={e =>
            onChange({
              linkedin: e.target.value,
            })
          }
        />
      </FormRow>
    </QuestionForm>
  )
}

export default Portfolio
