import React, { FunctionComponent, useState } from 'react'

import * as sc from './ProjectDetail.styled'

import { ProjectMain } from './ProjectMain'
import { TabContent } from './TabContent'

import { ShareModal } from '../ShareModal'

/* constants */
import { projectTabs } from '@/constants/projectTabs/tabs'

/* components */
import { DonationSection } from '../DonationSection'

/* data */
import { Project } from '@/data/projects'
import { otherProjects } from '@/data/otherProjectsMap'

/* utils */
import { trackCategory } from '@/utils/analytics'
import { size } from '@/utils/device'
import { useWindowSize } from '@/hooks/useWindowSize'
import { DonateButtonLink, ShareButton } from '../Form/SubmitButton'
import { ContentContainer, ContentFullContainer, H2 } from '@/common/styled'
import { useProjectQuery } from '@/generated/graphql'
import { ExploreProjects } from './ExploreProjects'
import { ScrollableCTAsContainer } from './ScrollableCTAsContainer'
import { ProjectChampionsAside } from './ProjectChampionsAside'
import Link from 'next/link'

export interface ProjectDetailProps {
  idPath: string
  cmsProjectContent: Project
  referredId?: string
}

export const ProjectDetail: FunctionComponent<ProjectDetailProps> = ({
  referredId,
  idPath,
  cmsProjectContent,
}) => {
  const [openShare, setOpenShare] = useState(false)
  const initialCurrentTabState = [
    'optimize-cell-activity-non-hodgkins',
    'untangling-postpartum-depression',
    'slow-pancreatic-cancer-growth',
    'alzheimers-disease-detection',
  ].includes(cmsProjectContent.slug)
    ? 'Project'
    : 'Summary'
  const [currentTab, setCurrentTab] = useState(initialCurrentTabState)

  const { active, id } = cmsProjectContent

  const exploreProjectsIds = otherProjects[id]

  const { loading, data, error } = useProjectQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      ids: [id, ...exploreProjectsIds],
    },
  })
  const { width } = useWindowSize()

  if (error) {
    return (
      <sc.Wrapper>
        <ContentContainer>
          <H2>Oops, something went wrong.</H2>
          <p>
            Please contact{' '}
            <a href="mailto:support@kernls.com">support@kernls.com</a>.
          </p>
        </ContentContainer>
      </sc.Wrapper>
    )
  }

  const projects = data?.projects || []
  const project = projects.find(({ id }) => id === cmsProjectContent.id)
  const {
    moneyRaised = 0,
    projectChampions = [],
    projectOrganizations = [],
  } = project || {}

  const tablet = parseInt(size.tablet.replace('px', ''), 10)
  const laptop = parseInt(size.laptop.replace('px', ''), 10)
  const isMobile = width < tablet
  const isTabletOrMobile = width < laptop

  const donateHref = `/projects/${idPath || id}/donate`

  const onClickDonate = () => {
    trackCategory({
      eventProps: {
        eventAction: 'Donate',
        clickID: 'project-page-click-donate',
        clickText: 'Donate',
        eventCategory: 'Project Page CTA',
      },
    })
  }

  const onClickShare = () => {
    trackCategory({
      eventProps: {
        eventAction: 'Share Project',
        clickID: 'project-page-click-share',
        clickText: 'Share Project',
        eventCategory: 'Project Page CTA',
      },
    })
    setOpenShare(true)
  }

  const onCloseModal = () => {
    trackCategory({
      eventProps: {
        eventAction: 'Project Share Close',
        eventCategory: 'Project Share',
        clickID: 'project-share-close',
      },
    })
    setOpenShare(false)
  }

  const onClickTab = (tabName: string): void => {
    setCurrentTab(tabName)
  }
  const tabs = projectTabs[cmsProjectContent.slug]

  const trackProjectTabs = ({ eventProps, ...restProps }) => {
    trackCategory({
      eventProps: {
        eventAction: 'Project Tab Click',
        eventCategory: 'Project Page Tabs',
        ...eventProps,
      },
      ...restProps,
    })
  }

  const tab = tabs.find(({ tabName }) => currentTab === tabName)

  const renderTabs = () => (
    <sc.Tabs id="tabs">
      {tabs.map(({ clickID, tabName }) => {
        const onClickHandler = () => {
          trackProjectTabs({
            eventProps: {
              clickID,
              clickText: tabName,
            },
          })
          onClickTab(tabName)
        }

        return (
          <sc.TabButton
            key={tabName}
            currentTab={currentTab === tabName}
            onClick={onClickHandler}
            id={tabName.toLowerCase() + `-tab`}
            href={`#${tabName.toLowerCase()}-tab`}
          >
            {tabName}
          </sc.TabButton>
        )
      })}
    </sc.Tabs>
  )

  const renderedChampionSection = (
    <ProjectChampionsAside
      loading={loading}
      projectChampions={projectChampions}
      projectOrganizations={projectOrganizations}
      referredId={referredId}
    />
  )

  const exploreProjects = projects.filter(({ id }) =>
    exploreProjectsIds.includes(id)
  )

  return (
    <sc.Wrapper>
      <ShareModal open={openShare} onClose={onCloseModal} projectId={id} />
      <ContentContainer>
        <sc.MainContainer>
          <ProjectMain cmsProjectContent={cmsProjectContent} />
          <DonationSection
            cmsProjectContent={cmsProjectContent}
            donateHref={donateHref}
            id={id}
            isMobile={isMobile}
            moneyRaised={moneyRaised}
            onClickDonate={onClickDonate}
            onClickShare={onClickShare}
            projectChampions={projectChampions}
            projectOrganizations={projectOrganizations}
            referredId={referredId}
          />
        </sc.MainContainer>
      </ContentContainer>
      {!isTabletOrMobile ? (
        <sc.StickyBarContainer>
          <sc.StickyBar>
            {renderTabs()}
            <ScrollableCTAsContainer
              donateHref={donateHref}
              onClickDonate={onClickDonate}
              onClickShare={onClickShare}
              projectActive={active}
            />
          </sc.StickyBar>
        </sc.StickyBarContainer>
      ) : null}
      <ContentFullContainer
        style={{ paddingBottom: '2rem', backgroundColor: '#fff' }}
      >
        <ContentContainer>
          <sc.TabChampionContainer>
            <div>
              {isTabletOrMobile ? renderTabs() : null}
              <TabContent
                onClickTab={onClickTab}
                projectTab={tab}
                projectId={id}
              />
            </div>
            {isTabletOrMobile ? (
              renderedChampionSection
            ) : (
              <sc.StickyContainer>{renderedChampionSection}</sc.StickyContainer>
            )}
          </sc.TabChampionContainer>
          {projects?.length > 0 ? (
            <ExploreProjects currentProjectId={id} projects={exploreProjects} />
          ) : null}
        </ContentContainer>
      </ContentFullContainer>
      {isMobile ? (
        <sc.FixedButtonContainer>
          {active ? (
            <Link href={donateHref} passHref>
              <DonateButtonLink onClick={onClickDonate}>
                Donate
              </DonateButtonLink>
            </Link>
          ) : null}
          <ShareButton onClick={onClickShare}>Share</ShareButton>
        </sc.FixedButtonContainer>
      ) : null}
    </sc.Wrapper>
  )
}
