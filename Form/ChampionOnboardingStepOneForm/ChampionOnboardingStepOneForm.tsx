import { Formik, Form } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'
import { trackCategory } from '@/utils/analytics'
import * as sc from './ChampionOnboardingStepOneForm.styled'

import { BaseComponentProps } from '@/common/types'
import {
  ERROR_MESSAGE_FIELD_REQUIRED,
  ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_2,
} from '@/constants/config'
import { Fieldset, FormGroup, FormRow } from '@/common/styled'
import { SubmitButton } from '../SubmitButton'
import {
  FormikSelectProject,
  SelectOption,
} from '../Formik/FormikSelectProject'
import { ErrorMessage } from '@/components/ErrorMessage'
import {
  Profile,
  Project,
  Researcher,
  useSubmitOnboardingStepOneFormMutation,
} from '@/generated/graphql'
import { FormikDonationAmountInput } from '../Formik/FormikDonationAmountInput'
import { useRouter } from 'next/router'
import { runCommonFormCatchHandlers } from '@/utils/runCommonFormCatchHandlers'

const validationSchema = yup.object().shape({
  projectOption: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .required(ERROR_MESSAGE_FIELD_REQUIRED),
  matchCommitment: yup
    .number()
    .min(1000, 'Donation amount should be minumim $1000')
    .required(ERROR_MESSAGE_FIELD_REQUIRED),
})

export interface ChampionOnboardingStepOneFormInitialValues {
  projectOption: SelectOption
  matchCommitment: number
}

interface ChampionOnboardingStepOneFormProps extends BaseComponentProps {
  me: Profile
  projects: Project[]
}

export const ChampionOnboardingStepOneForm: React.FC<ChampionOnboardingStepOneFormProps> =
  ({ classNames, me, projects = [] }) => {
    const router = useRouter()
    const className = [sc.baseClass, classNames].join(' ')

    // apollo
    const [submitOnboardingStepOneForm, { loading, error }] =
      useSubmitOnboardingStepOneFormMutation()

    // react state
    const [errorMessage, setErrorMessage] = useState('')

    const projectOptions: SelectOption[] = projects.map(
      ({ disease, id, projectResearchers, researchInstitution, title }) => {
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
      }
    )

    // inital form values
    const initialProject = me.projectChampion?.project
    const initialValues: ChampionOnboardingStepOneFormInitialValues = {
      projectOption: initialProject?.id
        ? projectOptions.find(({ value }) => value === initialProject.id)
        : null,
      matchCommitment: me.projectChampion?.matchCommitment || 0,
    }

    return (
      <sc.Wrapper className={className}>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, formikHelpers) => {
            const { setFieldError, setSubmitting } = formikHelpers
            setSubmitting(true)
            setErrorMessage('')

            try {
              const updateOnboardingStepInput = {
                slug: 'build-campaign-profile',
              }
              const updateProjectChampionInput = {
                projectId: values.projectOption.value,
                matchCommitment: values.matchCommitment,
              }
              await submitOnboardingStepOneForm({
                variables: {
                  updateProjectChampionInput,
                  updateOnboardingStepInput,
                },
              })

              router.push(ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_2)
              setSubmitting(false)
            } catch (err) {
              runCommonFormCatchHandlers({
                err,
                setErrorMessage,
                setFieldError,
                setSubmitting,
              })
            }
          }}
          validationSchema={validationSchema}
        >
          {(formik) => {
            const { errors } = formik

            const submitDisabled = Object.keys(errors).length > 0 || loading

            return (
              <Form>
                <sc.Container>
                  <Fieldset disabled={loading} aria-busy={loading}>
                    <>
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
                              trackCategory({
                                eventProps: {
                                  eventAction:
                                    'Profile Project Selection Options',
                                  eventCategory: 'Profile Project Selection',
                                  clickID:
                                    'profile-project-selection-options-select',
                                },
                              })
                            }}
                          />
                        </FormRow>
                      </FormGroup>

                      <FormGroup style={{ marginTop: '1rem' }}>
                        <h3>How much are you matching in donations?</h3>
                        <FormRow>
                          <FormikDonationAmountInput
                            currency="usd"
                            name="matchCommitment"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const { value } = e.target

                              const amount = parseInt(
                                value.replace(/\D/, ''),
                                10
                              )

                              formik.setFieldValue('matchCommitment', amount)
                              trackCategory({
                                eventProps: {
                                  eventAction: 'Profile Donation Match Amount',
                                  eventCategory: 'Profile Donation Match',
                                  clickID:
                                    'profile-donation-match-amount-select',
                                },
                              })
                            }}
                          />
                        </FormRow>
                      </FormGroup>

                      <ErrorMessage
                        error={error || { message: errorMessage }}
                      />

                      <SubmitButton
                        disabled={submitDisabled}
                        type="submit"
                        onClick={() => {
                          trackCategory({
                            eventProps: {
                              eventAction: 'Profile Next Build Button',
                              eventCategory: 'Profile Next Build',
                              clickID: 'profile-next-build-button-click',
                            },
                          })
                        }}
                      >
                        {loading
                          ? 'Next: Build my profile...'
                          : 'Next: Build my profile'}
                      </SubmitButton>
                    </>
                  </Fieldset>
                </sc.Container>
              </Form>
            )
          }}
        </Formik>
      </sc.Wrapper>
    )
  }
