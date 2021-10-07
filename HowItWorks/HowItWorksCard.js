import styled from 'styled-components'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { device } from '../../utils/device'

const Card = styled.div`
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border-left: solid 0.44rem #8256ff;
  width: 17.28rem;
  height: 11.11rem;
  padding: 1.44rem 1.94rem;
  margin-bottom: 1.44rem;

  @media ${device.laptop} {
    width: 25.89rem;
    height: 16.67rem;
  }

  @media ${device.desktop} {
    padding: 3.5rem 4rem;
    margin-bottom: 3rem;
    width: 35rem;
    height: 22rem;
  }
`

const User = styled.p`
  padding: 0;
  margin: 0;
  color: ${(props) => (props.isSelected ? '#8256FF' : '#8A8A8A')};
  font-style: normal;
  font-weight: 800;
  font-size: 0.88rem;
  line-height: 1.4rem;

  @media ${device.laptop} {
    font-size: 0.88rem;
  }

  @media ${device.desktop} {
    font-size: 1.4rem;
    line-height: 1.5rem;
  }
`

const Title = styled.p`
  margin: 0.2rem 0;
  padding: 0;
  color: ${(props) => (props.isSelected ? '#000' : '#8A8A8A')};
  font-style: normal;
  font-weight: 600;
  font-size: 0.88rem;
  line-height: 1.4rem;

  @media ${device.laptop} {
    font-size: 1.33rem;
    line-height: 1.89rem;
  }

  @media ${device.desktop} {
    font-size: 1.7rem;
    line-height: 3.5rem;
  }
`

const Description = styled.p`
  margin: 0.2rem 0;
  padding: 0;
  color: #8a8a8a;
  font-style: normal;
  font-weight: 600;
  font-size: 0.67rem;
  line-height: 0.94rem;

  @media ${device.laptop} {
    font-size: 1.11rem;
    line-height: 1.78rem;
  }

  @media ${device.desktop} {
    font-size: 1.5rem;
    line-height: 2rem;
  }
`

const LinkContainer = styled.div`
  margin: 1rem 0;
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

  @media ${device.laptop} {
    font-size: 0.88rem;
  }

  @media ${device.desktop} {
    font-size: 1.3rem;
    line-height: 2.5rem;
  }
`

const TextCard = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 0 1.94rem 1.44rem 1.94rem;

  @media ${device.desktop} {
    padding: 0 1.94rem 2rem 1.94rem;
  }
`

const HowItWorksCard = ({
  userType,
  title,
  description,
  linkText,
  link,
  onClick,
  onClickLink,
  isSelected,
}) => {
  return isSelected ? (
    <Card>
      <User isSelected={isSelected}>{userType}</User>
      <Title isSelected={isSelected}>{title}</Title>
      <Description>{description}</Description>
      <LinkContainer>
        <Link onClick={onClickLink}>{linkText}</Link>
        <ArrowContainer>
          <ArrowForwardIosIcon style={{ fontSize: 12 }} />
        </ArrowContainer>
      </LinkContainer>
    </Card>
  ) : (
    <TextCard
      onClick={() => {
        onClick(userType)
      }}
    >
      <User>{userType}</User>
      <Title isSelected={isSelected}>{title}</Title>
    </TextCard>
  )
}

export default HowItWorksCard
