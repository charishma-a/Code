import { NextPage } from 'next'
import styled from 'styled-components'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

/* common */
import { ContentContainer, HomepageSectionHeading } from '../common/styled'

/* component */
import { HomeHeader } from '../components/Home/HomeHeader'
import { HomePageHero } from '../components/Home/HomePageHero'
import { ProjectCards } from '../components/ProjectCard/ProjectCards'
import { HowItWorks } from '../components/HowItWorks/HowItWorks'
import { BecomeAChampion } from '../components/BecomeAChampion/BecomeAChampion'
import { device } from '../utils/device'
import Layout from '../components/Layout/Layout'
import { PROJECTS } from '../data/projects'

/* constants */
import {
  FOR_RESEARCHERS_URL,
  METATAG_IMAGE,
  METATAG_TWITTER_IMAGE,
} from '../constants/config'

/* utils */
import { trackCategory } from '../utils/analytics'
import { useHomepageQuery } from '../generated/graphql'
import { ProjectSlugs } from '@/constants/projectTabs/types'
import {
  IMAGE_PROPS_FOUNDATION_ALBERT_EINSTEIN_LOGO,
  IMAGE_PROPS_FOUNDATION_ATRI_USC_LOGO,
  IMAGE_PROPS_FOUNDATION_PMCF_UHN_LOGO,
  IMAGE_PROPS_FOUNDATION_CORNELL_BURKE_NEROLOGICAL_INSTITUTE_LOGO,
} from '@/constants/images'

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Main = styled.div`
  z-index: 1;
  margin-top: -2rem;
  @media ${device.tablet} {
    margin-top: -4rem;
  }
`

const PartnerInsitituionsContainer = styled.div`
  padding: 3rem 2rem;
  background-color: #f5f5f5;
`
const PartnerInsitituionsSection = styled.section`
  margin-top: 3rem;
  text-align: center;
  h2 {
    margin: 0;
  }
  .logos-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    img:not(:last-child) {
      margin-bottom: 1rem;
    }
    margin-top: 2rem;
    margin-bottom: 2rem;

    @media ${device.tablet} {
      flex-wrap: wrap;
      align-items: center;
      display: flex;
      flex-direction: row;
      justify-content: center;
      img:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }

  a {
    color: #825eff;
  }
`

export const Home: NextPage = (): JSX.Element => {
  const featuredCmsProjectContent = PROJECTS.find(
    ({ slug }) => slug === ProjectSlugs.ALZHEIMERS_DISEASE_DETECTION
  )

  const { data } = useHomepageQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      ids: PROJECTS.map(({ id }) => id),
    },
  })

  const onClickProjectCard = async (project) => {
    const { clickID, title } = project
    trackCategory({
      eventProps: {
        eventAction: 'Project Card Click',
        eventCategory: 'Homepage Project Card',
        clickID,
        clickText: title,
      },
    })
  }

  const { projects = [] } = data || {}
  const featuredProject = projects.find(
    ({ id }) => id === featuredCmsProjectContent.id
  )

  return (
    <Layout
      description="Kernls empowers those who have been touched by an illness to drive progress towards a cure by directly supporting research and sharing it with friends."
      image={METATAG_IMAGE}
      title="Give directly to medical research you care about | Kernls"
      twitterImage={METATAG_TWITTER_IMAGE}
      url="https://kernls.com"
    >
      <Wrapper>
        <HomeHeader />
        <Main>
          <ContentContainer>
            <HomePageHero
              cmsProjectContent={featuredCmsProjectContent}
              project={featuredProject}
            />
            <PartnerInsitituionsSection>
              <PartnerInsitituionsContainer>
                <HomepageSectionHeading
                  id="our-partner-institutions"
                  style={{ textAlign: 'center' }}
                >
                  Our Partner Institutions
                </HomepageSectionHeading>
                <div className="logos-container">
                  <img
                    alt={IMAGE_PROPS_FOUNDATION_ALBERT_EINSTEIN_LOGO.getAlt()}
                    src={IMAGE_PROPS_FOUNDATION_ALBERT_EINSTEIN_LOGO.getSrc()}
                    height="74"
                    width="210"
                  />
                  <img
                    alt={IMAGE_PROPS_FOUNDATION_PMCF_UHN_LOGO.getAlt()}
                    src={IMAGE_PROPS_FOUNDATION_PMCF_UHN_LOGO.getSrc()}
                    height="74"
                    width="210"
                  />
                  <img
                    alt={IMAGE_PROPS_FOUNDATION_ATRI_USC_LOGO.getAlt()}
                    src={IMAGE_PROPS_FOUNDATION_ATRI_USC_LOGO.getSrc()}
                    height="74"
                    width="210"
                  />
                  <img
                    alt={IMAGE_PROPS_FOUNDATION_CORNELL_BURKE_NEROLOGICAL_INSTITUTE_LOGO.getAlt()}
                    src={IMAGE_PROPS_FOUNDATION_CORNELL_BURKE_NEROLOGICAL_INSTITUTE_LOGO.getSrc()}
                    height="74"
                    width="210"
                  />
                </div>
                <div>
                  <a href={FOR_RESEARCHERS_URL}>
                    Are you a researcher or part of a development team? See how
                    Kernls helps{' '}
                    <ArrowForwardIosIcon style={{ fontSize: 12 }} />
                  </a>
                </div>
              </PartnerInsitituionsContainer>
            </PartnerInsitituionsSection>
            <section>
              <HomepageSectionHeading id="explore-projects">
                Kernls partners with top-ranked research institutes to make
                science accessible
              </HomepageSectionHeading>
              <ProjectCards
                onClickProjectCard={onClickProjectCard}
                projects={data?.projects}
                projectIds={PROJECTS.map(({ id }) => id)}
              />
            </section>
            <section>
              <HomepageSectionHeading id="how-it-works">
                How Kernls moves scientific research forward
              </HomepageSectionHeading>
              <HowItWorks />
            </section>
            <section>
              <HomepageSectionHeading>
                Champion research you care about
              </HomepageSectionHeading>
              <BecomeAChampion />
            </section>
          </ContentContainer>
        </Main>
      </Wrapper>
    </Layout>
  )
}

export default Home
