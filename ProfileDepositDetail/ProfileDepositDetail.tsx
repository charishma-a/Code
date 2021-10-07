import React, { FunctionComponent } from 'react'

import * as sc from './ProfileDepositDetail.styled'

import { CardPrimary } from '../Card'

/* common */
import { Block, H1Purple, H2, Ol, PurpleBorderBox } from '@/common/styled'

/* components */
import { ErrorMessage } from '../ErrorMessage'

/* generated */
import { useDepositQuery } from '@/generated/graphql'

export const donationDetailBaseClass = 'kernls-donation-detail'

export interface DonationDetailProps {
  className?: string
  depositId: string
}

// TODO: disable doubling automatically
export const ProfileDepositDetail: FunctionComponent<DonationDetailProps> = (
  props
) => {
  const { className, depositId } = props
  const classNames = [donationDetailBaseClass, className].join(' ')

  // apollo
  const { data, loading, error } = useDepositQuery({
    variables: { id: depositId },
  })

  if (loading) {
    return <sc.Wrapper className={classNames}>Loading...</sc.Wrapper>
  }

  if (error) {
    return (
      <sc.Wrapper className={classNames}>
        <ErrorMessage error={error} />
      </sc.Wrapper>
    )
  }

  const result = data?.deposit

  if (!result || !result.id) {
    return <sc.Wrapper className={classNames}>No deposit found</sc.Wrapper>
  }

  const { profile, project } = result

  const amountPaid = profile.deposits.reduce((acc, curr) => {
    return acc + curr.amount
  }, 0)

  const projectChampion = project.projectChampions.find(
    (projectChampion) => projectChampion.profile.id === profile.id
  )

  const matchCommitment = projectChampion?.matchCommitment || 0

  const amountRemaining = matchCommitment - amountPaid

  return (
    <sc.Wrapper className={classNames}>
      <Block>
        <CardPrimary>
          <H1Purple>
            {profile.firstName} {profile.lastName}, your payment was accepted!!
            🎉
          </H1Purple>
          <p>
            You’ve officially joined a community of people who’ve decided to
            find meaning by making a positive impact.
          </p>
          <p>That’s no small feat.</p>
          <img src="/assets/images/deposit-success.png" alt="deposit success" />
        </CardPrimary>
      </Block>
      <Block>
        <H2>What happens next</H2>
        <Ol>
          <li>An email receipt from Stripe is on its way to your inbox.</li>
          <li>
            Your payment will be reflected in your bank account in the next 7
            business days.
          </li>
          <li>
            You’ll receive an email with an official tax receipt in the next 3
            weeks.
          </li>
        </Ol>
      </Block>
      {amountRemaining > 0 ? (
        <Block>
          <sc.ToppingUp>
            <H2>Topping up your donation match</H2>
            <p>
              We’ll send you an email alert when 70% of your donation match has
              been used by incoming donors so you have time to top up.
            </p>
          </sc.ToppingUp>
        </Block>
      ) : null}
    </sc.Wrapper>
  )
}
