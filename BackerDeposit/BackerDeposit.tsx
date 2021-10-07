import React, { useCallback, useEffect, useState } from 'react'
import { PlaidLinkOptions } from 'react-plaid-link'

import * as sc from './BackerDeposit.styled'

import { Step } from './types'
import { BackerDepositStepOne } from './BackerDepositStepOne'
import { BackerDepositStepTwo } from './BackerDepositStepTwo'
import { BackerDepositStepsSummary } from './BackerDepositStepsSummary'

/* generated */
import {
  useAccessCodeQuery,
  useLinkBankAccountMutation,
} from '@/generated/graphql'
import { FlexContainer, H2 } from '@/common/styled'
import { hotspotPage, identify, trackCategory } from '@/utils/analytics'
import { TRACK_EVENT_CATEGORY } from './constants'

const steps: Step[] = [
  {
    breadcrumbTitle: 'CONNECT VIA PLAID',
    description:
      'We use a private and secure payment platform called Plaid to connect you to your bank account.',
    id: 1,
    title: 'Connect via Plaid to your bank account',
  },
  {
    breadcrumbTitle: 'PAY VIA STRIPE',
    description:
      'Review your transaction before confirming payment. We use Stripe to securely process your payment.',
    id: 2,
    title: 'Pay via Stripe',
  },
]

export const donorVerifyBaseClass = 'kernls-donor-verify'

interface BackerDepositProps {
  accessCode: string
  className?: string
  profileId: string
}

export const BackerDeposit: React.FC<BackerDepositProps> = ({
  accessCode,
  className,
  profileId,
}) => {
  const [step, setStep] = useState(1)
  const [errorMessage, setErrorMessage] = useState('')
  const classNames = [donorVerifyBaseClass, className].join(' ')
  const [linkBankAccountError, setLinkBankAccountError] = useState('')
  const [linkBankAccountProccessing, setLinkBankAccountProcessing] =
    useState(false)

  // move to top of screen
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  const [linkBankAccount] = useLinkBankAccountMutation()

  const { data, loading, error } = useAccessCodeQuery({
    variables: {
      code: accessCode,
      profileId,
    },
  })
  const resultProfileId = data?.accessCode?.profile?.id
  const resultProfileEmail = data?.accessCode?.profile?.email

  useEffect(() => {
    if (resultProfileId) {
      identify({
        traits: {
          email: resultProfileEmail,
        },
        userId: profileId,
      })
      // workaround to trigger identify
      hotspotPage()
    }
  }, [resultProfileId, resultProfileEmail])

  const onSuccess = useCallback(async (publicToken, metadata) => {
    setLinkBankAccountError('')
    setLinkBankAccountProcessing(true)

    trackCategory({
      eventProps: {
        eventCategory: TRACK_EVENT_CATEGORY,
        eventAction: 'Connect bank account CTA success',
        clickID: 'backer-ach-deposit-result-connect-bank-success',
      },
    })

    let linkBankAccountData = null
    let linkBankAccountErrors = null
    // send token to server
    const res = await linkBankAccount({
      variables: {
        input: {
          code: accessCode,
          publicToken,
          account: metadata.account,
          institution: metadata.institution,
          profileId,
        },
      },
    })
    linkBankAccountData = res.data
    linkBankAccountErrors = res.errors

    if (linkBankAccountData?.linkBankAccount) {
      setStep(2)
    } else {
      // show error
      setLinkBankAccountError(
        linkBankAccountErrors
          ? linkBankAccountErrors[0]?.message
          : 'Something went wrong'
      )
    }
    setLinkBankAccountProcessing(false)
  }, [])

  if (loading) {
    return null
  }

  if (error || errorMessage) {
    return (
      <sc.Wrapper className={classNames}>
        <sc.Container>
          <H2>Oops, something went wrong.</H2>
          <p>
            Please contact{' '}
            <a href="mailto:support@kernls.com">support@kernls.com</a> to
            continue your deposit.
          </p>
        </sc.Container>
      </sc.Wrapper>
    )
  }

  const accessCodeResult = data?.accessCode

  if (!accessCodeResult) {
    return <div>Sorry this page is not available</div>
  }

  const { accessCodeData, profile } = accessCodeResult
  const {
    amount = 0,
    currency,
    matchCommitment = 0,
    foundation,
  } = accessCodeData
  const isReturingChampion = !!profile.customerId

  const currentStep = steps.find((s) => s.id === step)

  const plaidLinkOptions: Omit<PlaidLinkOptions, 'token'> = {
    onExit: (error) => {
      if (error) {
        setLinkBankAccountError(error.display_message)
      }
      trackCategory({
        eventProps: {
          eventCategory: TRACK_EVENT_CATEGORY,
          eventAction: 'Connect bank account CTA error',
          clickID: 'backer-ach-deposit-result-connect-bank-error',
        },
        extra: {
          error,
          isReturingChampion,
        },
      })
      setLinkBankAccountProcessing(false)
    },
    onSuccess,
  }

  const {
    projectResearchers = [],
    researchInstitution,
    title,
  } = accessCodeData.project || {}

  const getResearcherName = () => {
    let researcher = null
    projectResearchers.forEach((pr) => {
      if (pr.researcher && pr.researcher.isLead) {
        researcher = pr.researcher
      }
    })

    if (researcher) {
      return `${researcher.prefix} ${researcher.firstName} ${researcher.lastName}`
    }
    return ''
  }
  const researcherName = getResearcherName()

  const amountRemaining = amount

  const renderStep = () => {
    if (step === 2) {
      return (
        <BackerDepositStepTwo
          accessCode={accessCode}
          amountRemaining={amountRemaining}
          currency={currency}
          matchCommitment={matchCommitment}
          profileId={accessCodeResult.profile.id}
          setErrorMessage={(errorMessage: string) => {
            setErrorMessage(errorMessage)
          }}
        />
      )
    }

    return (
      <BackerDepositStepOne
        accessCode={accessCode}
        amountRemaining={amountRemaining}
        currency={currency}
        isReturingChampion={isReturingChampion}
        linkBankAccountError={linkBankAccountError}
        linkBankAccountProccessing={linkBankAccountProccessing}
        matchCommitment={matchCommitment}
        partnerFoundation={foundation.name}
        plaidLinkOptions={plaidLinkOptions}
        profileId={accessCodeResult.profile.id}
        profileFirstName={profile.firstName}
        profileLastName={profile.lastName}
        projectName={title}
        researchInstitutionName={researchInstitution?.name}
        researcherName={researcherName}
        setLinkBankAccountProcessing={(proccessing: boolean) => {
          setLinkBankAccountProcessing(proccessing)
        }}
        setStep={(step: number) => {
          setStep(step)
        }}
        universityName={researchInstitution?.university}
      />
    )
  }

  return (
    <sc.Wrapper>
      <FlexContainer>
        <sc.StepWrapper>
          <sc.StepsBreadcumb>
            Step {step} OF {steps.length}: {currentStep.breadcrumbTitle}
          </sc.StepsBreadcumb>
          {renderStep()}
        </sc.StepWrapper>
        <sc.SummaryWrapper>
          <BackerDepositStepsSummary
            currentStepId={currentStep.id}
            steps={steps}
          />
        </sc.SummaryWrapper>
      </FlexContainer>
    </sc.Wrapper>
  )
}
