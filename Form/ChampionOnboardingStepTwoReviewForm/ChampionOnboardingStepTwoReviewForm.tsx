import { Formik, Form } from 'formik'
import React, { useState } from 'react'

import * as sc from './ChampionOnboardingStepTwoReviewForm.styled'
import { trackCategory } from '@/utils/analytics'
import { BaseComponentProps } from '@/common/types'
import { ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_2_SUCCESS } from '@/constants/config'
import { Fieldset } from '@/common/styled'
import { SubmitButton } from '../SubmitButton'
import { ErrorMessage } from '@/components/ErrorMessage'
import {
  Profile,
  useSubmitOnboardingStepTwoReviewFormMutation,
} from '@/generated/graphql'
import { useRouter } from 'next/router'
import { runCommonFormCatchHandlers } from '@/utils/runCommonFormCatchHandlers'
import { ChampionCard } from '@/components/ChampionCard'

interface ChampionOnboardingStepTwoReviewFormProps extends BaseComponentProps {
  me: Profile
}

export const ChampionOnboardingStepTwoReviewForm: React.FC<ChampionOnboardingStepTwoReviewFormProps> =
  ({ classNames, me }) => {
    const router = useRouter()
    const className = [sc.baseClass, classNames].join(' ')

    // apollo
    const [submitOnboardingStepTwoReviewForm, { loading, error }] =
      useSubmitOnboardingStepTwoReviewFormMutation()

    // react state
    const [errorMessage, setErrorMessage] = useState('')

    return (
      <sc.Wrapper className={className}>
        <Formik
          initialValues={{}}
          onSubmit={async (_, formikHelpers) => {
            const { setFieldError, setSubmitting } = formikHelpers
            setSubmitting(true)
            setErrorMessage('')

            try {
              const updateOnboardingStepInput = {
                slug: 'tell-3-friends',
              }
              await submitOnboardingStepTwoReviewForm({
                variables: {
                  updateOnboardingStepInput,
                },
              })

              router.push(ROUTE_SECURE_CHAMPION_ONBOARDING_STEP_2_SUCCESS)
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
        >
          {(formik) => {
            const { errors } = formik

            const submitDisabled = Object.keys(errors).length > 0 || loading

            return (
              <Form>
                <sc.Container>
                  <Fieldset disabled={loading} aria-busy={loading}>
                    <>
                      <ChampionCard {...me.projectChampion} profile={me} />

                      <ErrorMessage
                        error={error || { message: errorMessage }}
                      />

                      <SubmitButton
                        disabled={submitDisabled}
                        type="submit"
                        style={{ marginTop: '2rem' }}
                        onClick={() => {
                          trackCategory({
                            eventProps: {
                              eventAction:
                                'Review and Push Live Make profile Live',
                              eventCategory: 'Review and Push Live',
                              clickID: 'review-and-push-live-next-button-click',
                            },
                          })
                        }}
                      >
                        {loading
                          ? 'Next: Make profile live...'
                          : 'Next: Make profile live'}
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
