import { useRouter } from 'next/router'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import * as sc from './HomePageHero.styled'
import { HorizontalProjectCard } from '../ProjectCard/HorizontalProjectCard'
import { VerticalProjectCard } from '../ProjectCard/VerticalProjectCard'
import { size } from '@/utils/device'
import { useWindowSize } from '@/hooks/useWindowSize'
import { trackCategory } from '@/utils/analytics'
import { Project } from '@/data/projects'
import { ProjectCardsFragment } from '@/generated/graphql'

interface HomePageHeroProps {
  cmsProjectContent: Project
  project: ProjectCardsFragment
}
export const HomePageHero: React.FC<HomePageHeroProps> = ({
  cmsProjectContent,
  project,
}) => {
  const { width } = useWindowSize()
  const router = useRouter()
  const mobileL = parseInt(size.mobileL.split('p')[0])

  const featureProjectClickUrl = `/projects/${cmsProjectContent.slug}`

  const trackHeroCTA = ({ eventProps, ...restProps }) => {
    trackCategory({
      eventProps: {
        eventAction: 'Hero CTA Click',
        eventCategory: 'Homepage Hero',
        ...eventProps,
      },
      ...restProps,
    })
  }

  const onClickFeatureProject = async () => {
    trackHeroCTA({
      eventProps: {
        clickID: 'hero-click-feature-project',
        clickText: howItWorksText,
      },
      extra: {
        clickUrl: featureProjectClickUrl,
      },
    })

    router.push(featureProjectClickUrl)
  }

  const exploreProjectsClickUrl = '#explore-projects'
  const exploreProjectsText = 'Explore Projects'
  const onClickExploreProject = () => {
    trackHeroCTA({
      eventProps: {
        clickID: 'hero-click-explore-project',
        clickText: exploreProjectsText,
      },
      extra: {
        clickUrl: exploreProjectsClickUrl,
      },
    })
  }

  const howItWorksClickUrl = '#how-it-works'
  const howItWorksText = 'How It Works'
  const onClickHowItWorks = () => {
    trackHeroCTA({
      eventProps: {
        clickID: 'hero-click-how-kernls-works',
        clickText: howItWorksText,
      },
      extra: {
        clickUrl: howItWorksClickUrl,
      },
    })
  }

  return (
    <sc.HeroContainer>
      {width > mobileL ? (
        <HorizontalProjectCard
          cmsProjectContent={cmsProjectContent}
          linkUrl={featureProjectClickUrl}
          hero
          onClick={onClickFeatureProject}
          project={project}
        />
      ) : (
        <VerticalProjectCard
          cmsProjectContent={cmsProjectContent}
          project={project}
          hero
          onClick={onClickFeatureProject}
        />
      )}

      <sc.LinksContainer>
        <sc.LinkContainer
          href={exploreProjectsClickUrl}
          onClick={onClickExploreProject}
        >
          <sc.StyledLinkText>{exploreProjectsText}</sc.StyledLinkText>
          <sc.ArrowContainer>
            <ArrowForwardIosIcon fontSize="small" />
          </sc.ArrowContainer>
        </sc.LinkContainer>
        <sc.LinkContainer href={howItWorksClickUrl} onClick={onClickHowItWorks}>
          <sc.StyledLinkText>{howItWorksText}</sc.StyledLinkText>
          <sc.ArrowContainer>
            <ArrowForwardIosIcon fontSize="small" />
          </sc.ArrowContainer>
        </sc.LinkContainer>
      </sc.LinksContainer>
    </sc.HeroContainer>
  )
}
