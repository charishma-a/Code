import { FormGroup, FormRow, H2 } from '@/common/styled'
import { useUpdateKernlsProjectOptinMutation } from '@/generated/graphql'
import { trackCategory } from '@/utils/analytics'
import { Formik } from 'formik'
import React, { FunctionComponent } from 'react'
import { FormikCheckbox } from '../Form/Formik/FormikCheckbox'

import * as sc from './DonationDetailSummary.styled'
import { DonationDetailVariant } from './types'

export const donationDetailSummaryBaseClass = 'kernls-donation-detail-summary'

export interface DonationDetailSummaryInitialValues {
  receiveUpdatesFromKernls: boolean
}

const VARIENT_COPY = {
  [DonationDetailVariant.DEFAULT]: {
    kernlsOptinH2: 'See the impact of your contribution',
    kernlsOptinLabel:
      'Yes, I want Kernls to send me exclusive updates on the progress of this science right from the researcher and recommend projects of interest.',
  },
  [DonationDetailVariant.A]: {
    kernlsOptinH2: 'Follow the progress of this research',
    kernlsOptinLabel:
      'Yes, I want Kernls to send me updates on the progress of this project directly from the researcher and recommed other projects of interest.',
  },
}

export interface DonationDetailSummaryProps {
  className?: string
  donorId: string
  donorEmail: string
  projectId: string
  receiveUpdatesFromKernlsInitial?: boolean
  renderNextSteps: () => JSX.Element
  variant: DonationDetailVariant
}

export const DonationDetailSummary: FunctionComponent<DonationDetailSummaryProps> =
  (props) => {
    const {
      className,
      donorId,
      donorEmail,
      projectId,
      receiveUpdatesFromKernlsInitial,
      renderNextSteps,
      variant,
    } = props
    const classNames = [donationDetailSummaryBaseClass, className].join(' ')

    // apollo
    const [updateKernlsProjectOptin, { loading }] =
      useUpdateKernlsProjectOptinMutation()

    // inital form values
    const initialValues: DonationDetailSummaryInitialValues = {
      receiveUpdatesFromKernls: receiveUpdatesFromKernlsInitial,
    }

    const variantCopy =
      VARIENT_COPY[variant] || VARIENT_COPY[DonationDetailVariant.DEFAULT]

    return (
      <sc.Wrapper className={classNames}>
        <sc.NextSteps>
          <p>
            <strong>Here’s What Happens Next</strong>
          </p>

          {renderNextSteps()}

          <p>
            Receipts will be sent to:{' '}
            <a href={`mailto:${donorEmail}`}>{donorEmail}</a>
          </p>
        </sc.NextSteps>

        <Formik
          initialValues={initialValues}
          onSubmit={async (values, formikHelpers) => {
            const { setSubmitting } = formikHelpers
            setSubmitting(true)
            const valueBoolean = Boolean(values.receiveUpdatesFromKernls)
            trackCategory({
              eventProps: {
                eventAction: 'Donation Button Click',
                eventCategory: 'Donation Flow',
                clickID: 'donation-flow-click-kernls-email',
                clickText: String(valueBoolean),
              },
            })

            await updateKernlsProjectOptin({
              variables: {
                input: {
                  id: donorId,
                  projectId,
                  optin: values.receiveUpdatesFromKernls,
                },
              },
            })
            setSubmitting(false)
          }}
        >
          {(formik) => {
            return (
              <FormGroup>
                <FormRow>
                  <sc.KernlsOptinContainer>
                    <H2>{variantCopy.kernlsOptinH2}</H2>
                    <FormikCheckbox
                      disabled={loading}
                      name="receiveUpdatesFromKernls"
                      onChecked={() => {
                        formik.submitForm()
                      }}
                    >
                      {variantCopy.kernlsOptinLabel}
                    </FormikCheckbox>
                  </sc.KernlsOptinContainer>
                </FormRow>
              </FormGroup>
            )
          }}
        </Formik>
      </sc.Wrapper>
    )
  }
