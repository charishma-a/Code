import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled from 'styled-components'
import { howItWorksContent } from './howItWorksContent'
import HowItWorksCard from './HowItWorksCard'
import { device } from '../../utils/device'
import { wrapExternalLinkUrl } from '../../utils/wrapExternalLinkUrl'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: flex-start;

  @media ${device.laptopL} {
    padding-right: 8rem;
  }

  @media ${device.desktop} {
    padding-right: 0rem;
    justify-content: center;
  }
`

const Cards = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.laptopL} {
    width: 40%;
  }

  @media ${device.desktop} {
    margin-right: 20rem;
  }
`

const Image = styled.img`
  width: 42%;

  @media ${device.laptop} {
    width: 41%;
  }

  @media ${device.laptopL} {
    width: 36%;
  }
`

const HowItWorksDesktop = ({ trackHKW }) => {
  const router = useRouter()
  const [selectedCard, setSelectedCard] = useState('Donor')

  const isSelected = (userType) => userType == selectedCard

  const targetContent = howItWorksContent.find(
    ({ userType }) => userType === selectedCard
  )

  return (
    <Container>
      <Cards>
        {howItWorksContent.map(
          ({
            clickID,
            userType,
            title,
            description,
            linkText,
            link,
            internalLink,
          }) => {
            const onClickLink = async () => {
              trackHKW(clickID, linkText)
              if (internalLink) {
                router.push(link)
              } else {
                window.location.href = wrapExternalLinkUrl(link)
              }
            }
            return (
              <HowItWorksCard
                key={userType + '-card'}
                userType={userType}
                title={title}
                description={description}
                linkText={linkText}
                link={link}
                onClickLink={onClickLink}
                isSelected={isSelected(userType)}
                onClick={setSelectedCard}
              />
            )
          }
        )}
      </Cards>
      <Image src={targetContent.img} alt={targetContent.imgAlt} />
    </Container>
  )
}

export default HowItWorksDesktop
