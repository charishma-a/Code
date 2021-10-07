import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Formik, Form } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, {
  FunctionComponent,
  useEffect,
  useState,
  ReactNode,
  useRef,
} from 'react'

import * as sc from './DonationForm.styled'

import { DonationFormReview } from './DonationFormReview'
import { DonationProject } from './DonationProject'
import { DonationSummary } from './DonationSummary'
import { validateDonationForm } from './utils/validateDonationForm'

/* common */
import {
  Fieldset,
  FinePrint,
  FormGroup,
  FormRow,
  SimpleErrorMessage,
} from '@/common/styled'

/* components */
import { ErrorMessage } from '../ErrorMessage'
import {
  DonationSubmitButton,
  ResidenceContinueButton,
} from '../Form/SubmitButton'
import { FormikDonationAmountInput } from '../Form/Formik/FormikDonationAmountInput'
import { FieldError } from '../Form/FieldError'
import { FormikInput } from '../Form/Formik/FormikInput'
import { FormikCheckbox } from '../Form/Formik/FormikCheckbox'
import { FormikRadio } from '../Form/Formik/FormikRadio'
import { FormikSelect } from '../Form/Formik/FormikSelect'

/* constants */
import { DEFAULT_CURRENCY, PROCESSING_BASE_FEE } from '@/constants/config'

/* data */
import { DONATION_REASONS } from '@/data/donationReasons'
import { Project } from '@/data/projects'
import { PROVINCES } from '@/data/provinces'
import { STATES } from '@/data/states'

/* generated */
import {
  PartialProjectFragment,
  ProjectChampionPresenceOnPage,
  ProjectDocument,
  usePrepareDonationMutation,
} from '@/generated/graphql'

/* utils */
import {
  calculateProcessingFee,
  calculateTotal,
  calculateTip,
  formatAmountForDisplay,
} from '@/utils/stripe-helpers'
import { trackCategory } from '@/utils/analytics'
import { albertEinsteinCollegeMedicine } from '@/data/foundations'
import { getDisplayName } from '@/utils/getDisplayName'
import { LabeledAvatar } from '../libraries/LabeledAvatar'
import { SVG_PROPS_INFO_ERROR } from '@/constants/svgs'
import {
  IMAGE_PROPS_CC_AMERICAN_EXPRESS,
  IMAGE_PROPS_CC_JCB,
  IMAGE_PROPS_CC_MAESTRO,
  IMAGE_PROPS_CC_MASTERCARD,
  IMAGE_PROPS_CC_VISA,
} from '@/constants/images'

const styles = {
  avatar: `
    margin-right: 1rem;
    height: 32px;
    width: 32px;
  `,
  label: '',
  container: `
    align-items: center;
    display: flex;
  `,
}

const donationFormBaseClass = 'kernls-donation-form'

export interface SelectOption {
  label: string
  value: string
}

export interface DonationFormInitialValues {
  cardholderName: string
  coverProcessingFee: boolean
  donationAmount: number
  donorProvince: SelectOption
  donorState: SelectOption
  donationReason: SelectOption
  donationReasonOther: string
  donorFirstName: string
  donorLastName: string
  donorEmail: string
  donorAddress: string
  donorCity: string
  donorCountry: string
  donorPostalCode: string
  donorStateCode: string
  donorZipCode: string
  foundationId: string
  receiveTaxReceiptFromFoundation: boolean
  receiveUpdatesFromFoundation: boolean
  referredId?: string
  tipPercent: SelectOption
  tipPercentOther: number
  useCanadianAddressForm: boolean
}

const CARD_OPTIONS = {
  iconStyle: 'solid' as const,
  style: {
    base: {
      backgroundColor: '#fff',
      color: '#000',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      fontWeight: '400',
      iconColor: '#DADADA',
    },
  },
}

export interface DonationFormProps {
  backLink?: ReactNode
  className?: string
  cmsProjectContent: Project
  foundationId: string
  project: PartialProjectFragment
  referredId?: string
  setShowReview: (value: boolean) => void
  showResidence: boolean
  showReview: boolean
}

const getTipLabel = ({ currency, donationAmount, value }) =>
  `${value}% (${formatAmountForDisplay({
    amount: donationAmount
      ? calculateTip({ donationAmount, tipPercent: parseInt(value, 10) })
      : 0.0,
    currency,
  })})`

export const DonationForm: FunctionComponent<DonationFormProps> = (props) => {
  const {
    backLink,
    className,
    cmsProjectContent,
    foundationId,
    project,
    referredId,
    setShowReview,
    showResidence,
    showReview,
  } = props

  const router = useRouter()

  const classNames = [donationFormBaseClass, className].join(' ')

  // apollo
  const [prepareDonation, { loading, error }] = usePrepareDonationMutation()

  // ref
  const valuesContainer = useRef(null)

  // react state
  const [continueDonation, setContinueDonation] = useState(false)
  const [cardInfoComplete, setCardInfoComplete] = useState(false)
  const [cardErrorMessage, setCardErrorMessage] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('initial')
  const [donation, setDonation] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  // depending on payment status and donation id
  // navigate to succes
  useEffect(() => {
    const onSucceeded = async () => {
      trackCategory({
        eventProps: {
          eventAction: 'Donation Complete',
          eventCategory: 'Donation Flow',
          clickID: 'donation-flow-event-donate-complete',
        },
        extra: valuesContainer.current,
      })
      router.push(`/projects/donation?donationId=${donation.id}`)
    }
    if (donation && paymentStatus === 'succeeded') {
      onSucceeded()
    }
  }, [donation, paymentStatus])

  const initialFoundation = cmsProjectContent.foundations.find(
    (f) => f.id === foundationId
  )

  const projectChampions = project.projectChampions.filter(
    ({ active, anonymous }) => active && !anonymous
  )
  const projectOrganizations = project.projectOrganizations.filter(
    ({ active }) => active
  )

  const initialTargetProjectChampion = projectChampions.find(({ profile }) => {
    return profile.id === referredId
  })
  const initialTargetProjectOrganization = projectOrganizations.find(
    ({ organization, projectOrganizationMembers }) => {
      return (
        organization.id === referredId ||
        projectOrganizationMembers.find(
          ({ organizationMember }) =>
            organizationMember.profile.id === referredId
        )
      )
    }
  )

  // inital form values
  const initialValues: DonationFormInitialValues = {
    cardholderName: '',
    coverProcessingFee: false,
    donationAmount: undefined,
    donationReason: null,
    donationReasonOther: '',
    donorFirstName: '',
    donorLastName: '',
    donorProvince: null,
    donorState: null,
    donorEmail: '',
    donorAddress: '',
    donorCity: '',
    donorCountry: initialFoundation?.countryCode || 'US',
    donorPostalCode: '',
    donorStateCode: null,
    donorZipCode: '',
    foundationId: '',
    receiveTaxReceiptFromFoundation: false,
    receiveUpdatesFromFoundation: false,
    referredId: referredId,
    tipPercent: null,
    tipPercentOther: undefined,
    useCanadianAddressForm: false,
  }

  // stripe
  const stripe = useStripe()
  const elements = useElements()

  // const PaymentStatus = ({ status }: { status: string }) => {
  //   switch (status) {
  //     case 'processing':
  //     case 'requires_payment_method':
  //     case 'requires_confirmation':
  //       return <h2>Processing...</h2>

  //     case 'requires_action':
  //       return <h2>Authenticating...</h2>

  //     case 'succeeded':
  //       return <h2>Payment Succeeded 🥳</h2>

  //     case 'error':
  //       return (
  //         <>
  //           <h2>Error 😭</h2>
  //           <p className="error-message">{errorMessage}</p>
  //         </>
  //       )

  //     default:
  //       return null
  //   }
  // }

  const disabled =
    !['initial', 'succeeded', 'error'].includes(paymentStatus) || !stripe

  const provinceOptions = PROVINCES.map((province) => {
    return {
      label: province.name,
      value: province.code,
    }
  })

  const stateOptions = STATES.map((state) => {
    return {
      label: state.name,
      value: state.code,
    }
  })

  const donationReasonOptions = DONATION_REASONS.map((donationReason) => {
    return {
      label: donationReason.reason,
      value: donationReason.code,
    }
  })

  return (
    <sc.Wrapper className={classNames} showReview={showReview}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, formikHelpers) => {
          const { setSubmitting } = formikHelpers
          setSubmitting(true)
          setPaymentStatus('processing')
          setErrorMessage('')

          // Create a PaymentIntent with the specified amount.
          let clientSecret
          let donation
          let status

          const foundation = cmsProjectContent.foundations.find(
            (f) => f.id === values.foundationId || foundationId
          )
          const currency = foundation ? foundation.currency : DEFAULT_CURRENCY

          const isTaxReceiptManditory =
            currency === 'usd' && values.donationAmount >= 250

          const tipPercent =
            values.tipPercent?.value === 'other'
              ? values.tipPercentOther
              : parseInt(values.tipPercent?.value || '0', 10)

          const generateInput = () => {
            const common = {
              coverProcessingFee: values.coverProcessingFee,
              donorAddress: values.donorAddress,
              donorCity: values.donorCity,
              donorCountryCode: values.donorCountry,
              donationAmount: values.donationAmount,
              donorEmail: values.donorEmail,
              donorFirstName: values.donorFirstName,
              donorLastName: values.donorLastName,
              donorPostalCode: values.donorPostalCode,
              donorProvinceCode: values.donorProvince
                ? values.donorProvince.value
                : '',
              donorStateCode: values.donorState ? values.donorState.value : '',
              donorZipCode: values.donorZipCode,
              foundationId: foundation.id,
              projectId: project.id,
              receiveTaxReceiptFromFoundation:
                isTaxReceiptManditory || values.receiveTaxReceiptFromFoundation,
              receiveUpdatesFromFoundation: values.receiveUpdatesFromFoundation,
              tipPercent,
            }

            const backerOrReason =
              values.referredId && values.referredId !== 'none'
                ? {
                    donationReasonCode: null,
                    donationReasonOther: null,
                    referredId: values.referredId || null,
                  }
                : {
                    donationReasonCode: values.donationReason?.value || '',
                    donationReasonOther: values.donationReasonOther || '',
                    referredId: null,
                  }

            return {
              ...common,
              ...backerOrReason,
            }
          }

          try {
            const prepareDontationInput = generateInput()
            valuesContainer.current = { ...prepareDontationInput }
            trackCategory({
              eventProps: {
                eventAction: 'Donation Button Click',
                eventCategory: 'Donation Flow',
                clickID: 'donation-flow-click-donate',
              },
              extra: prepareDontationInput,
            })
            const response = await prepareDonation({
              refetchQueries: [
                {
                  query: ProjectDocument,
                  variables: { ids: [project.id] },
                },
              ],
              variables: {
                input: prepareDontationInput,
              },
            })
            const result = response?.data?.prepareDonation || {}
            clientSecret = result.clientSecret
            donation = result.donation
            status = result.status
          } catch (e) {
            trackCategory({
              eventProps: {
                eventAction: 'Prepare Donation Failed',
                eventCategory: 'Donation Flow',
                clickID: 'donation-flow-event-donate-prepare-failed',
              },
              extra: {
                errorMessage: e.message || '',
              },
            })
            setPaymentStatus('error')
            setErrorMessage(e.message)
            return null
          }

          // const response = await fetchPostJSON('/api/payment_intents', {
          //   amount: input.customDonation,
          // })
          setPaymentStatus(status)
          setDonation(donation)

          // Get a reference to a mounted CardElement. Elements knows how
          // to find your CardElement because there can only ever be one of
          // each type of element.
          const cardElement = elements!.getElement(CardElement)

          // Use your card Element with other Stripe.js APIs
          const { error, paymentIntent } = await stripe!.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: cardElement!,
                billing_details: {
                  name: values.cardholderName,
                },
              },
            }
          )

          if (error) {
            trackCategory({
              eventProps: {
                eventAction: 'Donation Confirm Payment Failed',
                eventCategory: 'Donation Flow',
                clickID: 'donation-flow-event-donate-confirm-payment-failed',
              },
              extra: {
                errorMessage: error.message || '',
              },
            })
            setPaymentStatus('error')
            setErrorMessage(error.message ?? 'An unknown error occured')
          } else if (paymentIntent) {
            setPaymentStatus(paymentIntent.status)
          }
          setSubmitting(false)
        }} // find submitting logic in DonationForm
        validate={(values) =>
          validateDonationForm(values, cmsProjectContent, foundationId)
        }
      >
        {(formik) => {
          const {
            errors,
            setFieldValue,
            setTouched,
            touched,
            validateForm,
            values,
          } = formik

          const foundation = cmsProjectContent.foundations.find(
            (f) => f.id === values.foundationId || foundationId
          )

          const submitDisabled =
            disabled || !cardInfoComplete || !!cardErrorMessage || loading

          const currency = foundation ? foundation.currency : DEFAULT_CURRENCY

          // Get donation amount and calculate matched amount
          const donationAmount = values.donationAmount || 0

          const targetProjectChampion = projectChampions.find(({ profile }) => {
            return profile.id === values.referredId
          })
          const targetProjectOrganization = projectOrganizations.find(
            ({ organization, projectOrganizationMembers }) => {
              return (
                organization.id === values.referredId ||
                projectOrganizationMembers.find(
                  ({ organizationMember }) =>
                    organizationMember.profile.id === values.referredId
                )
              )
            }
          )

          const targetReferred =
            targetProjectChampion || targetProjectOrganization

          // enable donation matching
          const enableDonationMatching =
            donationAmount > 0 &&
            values.referredId &&
            targetReferred?.openMatchCommitment > 0

          // set how much is being matched
          let matchedAmount = 0
          const openMatchCommitment =
            currency === 'cad'
              ? targetReferred?.openMatchCommitmentCad
              : targetReferred?.openMatchCommitment
          const matchedEntireAmount = openMatchCommitment >= donationAmount
          if (enableDonationMatching) {
            if (openMatchCommitment >= donationAmount) {
              matchedAmount = donationAmount
            } else {
              matchedAmount = openMatchCommitment
            }
          }
          const impactAmount = values.donationAmount + matchedAmount
          const containsOptions =
            projectChampions.length > 0 || projectOrganizations.length > 0

          const renderMatchedDisplay = () => {
            if (enableDonationMatching) {
              let displayName = ''
              if ('organization' in targetReferred) {
                displayName = targetReferred.organization.name
              } else {
                const { presenceOnPage, profile } = targetReferred
                displayName = getDisplayName({
                  firstName: profile.firstName,
                  lastName: profile.lastName,
                  presenceOnPage,
                })
              }
              return (
                <sc.DonationMatchInfo>
                  <div>
                    {displayName} matched your donation for a total impact of{' '}
                    <span className="matchedAmount">
                      {formatAmountForDisplay({
                        amount: impactAmount,
                        round: true,
                      })}
                    </span>
                  </div>
                  {!matchedEntireAmount ? (
                    <div>
                      <small>
                        Matching remaining:{' '}
                        {formatAmountForDisplay({
                          amount: targetReferred.openMatchCommitment,
                          round: true,
                        })}
                      </small>
                    </div>
                  ) : null}
                </sc.DonationMatchInfo>
              )
            }
            return null
          }

          const renderReferredOptions = () => {
            if (
              referredId &&
              (initialTargetProjectChampion || initialTargetProjectOrganization)
            ) {
              return null
            }
            if (containsOptions) {
              const identifyableChampions = projectChampions.filter(
                ({ profile }) => !profile.anonymous
              )
              return (
                <FormGroup>
                  <h2>Who referred you to this project?</h2>
                  <sc.BorderedRadioOptions
                    role="group"
                    aria-labelledby="referredid-radio-group"
                  >
                    {projectOrganizations.map(
                      ({
                        avatar,
                        organization,
                        projectOrganizationMembers,
                        isMemberForward,
                      }) => {
                        const displayName = organization.name
                        const renderedOrganizationOption = (
                          <FormikRadio
                            key={organization.id}
                            name="referredId"
                            onChecked={(value) => {
                              trackCategory({
                                eventProps: {
                                  eventAction: 'Donation Button Click',
                                  eventCategory: 'Donation Flow',
                                  clickID: 'donation-flow-click-referred',
                                  clickText: value,
                                },
                              })
                            }}
                            value={organization.id}
                          >
                            <LabeledAvatar
                              avatar={avatar}
                              avatarStyles={styles.avatar}
                              label={displayName}
                              labelStyles={styles.label}
                              containerStyles={styles.container}
                            />
                          </FormikRadio>
                        )

                        const options =
                          isMemberForward &&
                          projectOrganizationMembers.length > 0
                            ? []
                            : [renderedOrganizationOption]

                        projectOrganizationMembers.forEach(
                          ({ avatar: memberAvatar, organizationMember }) => {
                            const { profile } = organizationMember

                            const memberDisplayName = `${getDisplayName({
                              firstName: profile.firstName,
                              lastName: profile.lastName,
                              presenceOnPage:
                                ProjectChampionPresenceOnPage.FullName,
                            })} (${organization.name})`

                            const renderedOrganizationMemberOption = (
                              <FormikRadio
                                key={organizationMember.id}
                                name="referredId"
                                onChecked={(value) => {
                                  trackCategory({
                                    eventProps: {
                                      eventAction: 'Donation Button Click',
                                      eventCategory: 'Donation Flow',
                                      clickID: 'donation-flow-click-referred',
                                      clickText: value,
                                    },
                                  })
                                }}
                                value={organizationMember.profile.id}
                              >
                                <LabeledAvatar
                                  avatar={memberAvatar}
                                  avatarStyles={styles.avatar}
                                  label={memberDisplayName}
                                  labelStyles={styles.label}
                                  containerStyles={styles.container}
                                />
                              </FormikRadio>
                            )

                            options.push(renderedOrganizationMemberOption)
                          }
                        )

                        return options
                      }
                    )}
                    {identifyableChampions.map(
                      ({ avatar, presenceOnPage, profile }) => {
                        const displayName = getDisplayName({
                          firstName: profile.firstName,
                          lastName: profile.lastName,
                          presenceOnPage,
                        })
                        return (
                          <FormikRadio
                            key={profile.id}
                            name="referredId"
                            onChecked={(value) => {
                              trackCategory({
                                eventProps: {
                                  eventAction: 'Donation Button Click',
                                  eventCategory: 'Donation Flow',
                                  clickID: 'donation-flow-click-referred',
                                  clickText: value,
                                },
                              })
                            }}
                            value={profile.id}
                          >
                            <LabeledAvatar
                              avatar={avatar}
                              avatarStyles={styles.avatar}
                              label={displayName}
                              labelStyles={styles.label}
                              containerStyles={styles.container}
                            />
                          </FormikRadio>
                        )
                      }
                    )}
                    <FormikRadio
                      key="none"
                      name="referredId"
                      className="none"
                      onChecked={() => {
                        trackCategory({
                          eventProps: {
                            eventAction: 'Donation Button Click',
                            eventCategory: 'Donation Flow',
                            clickID: 'donation-flow-click-referred',
                            clickText: 'none',
                          },
                        })
                      }}
                      value="none"
                    >
                      None of the above
                    </FormikRadio>
                  </sc.BorderedRadioOptions>
                </FormGroup>
              )
            }

            return null
          }

          // Calculate processing fee based on fee percent
          const processingFeePercent = values.coverProcessingFee
            ? foundation.processingFee
            : 0

          const processingFee = processingFeePercent
            ? calculateProcessingFee({ donationAmount, processingFeePercent })
            : 0

          // Calculate tip based on tip percent
          const tipPercent =
            values.tipPercent?.value === 'other'
              ? values.tipPercentOther
              : parseInt(values.tipPercent?.value || '0', 10)

          const tip = tipPercent
            ? calculateTip({ donationAmount, tipPercent })
            : 0

          const total = calculateTotal(donationAmount, processingFee, tip)

          const totalTaxDeductable = donationAmount + processingFee

          const isTaxReceiptManditory =
            currency === 'usd' && donationAmount >= 250

          const tipPercentOptions = ['10', '15', '20', 'other'].map((value) => {
            if (value === 'other') {
              return {
                id: value,
                label: 'Other',
                value,
              }
            }
            return {
              id: value,
              label: getTipLabel({ currency, donationAmount, value }),
              value,
            }
          })

          const customError = { name: 'custom-error', message: errorMessage }

          const foundationIsEinstein =
            foundation?.id === albertEinsteinCollegeMedicine.id

          const renderEinsteinForm = () => {
            if (foundationIsEinstein) {
              if (values.useCanadianAddressForm && currency === 'usd') {
                return (
                  <>
                    <FormRow>
                      <FormikInput
                        name="donorAddress"
                        type="text"
                        placeholder="Address*"
                      />
                    </FormRow>
                    <FormRow>
                      <FormikInput
                        name="donorCity"
                        type="text"
                        placeholder="City*"
                      />
                      <FormikInput
                        disabled
                        name="donorCountry"
                        type="text"
                        placeholder="Province*"
                      />
                    </FormRow>
                    <FormRow>
                      <FormikSelect
                        name="donorProvince"
                        options={provinceOptions}
                        onChange={(selectedOption) => {
                          formik.setFieldValue('donorProvince', selectedOption)
                        }}
                      />

                      <FormikInput
                        name="donorPostalCode"
                        type="text"
                        placeholder="Postal Code*"
                      />
                    </FormRow>

                    {(errors.donorAddress && touched.donorAddress) ||
                    (errors.donorCity && touched.donorCity) ||
                    (errors.donorProvince && touched.donorProvince) ||
                    (errors.donorPostalCode && touched.donorPostalCode) ? (
                      <SimpleErrorMessage>
                        <img
                          className="icon"
                          alt={SVG_PROPS_INFO_ERROR.getAlt()}
                          src={SVG_PROPS_INFO_ERROR.getSrc()}
                        />
                        Albert Einstein College of Medicine requires address
                        details for all donors
                      </SimpleErrorMessage>
                    ) : null}
                  </>
                )
              }
              return (
                <>
                  <FormRow>
                    <FormikInput
                      name="donorAddress"
                      type="text"
                      placeholder="Address*"
                    />
                  </FormRow>
                  <FormRow>
                    <FormikInput
                      name="donorCity"
                      type="text"
                      placeholder="City*"
                    />
                    <FormikInput
                      disabled
                      name="donorCountry"
                      type="text"
                      placeholder="Country*"
                    />
                  </FormRow>
                  <FormRow>
                    <FormikSelect
                      name="donorState"
                      options={stateOptions}
                      onChange={(selectedOption) => {
                        formik.setFieldValue('donorState', selectedOption)
                      }}
                    />

                    <FormikInput
                      name="donorZipCode"
                      type="text"
                      placeholder="Zip Code*"
                    />
                  </FormRow>

                  {(errors.donorAddress && touched.donorAddress) ||
                  (errors.donorCity && touched.donorCity) ||
                  (errors.donorState && touched.donorState) ||
                  (errors.donorZipCode && touched.donorZipCode) ? (
                    <SimpleErrorMessage>
                      <img
                        className="icon"
                        alt={SVG_PROPS_INFO_ERROR.getAlt()}
                        src={SVG_PROPS_INFO_ERROR.getSrc()}
                      />
                      Albert Einstein College of Medicine requires address
                      details for all donors
                    </SimpleErrorMessage>
                  ) : null}
                </>
              )
            }
            return null
          }

          return (
            <Form>
              <>
                <DonationFormReview
                  className="kernls-donation__form-review"
                  currency={currency}
                  disabled={disabled}
                  donationAmount={donationAmount}
                  enableDonationMatching={enableDonationMatching}
                  error={error || customError}
                  foundation={foundation}
                  impactAmount={impactAmount}
                  onBackClick={() => setShowReview(false)}
                  onSubmitForm={formik.submitForm}
                  processingFee={processingFee}
                  processingFeePercent={processingFeePercent}
                  projectTitle={cmsProjectContent.title}
                  researchers={cmsProjectContent.researchers}
                  researchInstitute={cmsProjectContent.researchInstitute}
                  tip={tip}
                  tipPercent={tipPercent}
                  total={total}
                  totalTaxDeductable={totalTaxDeductable}
                />
                <sc.Container className="kernls-donation__form-container">
                  <sc.FormSection className="kernls-donation__form-section">
                    {backLink ? (
                      <FormGroup className="kernls-donation__form-section__back-link">
                        {backLink}
                      </FormGroup>
                    ) : null}

                    <Fieldset disabled={disabled} aria-busy={disabled}>
                      {showResidence ? (
                        <FormGroup>
                          <sc.Residence>
                            <h2>Country of Residence</h2>
                            <p>
                              Selecting where you live helps us determine which{' '}
                              <strong>foundation you’ll be donating to</strong>,
                              what we need for your <strong>tax receipt</strong>
                              , and the{' '}
                              <strong>currency of your donation</strong>.
                            </p>

                            <sc.RadioOptions
                              role="group"
                              aria-labelledby="foundationid-radio-group"
                            >
                              {cmsProjectContent.foundations.map(
                                (foundation) => {
                                  return (
                                    <FormikRadio
                                      key={foundation.id}
                                      name="foundationId"
                                      value={foundation.id}
                                    >
                                      {foundation.country}
                                    </FormikRadio>
                                  )
                                }
                              )}
                            </sc.RadioOptions>
                            {continueDonation ? null : (
                              <ResidenceContinueButton
                                disabled={!values.foundationId}
                                onClick={() => {
                                  setContinueDonation(true)
                                  setFieldValue(
                                    'donorCountry',
                                    foundation.countryCode
                                  )
                                }}
                              >
                                Continue
                              </ResidenceContinueButton>
                            )}
                          </sc.Residence>
                        </FormGroup>
                      ) : null}

                      {continueDonation || foundationId ? (
                        <>
                          {renderReferredOptions()}
                          <FormGroup>
                            <h2>Donation Amount</h2>
                            <FormikDonationAmountInput
                              currency={currency}
                              name="donationAmount"
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                const { value } = e.target

                                const amount = parseInt(
                                  value.replace(/\D/, ''),
                                  10
                                )

                                formik.setFieldValue('donationAmount', amount)
                                if (
                                  values.tipPercent &&
                                  values.tipPercent.value !== 'other'
                                ) {
                                  const tipValue =
                                    values.tipPercent.value || '10'

                                  const tipPercent = {
                                    id: tipValue,
                                    label: getTipLabel({
                                      currency,
                                      donationAmount: amount,
                                      value: tipValue,
                                    }),
                                    value: tipValue,
                                  }

                                  formik.setFieldValue('tipPercent', tipPercent)
                                  formik.setFieldValue('donationAmount', amount)
                                } else if (!values.tipPercent) {
                                  const tipValue = '10'

                                  const tipPercent = {
                                    id: tipValue,
                                    label: getTipLabel({
                                      currency,
                                      donationAmount: amount,
                                      value: tipValue,
                                    }),
                                    value: tipValue,
                                  }

                                  formik.setFieldValue('tipPercent', tipPercent)
                                  formik.setFieldValue('donationAmount', amount)
                                }
                              }}
                            />
                            {renderMatchedDisplay()}
                          </FormGroup>

                          <sc.TipContainer>
                            <FormGroup>
                              <h2>Tip Kernls Services</h2>

                              <p>
                                Research teams working towards treatments and
                                cures use Kernls free of charge. We rely on the
                                generosity of donors like you to continue
                                providing this service.
                              </p>
                              <FormRow>
                                <FormikSelect
                                  name="tipPercent"
                                  options={tipPercentOptions}
                                  onChange={(selectedOption) => {
                                    trackCategory({
                                      eventProps: {
                                        eventAction: 'Donation Button Click',
                                        eventCategory: 'Donation Flow',
                                        clickID: 'donation-flow-click-tip',
                                        clickText: selectedOption.value,
                                      },
                                    })
                                    formik.setFieldValue(
                                      'tipPercent',
                                      selectedOption
                                    )
                                  }}
                                />
                                {values.tipPercent?.value === 'other' ? (
                                  <FormikInput
                                    name="tipPercentOther"
                                    type="number"
                                    placeholder="0%"
                                    min={0}
                                    max={100}
                                    step="1"
                                    onChange={(e) => {
                                      const { value } = e.target
                                      if (!value) {
                                        formik.setFieldValue(
                                          'tipPercentOther',
                                          undefined
                                        )
                                      }
                                      const valueInt = parseInt(value, 10)
                                      formik.setFieldValue(
                                        'tipPercentOther',
                                        valueInt
                                      )
                                    }}
                                  />
                                ) : null}
                              </FormRow>
                            </FormGroup>
                          </sc.TipContainer>

                          {foundationIsEinstein ? (
                            <FormGroup>
                              <FormRow>
                                <sc.TaxReceiptBox>
                                  <h2>Do you live in Canada? </h2>
                                  <FormikCheckbox
                                    onChecked={(value) => {
                                      const valueBoolean = Boolean(value)
                                      trackCategory({
                                        eventProps: {
                                          eventAction: 'Donation Button Click',
                                          eventCategory: 'Donation Flow',
                                          clickID:
                                            'donation-flow-click-use-canadian-address-form',
                                          clickText: String(!valueBoolean),
                                        },
                                      })

                                      setFieldValue(
                                        'donorCountry',
                                        !valueBoolean ? 'CA' : 'US'
                                      )
                                    }}
                                    name="useCanadianAddressForm"
                                    style={{ margin: 0 }}
                                  >
                                    Yes, I’m a Canadian resident. This is for
                                    tax receipt purposes.
                                  </FormikCheckbox>
                                </sc.TaxReceiptBox>
                              </FormRow>
                            </FormGroup>
                          ) : null}

                          <FormGroup>
                            <h2>Donor Information</h2>

                            <FormRow>
                              <FormikInput
                                name="donorFirstName"
                                type="text"
                                placeholder="First Name*"
                              />
                              <FormikInput
                                name="donorLastName"
                                type="text"
                                placeholder="Last Name*"
                              />
                            </FormRow>

                            <FormRow>
                              <FormikInput
                                name="donorEmail"
                                type="text"
                                placeholder="Email*"
                              />
                            </FormRow>

                            {renderEinsteinForm()}

                            {isTaxReceiptManditory ? null : (
                              <FormRow>
                                <sc.TaxReceiptBox>
                                  <FormikCheckbox
                                    onChecked={(value) => {
                                      const valueBoolean = Boolean(value)
                                      trackCategory({
                                        eventProps: {
                                          eventAction: 'Donation Button Click',
                                          eventCategory: 'Donation Flow',
                                          clickID:
                                            'donation-flow-click-receive-tax-receipt',
                                          clickText: String(!valueBoolean),
                                        },
                                      })
                                    }}
                                    name="receiveTaxReceiptFromFoundation"
                                    style={{ margin: 0 }}
                                  >
                                    <strong>Tax receipt:</strong>{' '}
                                    {foundation.taxReceiptStatement}
                                  </FormikCheckbox>
                                </sc.TaxReceiptBox>
                              </FormRow>
                            )}

                            {values.receiveTaxReceiptFromFoundation &&
                            currency === 'cad' ? (
                              <>
                                <FormRow>
                                  <FormikInput
                                    name="donorAddress"
                                    type="text"
                                    placeholder="Address*"
                                  />
                                </FormRow>
                                <FormRow>
                                  <FormikInput
                                    name="donorCity"
                                    type="text"
                                    placeholder="City*"
                                  />
                                  <FormikInput
                                    disabled
                                    name="donorCountry"
                                    type="text"
                                    placeholder="Province*"
                                  />
                                </FormRow>
                                <FormRow>
                                  <FormikSelect
                                    name="donorProvince"
                                    options={provinceOptions}
                                    onChange={(selectedOption) => {
                                      formik.setFieldValue(
                                        'donorProvince',
                                        selectedOption
                                      )
                                    }}
                                  />

                                  <FormikInput
                                    name="donorPostalCode"
                                    type="text"
                                    placeholder="Postal Code*"
                                  />
                                </FormRow>
                              </>
                            ) : null}
                          </FormGroup>

                          <FormGroup>
                            <sc.GroupedHeader>
                              <h2>Payment Details</h2>
                              <sc.CreditCardImages>
                                <img
                                  alt={IMAGE_PROPS_CC_VISA.getAlt()}
                                  src={IMAGE_PROPS_CC_VISA.getSrc()}
                                />
                                <img
                                  alt={IMAGE_PROPS_CC_MASTERCARD.getAlt()}
                                  src={IMAGE_PROPS_CC_MASTERCARD.getSrc()}
                                />
                                <img
                                  alt={IMAGE_PROPS_CC_MAESTRO.getAlt()}
                                  src={IMAGE_PROPS_CC_MAESTRO.getSrc()}
                                />
                                <img
                                  alt={IMAGE_PROPS_CC_AMERICAN_EXPRESS.getAlt()}
                                  src={IMAGE_PROPS_CC_AMERICAN_EXPRESS.getSrc()}
                                />
                                <img
                                  alt={IMAGE_PROPS_CC_JCB.getAlt()}
                                  src={IMAGE_PROPS_CC_JCB.getSrc()}
                                />
                              </sc.CreditCardImages>
                            </sc.GroupedHeader>
                            <FormRow>
                              <FormikInput
                                name="cardholderName"
                                type="text"
                                placeholder="Cardhold Name"
                              />
                            </FormRow>
                            <FormRow>
                              <sc.CardElementWrapper>
                                <CardElement
                                  options={CARD_OPTIONS}
                                  onBlur={() => {
                                    if (
                                      !cardInfoComplete &&
                                      !cardErrorMessage
                                    ) {
                                      setCardErrorMessage(
                                        'Please fill out all credit card information'
                                      )
                                    }
                                  }}
                                  onChange={(e) => {
                                    const { complete } = e
                                    setCardInfoComplete(complete)

                                    if (complete) {
                                      setCardErrorMessage('')
                                    } else {
                                      let eMessage = e.error?.message || ''

                                      if (e.error) {
                                        // override error message if any
                                        if (e.error.code === 'incomplete_zip') {
                                          eMessage =
                                            foundation.currency === 'cad'
                                              ? 'Your postal code is incomplete.'
                                              : 'Your zip is incomplete.'
                                        }
                                      }
                                      setCardErrorMessage(eMessage)
                                    }
                                  }}
                                />
                                {cardErrorMessage ? (
                                  <FieldError>{cardErrorMessage}</FieldError>
                                ) : null}
                              </sc.CardElementWrapper>
                            </FormRow>
                            <FormRow>
                              <sc.ApplicationFeeBox>
                                <FormikCheckbox
                                  onChecked={(value) => {
                                    const valueBoolean = Boolean(value)
                                    trackCategory({
                                      eventProps: {
                                        eventAction: 'Donation Button Click',
                                        eventCategory: 'Donation Flow',
                                        clickID: 'donation-flow-click-fees',
                                        clickText: String(!valueBoolean),
                                      },
                                    })
                                  }}
                                  name="coverProcessingFee"
                                  style={{ margin: 0 }}
                                >
                                  I’d like to cover the{' '}
                                  {foundation.processingFee}% +{' '}
                                  {formatAmountForDisplay({
                                    amount: PROCESSING_BASE_FEE,
                                    currency,
                                  })}{' '}
                                  payment processing fee for my donation
                                </FormikCheckbox>
                                <FinePrint>
                                  We securely process payments through Stripe.
                                  Covering this fee ensures it’s not deducted
                                  from your donation and that 100% goes to
                                  supporting the project.
                                </FinePrint>
                              </sc.ApplicationFeeBox>
                            </FormRow>
                          </FormGroup>

                          {values.referredId === 'none' || !containsOptions ? (
                            <>
                              <FormGroup>
                                <h2>Please Share Your Reason for Donating</h2>

                                <FormRow>
                                  <FormikSelect
                                    name="donationReason"
                                    options={donationReasonOptions}
                                    onChange={(selectedOption) => {
                                      trackCategory({
                                        eventProps: {
                                          eventAction: 'Donation Button Click',
                                          eventCategory: 'Donation Flow',
                                          clickID:
                                            'donation-flow-click-donation-reason',
                                          clickText: selectedOption.value,
                                        },
                                      })
                                      setFieldValue(
                                        'donationReason',
                                        selectedOption
                                      )
                                    }}
                                  />
                                </FormRow>
                              </FormGroup>
                              {values.donationReason?.value === 'other' ? (
                                <FormGroup>
                                  <h3>Other reason(s):</h3>

                                  <FormRow>
                                    <FormikInput
                                      name="donationReasonOther"
                                      type="text"
                                      placeholder="Type here"
                                    />
                                  </FormRow>
                                </FormGroup>
                              ) : null}
                            </>
                          ) : null}

                          <FormGroup>
                            <h2>Join Foundation Mailing List</h2>
                            <FormRow>
                              <FormikCheckbox
                                name="receiveUpdatesFromFoundation"
                                onChecked={(value) => {
                                  const valueBoolean = Boolean(value)
                                  trackCategory({
                                    eventProps: {
                                      eventAction: 'Donation Button Click',
                                      eventCategory: 'Donation Flow',
                                      clickID:
                                        'donation-flow-click-foundation-email',
                                      clickText: String(!valueBoolean),
                                    },
                                  })
                                }}
                              >
                                I&apos;d like to be added to the donor list of
                                the <strong>{foundation.name}</strong> so they
                                can contact me about fundraising by email.
                              </FormikCheckbox>
                            </FormRow>
                          </FormGroup>

                          <sc.SummaryAside className="kernls-donation__summary-aside-mobile">
                            <DonationSummary
                              currency={currency}
                              donationAmount={donationAmount}
                              processingFee={processingFee}
                              processingFeePercent={processingFeePercent}
                              tip={tip}
                              total={total}
                            />
                            <DonationProject
                              foundation={foundation}
                              projectTitle={cmsProjectContent.title}
                              researchers={cmsProjectContent.researchers}
                              researchInstitute={
                                cmsProjectContent.researchInstitute
                              }
                            />
                          </sc.SummaryAside>

                          <ErrorMessage error={error} />

                          {customError ? (
                            <SimpleErrorMessage>
                              {customError.message}
                            </SimpleErrorMessage>
                          ) : null}

                          <DonationSubmitButton
                            onClick={async () => {
                              const errors = await validateForm(values)
                              const touchedFields = Object.keys(values).reduce(
                                (acc, curr) => ({ ...acc, [curr]: true }),
                                {}
                              )
                              setTouched(touchedFields)
                              if (Object.keys(errors).length === 0) {
                                setErrorMessage('')
                                setShowReview(true)
                              } else {
                                setErrorMessage(
                                  'Please fill in the required fields above.'
                                )
                              }
                            }}
                            disabled={submitDisabled}
                            type="button"
                          >
                            Review donation
                          </DonationSubmitButton>

                          <sc.Footnote>
                            Your payment information is securely processed
                            through Stripe. By continuing, you agree to Kernls{' '}
                            <Link href="/terms-of-use">
                              <a target="_blank">Terms of Use</a>
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy-policy">
                              <a target="_blank">Privacy Policy</a>
                            </Link>
                            .
                          </sc.Footnote>
                        </>
                      ) : null}
                    </Fieldset>
                  </sc.FormSection>
                  <sc.SummaryAsideWrapper className="kernls-donation__summary-aside-wrapper">
                    <sc.SummaryAside>
                      <DonationSummary
                        currency={currency}
                        donationAmount={donationAmount}
                        processingFee={processingFee}
                        processingFeePercent={processingFeePercent}
                        tip={tip}
                        total={total}
                      />
                      <DonationProject
                        foundation={foundation}
                        projectTitle={cmsProjectContent.title}
                        researchers={cmsProjectContent.researchers}
                        researchInstitute={cmsProjectContent.researchInstitute}
                      />
                    </sc.SummaryAside>
                  </sc.SummaryAsideWrapper>
                </sc.Container>
              </>
            </Form>
          )
        }}
      </Formik>
    </sc.Wrapper>
  )
}
