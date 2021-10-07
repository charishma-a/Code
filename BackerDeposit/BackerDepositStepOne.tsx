import React from 'react'
import { PlaidLinkOptions } from 'react-plaid-link'

import * as sc from './BackerDepositStepOne.styled'
import { renderSections } from './utils'

import { PlaidLink, PlaidLinkButton } from '../PlaidLink'

/* common */
import { H1Purple, H2 } from '@/common/styled'

/* utils */
import { formatAmountForDisplay } from '@/utils/stripe-helpers'
import { SubmitButton } from '../Form/SubmitButton'
import { trackCategory } from '@/utils/analytics'
import { TRACK_EVENT_CATEGORY } from './constants'

interface BackerDepositStepOneProps {
  accessCode: string
  amountRemaining: number
  currency: string
  isReturingChampion?: boolean
  linkBankAccountError?: string
  linkBankAccountProccessing?: boolean
  matchCommitment: number
  partnerFoundation: string
  plaidLinkOptions: Omit<PlaidLinkOptions, 'token'>
  profileId: string
  profileFirstName: string
  profileLastName: string
  projectName: string
  researchInstitutionName: string
  researcherName: string
  setLinkBankAccountProcessing: (proccessing: boolean) => void
  setStep: (step: number) => void
  universityName: string
}

export const BackerDepositStepOne: React.FC<BackerDepositStepOneProps> = ({
  accessCode,
  amountRemaining = 0,
  currency,
  isReturingChampion,
  linkBankAccountError,
  linkBankAccountProccessing,
  matchCommitment,
  partnerFoundation,
  plaidLinkOptions,
  profileId,
  profileFirstName,
  profileLastName,
  projectName,
  researchInstitutionName,
  researcherName,
  setLinkBankAccountProcessing,
  setStep,
  universityName,
}) => {
  const profileName = `${profileFirstName} ${profileLastName}`

  return (
    <sc.Wrapper>
      <H1Purple>Hello {profileName}!</H1Purple>

      {isReturingChampion ? (
        <>
          <p>It’s time to top-up your donation match.</p>
          <p>
            You can easily make your next payment using the bank account you
            connected to when you made your first payment.
          </p>
          <p>
            You can connect to a different bank account{' '}
            <PlaidLink
              accessCode={accessCode}
              linkBankAccountError={linkBankAccountError}
              options={plaidLinkOptions}
              profileId={profileId}
              setLinkBankAccountProcessing={setLinkBankAccountProcessing}
            >
              here
            </PlaidLink>
            .
          </p>
        </>
      ) : (
        <>
          <p>You’ve made it to the next step in the onboarding process.</p>
          <p>
            Remember, this link expires after 24 hours, so grab a coffee and
            your online banking details and prepare yourself for a painless
            payment experience.
          </p>
          <p>Please review the details below.</p>
        </>
      )}

      <div>
        <H2>Champion Details</H2>
        {renderSections({
          sections: [
            { property: 'First Name', value: profileFirstName },
            { property: 'Last Name', value: profileLastName },
          ],
        })}
      </div>

      <div>
        <H2>Project Details</H2>
        {renderSections({
          sections: [
            { property: 'Project Name', value: projectName },
            { property: 'Research Institute', value: researchInstitutionName },
            { property: 'University', value: universityName },
            { property: 'Partner Foundation', value: partnerFoundation },
            { property: 'Researcher Name', value: researcherName },
          ],
        })}
      </div>

      <div>
        <H2>Donation Match Details</H2>
        {renderSections({
          sections: [
            {
              property: 'Match Commitment Amount',
              value: formatAmountForDisplay({
                amount: matchCommitment,
                currency,
              }),
            },
            {
              property: 'Amount Owing',
              value: formatAmountForDisplay({
                amount: amountRemaining,
                currency,
              }),
            },
          ],
        })}
      </div>

      {isReturingChampion ? (
        <SubmitButton
          onClick={() => {
            trackCategory({
              eventProps: {
                eventCategory: TRACK_EVENT_CATEGORY,
                eventAction: 'Connect bank account CTA',
                clickID: 'backer-ach-deposit-click-connect-bank',
              },
              extra: {
                isReturingChampion,
              },
            })
            setStep(2)
          }}
        >
          Continue to payment
        </SubmitButton>
      ) : (
        <PlaidLinkButton
          accessCode={accessCode}
          linkBankAccountError={linkBankAccountError}
          linkBankAccountProccessing={linkBankAccountProccessing}
          options={plaidLinkOptions}
          profileId={profileId}
          setLinkBankAccountProcessing={setLinkBankAccountProcessing}
          onClick={() => {
            trackCategory({
              eventProps: {
                eventCategory: TRACK_EVENT_CATEGORY,
                eventAction: 'Connect bank account CTA',
                clickID: 'backer-ach-deposit-click-connect-bank',
              },
              extra: {
                isReturingChampion,
              },
            })
          }}
        >
          {linkBankAccountProccessing
            ? 'Connecting...'
            : 'Connect to my bank account'}
        </PlaidLinkButton>
      )}
      <p>
        We use a private and secure platform called Plaid to connect you to your
        bank account.
      </p>
    </sc.Wrapper>
  )
}
