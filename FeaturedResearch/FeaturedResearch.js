import styled from 'styled-components'
import { cardContent } from './FeaturedResearchContent'
import LabeledAvatar from '../libraries/LabeledAvatar'
import { useWindowSize } from '../../hooks/useWindowSize'
import { device, size } from '../../utils/device'

const Container = styled.div`
  padding: 1.72em 0;
`

const Header = styled.p`
  font-weight: 600;
  font-style: normal;
  font-size: 1.78rem;
  line-height: 2.72rem;
`

const Card = styled.div`
  display: flex;
  height: 27.55rem;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`

const Image = styled.img`
  width: 40%;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;

  @media ${device.laptopL} {
    padding: 4rem;
  }
`

const Disease = styled.p`
  width: max-content;
  background-color: #8256ff;
  color: #fff;
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  font-style: normal;
  font-weight: 800;
  font-size: 0.67rem;
  line-height: 0.93rem;
`

const Title = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 1.11rem;
  line-height: 1.61rem;
`

const Description = styled.p`
  padding: 0;
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 0.88rem;
  line-height: 1.33rem;
`
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
`

const InstituteContainer = styled.div`
  display: flex;
`

const ResearcherContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.laptopL} {
    padding-right: 3.5rem;
  }

  @media ${device.desktop} {
    padding-right: 6rem;
  }
`

const ResearcherPosition = styled.p`
  margin: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 0.78rem;
  line-height: 1.11rem;
`

const styles = {
  instituteAvatar: `
    margin: 0 0.5rem 0.5rem 0;
    height: 2.23rem;
    width: 2.24rem;`,
  instituteLabel: `
    margin: 0;
    font-style: normal;
    font-weight: 600;
    font-size: 0.78rem;
    line-height: 1.11rem;`,
  locationAvatar: `
    margin: 0.5rem 0.5rem 0.5rem 0;
    width: 0.61rem;
    height: 0.78rem;`,
  locationLabel: `
    margin-top: 0.3rem;
    font-style: normal;
    font-weight: 600;
    font-size: 0.78rem;
    line-height: 1.11rem;`,
  researcherAvatar: `margin: 0 0.5rem 0.5rem 0;`,
  researcherLabel: `
    margin: 0;
    font-style: normal;
    font-weight: 600;
    font-size: 0.78rem;
    line-height: 1.11rem;`,
}

const FeaturedResearch = () => {
  const { width } = useWindowSize()
  const tablet = parseInt(size.tablet.split('p'))

  const content = cardContent[0]
  const { description, disease, image, institute, researchers, title } =
    content || {}

  return (
    width > tablet && (
      <Container>
        <Header>Featured Research</Header>
        <Card>
          <Image src={image} alt="Featured Research Image" />
          <Content>
            <Disease>{disease}</Disease>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <Footer>
              <InstituteContainer>
                <LabeledAvatar
                  avatar={institute.avatar}
                  label={institute.name}
                  avatarStyles={styles.instituteAvatar}
                  labelStyles={styles.instituteLabel}
                >
                  <LabeledAvatar
                    avatar={'/assets/images/location-grey.png'}
                    label={institute.location}
                    avatarStyles={styles.locationAvatar}
                    labelStyles={styles.locationLabel}
                  />
                </LabeledAvatar>
              </InstituteContainer>
              <ResearcherContainer>
                {researchers.map((researcher, index) => {
                  return (
                    <LabeledAvatar
                      key={index + '-' + researcher.name}
                      avatar={researcher.avatar}
                      label={researcher.name}
                      avatarStyles={styles.researcherAvatar}
                      labelStyles={styles.researcherLabel}
                    >
                      <ResearcherPosition>
                        {researcher.position}
                      </ResearcherPosition>
                    </LabeledAvatar>
                  )
                })}
              </ResearcherContainer>
            </Footer>
          </Content>
        </Card>
      </Container>
    )
  )
}

export default FeaturedResearch
