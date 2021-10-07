import React from 'react'
import styled from 'styled-components'
import { device } from '@/utils/device'
import { ContentContainer } from '@/common/styled'
import { IMAGE_PROPS_HOMEPAGE_HERO_V2 } from '@/constants/images'

const HeaderContainer = styled(ContentContainer)`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  padding-bottom: 6rem;

  @media ${device.tablet} {
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
`

const HeaderWrapper = styled.section`
  background: #f2f2f4;
  display: flex;
  align-items: center;
`

const ImageContainer = styled.div`
  text-align: center;
  margin: 0 auto;
  width: 270px;
  margin-top: 1rem;
  @media ${device.tablet} {
    margin-left: 0.5rem;
    width: 600px;
    margin-top: 0;
  }
  @media ${device.laptopL} {
    margin-left: 2rem;
    width: 1000px;
    margin-top: 0;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  text-align: center;

  h1,
  p {
    margin: 0;
  }

  h1 {
    span.purple {
      color: #8256ff;
    }

    font-size: 1rem;
    line-height: 1.4rem;

    @media ${device.tablet} {
      font-weight: 800;
      font-size: 2.813rem;
      line-height: 3.75rem;
    }
  }

  p {
    margin-top: 1rem;
  }

  font-size: 0.75rem;

  @media ${device.tablet} {
    font-size: 1.563rem;
    text-align: left;

    p {
      margin-top: 0;
    }
  }
`

export const HomeHeader: React.FC = () => {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <TextContainer>
          <h1>
            <span className="purple">Direct and Transparent Giving</span>
            <br /> to Life-Saving Research
          </h1>
          <p>
            Kernls provides the only way for donors to connect directly with
            medical researchers to fund, see and share the impact of their work.
          </p>
        </TextContainer>
        <ImageContainer>
          <img src={IMAGE_PROPS_HOMEPAGE_HERO_V2.getSrc()} />
        </ImageContainer>
      </HeaderContainer>
    </HeaderWrapper>
  )
}
