import { Formik, Form } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'

import * as sc from './ChampionContactSalesForm.styled'
import { trackCategory } from '@/utils/analytics'
import { BaseComponentProps } from '@/common/types'
import { ERROR_MESSAGE_FIELD_REQUIRED } from '@/constants/config'
import { Paragraph } from '@/components/Paragraph'
import { Fieldset, FormContainer, FormGroup, FormRow } from '@/common/styled'
import { SubmitButton } from '../SubmitButton'
import { FormikInput } from '../Formik/FormikInput'
import {
  FormikSelectProject,
  SelectOption,
} from '../Formik/FormikSelectProject'
import { ErrorMessage } from '@/components/ErrorMessage'
import {
  Researcher,
  UpdateProfileChampionInput,
  useProjectContactSalesQuery,
  useSubmitProjectSupportingMutation,
} from '@/generated/graphql'
import { runCommonFormCatchHandlers } from '@/utils/runCommonFormCatchHandlers'

const validationSchema = yup.object().shape({
  projectOption: yup
    .object()
    .shape({ label: yup.string().required(), value: yup.string().required() })
    .required(ERROR_MESSAGE_FIELD_REQUIRED),
})

export interface ChampionForgotPasswordFormInitialValues {
  projectOption: SelectOption
  supportingIllnesses?: string
}

const NONE_OF_THE_ABOVE_VALUE = 'none-of-the-above'

export const ChampionContactSalesForm: React.FC<BaseComponentProps> = ({
  classNames,
}) => {
  const className = [sc.baseClass, classNames].join(' ')

  // apollo
  const { data } = useProjectContactSalesQuery({
    variables: {
      ids: [],
    },
  })
  const [submitProjectSupporting, { loading, error }] =
    useSubmitProjectSupportingMutation()

  // react state
  const [errorMessage, setErrorMessage] = useState('')
  const [success, setSuccess] = useState(false)

  // inital form values
  const initialValues: ChampionForgotPasswordFormInitialValues = {
    projectOption: null,
    supportingIllnesses: '',
  }

  const projects = data?.projects || []

  const projectOptions: SelectOption[] = projects
    .map(({ disease, id, projectResearchers, researchInstitution, title }) => {
      let leadResearcher:
        | Pick<
            Researcher,
            | 'id'
            | 'title'
            | 'avatarUrl'
            | 'prefix'
            | 'firstName'
            | 'lastName'
            | 'email'
            | 'isLead'
          >
        | undefined
      projectResearchers.forEach(({ researcher }) => {
        if (researcher && researcher.isLead) {
          leadResearcher = researcher
        }
      })
      const researcherFullName =
        leadResearcher && leadResearcher.id
          ? `${leadResearcher.prefix} ${leadResearcher.firstName} ${leadResearcher.lastName}`
          : ''
      const reaseachInstitutionLabel = researchInstitution
        ? researchInstitution.shortName
        : ''
      return {
        disease: disease,
        researcherFullName,
        reaseachInstitutionLabel,
        label: title,
        value: id,
      }
    })
    .concat({
      disease: '',
      researcherFullName: '',
      reaseachInstitutionLabel: '',
      label: 'None of the above',
      value: NONE_OF_THE_ABOVE_VALUE,
    })

  return (
    <sc.Wrapper className={className}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, formikHelpers) => {
          const { setFieldError, setSubmitting } = formikHelpers
          setSubmitting(true)
          setErrorMessage('')
          setSuccess(false)

          try {
            const input: UpdateProfileChampionInput = {
              supportingIllnesses: values.supportingIllnesses,
            }

            if (values.projectOption) {
              if (values.projectOption.value !== NONE_OF_THE_ABOVE_VALUE) {
                trackCategory({
                  eventProps: {
                    eventAction: 'SignUp Project Selection Select',
                    eventCategory: 'SignUp Project Selection ',
                    clickID: 'signup-project-selection-options-selected',
                  },
                })
                input.supportingProjectId = values.projectOption.value
              } else {
                trackCategory({
                  eventProps: {
                    eventAction: 'SignUp Project Selection None',
                    eventCategory: 'SignUp Project Selection',
                    clickID: 'signup-project-selection-none-selected',
                  },
                })
                input.supportingProjectId = null
              }
            }

            await submitProjectSupporting({
              variables: {
                input,
              },
            })
            setSubmitting(false)
          } catch (err) {
            runCommonFormCatchHandlers({
              err,
              setErrorMessage,
              setFieldError,
              setSubmitting,
            })
          }
          setSuccess(true)
        }}
        validationSchema={validationSchema}
      >
        {(formik) => {
          const { errors, values } = formik

          const submitDisabled = Object.keys(errors).length > 0 || loading

          if (success) {
            trackCategory({
              eventProps: {
                eventAction: 'SignUp Project Selection Success',
                eventCategory: 'SignUp Project Selection ',
                clickID: 'signup-project-selection-success',
              },
            })
            return (
              <sc.SuccessContainer>
                <h2>Thanks for submitting!</h2>
                <Paragraph>
                  The Kernls Team will get in touch with you shortly.
                </Paragraph>
              </sc.SuccessContainer>
            )
          }
          trackCategory({
            eventProps: {
              eventAction: 'SignUp Project Selection Failure',
              eventCategory: 'SignUp Project Selection ',
              clickID: 'signup-project-selection-failure',
            },
          })
          return (
            <Form>
              <FormContainer>
                <Fieldset disabled={loading} aria-busy={loading}>
                  <>
                    <h2>Project Selection</h2>
                    <FormGroup style={{ marginTop: '1rem' }}>
                      <h3>Which project are you supporting?</h3>
                      <FormRow>
                        <FormikSelectProject
                          name="projectOption"
                          options={projectOptions}
                          onChange={(selectedOption) => {
                            formik.setFieldValue(
                              'projectOption',
                              selectedOption
                            )
                          }}
                        />
                      </FormRow>
                    </FormGroup>

                    {values.projectOption?.value === NONE_OF_THE_ABOVE_VALUE ? (
                      <FormGroup style={{ marginTop: '1rem' }}>
                        <h3>
                          What illness(es) do you want to support? (if more than
                          one, please separate using comma)
                        </h3>
                        <FormRow>
                          <FormikInput
                            name="supportingIllnesses"
                            type="text"
                            placeholder="Type here"
                          />
                        </FormRow>
                      </FormGroup>
                    ) : null}

                    <ErrorMessage error={error || { message: errorMessage }} />

                    <SubmitButton
                      disabled={submitDisabled}
                      type="submit"
                      onClick={() => {
                        trackCategory({
                          eventProps: {
                            eventAction: 'SignUp Project Selection Submit',
                            eventCategory: 'SignUp Project Selection',
                            clickID:
                              'signup-project-selection-submit-button-click',
                          },
                        })
                      }}
                    >
                      {loading ? 'Submitting...' : 'Submit'}
                    </SubmitButton>
                  </>
                </Fieldset>
              </FormContainer>
            </Form>
          )
        }}
      </Formik>
    </sc.Wrapper>
  )
}
