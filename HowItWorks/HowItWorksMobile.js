import { useRouter } from 'next/router'
import NextLink from 'next/link'
import styled from 'styled-components'
import { howItWorksContent } from './howItWorksContent'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { wrapExternalLinkUrl } from '../../utils/wrapExternalLinkUrl'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Image = styled.img`
  align-self: center;
  width: 50%;
  padding: 1.33rem 0;
`
const User = styled.p`
  padding: 0;
  margin: 0;
  color: #8256ff;
  font-style: normal;
  font-weight: 800;
  font-size: 0.88rem;
  line-height: 1.4rem;
`
const Title = styled.p`
  margin: 0.1rem 0;
  padding: 0;
  font-style: normal;
  font-weight: 800;
  font-size: 0.88rem;
  line-height: 1.4rem;
`
const Description = styled.p`
  margin: 0.1rem 0;
  padding: 0;
  color: #8a8a8a;
  font-style: normal;
  font-weight: 600;
  font-size: 0.88rem;
  line-height: 1.44rem;
`
const LinkContainer = styled.div`
  margin: 0.1rem 0;
  padding: 0;
  display: flex;
  align-items: center;
`
const ArrowContainer = styled.div`
  padding: 0.3rem 0 0 0.2rem;
  color: #8256ff;
  font-size: 0.67rem;
`
const Link = styled.a`
  color: #8256ff;
  font-style: normal;
  font-weight: 600;
  font-size: 0.88rem;
  line-height: 1.4rem;
  cursor: pointer;
`

const HowItWorksMobile = ({ trackHKW }) => {
  const router = useRouter()

  return (
    <Container>
      {howItWorksContent.map(
        ({
          clickID,
          userType,
          title,
          description,
          linkText,
          link,
          internalLink,
          img,
        }) => {
          const onClick = async () => {
            trackHKW(clickID, linkText)
            if (internalLink) {
              router.push(link)
            } else {
              window.location.href = wrapExternalLinkUrl(link)
            }
          }

          return (
            <Container key={'how-it-works-' + userType}>
              <Image
                src={img}
                alt="We pair Researchers with donors who support projects by sharing them and matching donations."
              />
              <User>{userType}</User>
              <Title>{title}</Title>
              <Description>{description}</Description>
              <LinkContainer>
                <Link onClick={onClick}>{linkText}</Link>
                <ArrowContainer>
                  <ArrowForwardIosIcon style={{ fontSize: 12 }} />
                </ArrowContainer>
              </LinkContainer>
            </Container>
          )
        }
      )}
    </Container>
  )
}

export default HowItWorksMobile
