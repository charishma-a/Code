import styled from 'styled-components'
import Link from 'next/link'

import { FundingGoalProgress } from './FundingGoalProgress'
import { DonationText } from './styles'

import { DonateButtonLink, ShareButton } from '../Form/SubmitButton'

import { FAQS_URL } from '@/constants/config'
import { Project } from '@/data/projects'

/* utils */
import { device } from '@/utils/device'

import { DoublingChampions } from '../DoublingChampions'
import {
  PartialProjectChampionFragment,
  PartialProjectOrganizationFragment,
} from '@/generated/graphql'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const DonationContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: 0.5rem;

  @media ${device.laptop} {
    padding: 0.75rem;
  }
`

const ButtonContainer = styled.div`
  margin-top: 0.5rem;
`

const FooterContainer = styled.div`
  visibility: hidden;
  height: 0;
  @media ${device.tablet} {
    visibility: visible;
    height: auto;
    padding-top: 0.5rem;
  }
`
const FooterText = styled(DonationText)`
  padding-top: 0;
`

const BOTTOMTEXT =
  'Kernls is a platform where you can access and donate directly to scientific research projects from top scientists at world-renown institutions.'

const baseClass = 'kernls-donation-detail-summary'

export interface DonationSectionProps {
  cmsProjectContent: Project
  donateHref: string
  projectChampions?: PartialProjectChampionFragment[]
  projectOrganizations?: PartialProjectOrganizationFragment[]
  id: string
  isMobile?: boolean
  moneyRaised?: number
  onClickDonate: () => void
  onClickShare: () => void
  referredId?: string
}

export const DonationSection: React.FC<DonationSectionProps> = ({
  cmsProjectContent,
  donateHref,
  referredId,
  projectChampions = [],
  projectOrganizations = [],
  isMobile,
  moneyRaised = 0,
  onClickDonate,
  onClickShare,
}) => {
  if (!cmsProjectContent) {
    return null
  }
  const {
    active,
    goals,
    goalType,
    goalTypeTooltipBody,
    goalTypeTooltipTitle,
    slug,
  } = cmsProjectContent

  return (
    <Container className={baseClass}>
      <DonationContainer>
        <FundingGoalProgress
          goals={goals}
          goalType={goalType}
          goalTypeTooltipBody={goalTypeTooltipBody}
          goalTypeTooltipTitle={goalTypeTooltipTitle}
          moneyRaised={moneyRaised}
          projectSlug={slug}
        />
        <div style={{ marginTop: '1rem' }}>
          <DoublingChampions
            key={referredId || 'doubling-champions'}
            projectChampions={projectChampions}
            projectOrganizations={projectOrganizations}
            referredId={referredId}
          />
        </div>
        {!isMobile ? (
          <ButtonContainer>
            {active ? (
              <Link href={donateHref} passHref>
                <DonateButtonLink onClick={onClickDonate}>
                  Donate
                </DonateButtonLink>
              </Link>
            ) : null}
            <ShareButton onClick={onClickShare}>Share</ShareButton>
          </ButtonContainer>
        ) : null}
        <FooterContainer>
          <DonationText>Kernls helps fund medical science</DonationText>
          <FooterText color="#979797">
            {BOTTOMTEXT} <a href={FAQS_URL}>Read our FAQ</a>
          </FooterText>
        </FooterContainer>
      </DonationContainer>
    </Container>
  )
}
