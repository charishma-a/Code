import Link from 'next/link'
import React, { HTMLAttributes, useEffect, useState } from 'react'
import styled from 'styled-components'
import { DonateButtonLink, ShareButton } from '../Form/SubmitButton'

export const CTAButtonsContainer = styled.div<
  HTMLAttributes<HTMLDivElement> & { bottom: number }
>`
  position: relative;
  bottom: ${({ bottom }) => `-${bottom}px`};
  align-items: center;
  display: flex;
  justify-content: space-between;
  button,
  a {
    margin-top: 0;
  }
`

export interface ScrollableCTAsContainerProps {
  donateHref: string
  onClickDonate: () => void
  onClickShare: () => void
  projectActive?: boolean
}

export const ScrollableCTAsContainer: React.FC<ScrollableCTAsContainerProps> =
  ({ donateHref, onClickDonate, onClickShare, projectActive = true }) => {
    const max = 70
    const min = 0
    const step = 5
    const [bottom, setBottom] = useState(max - 1)

    useEffect(() => {
      const handleScroll = (event) => {
        if (bottom > min && bottom < max) {
          setBottom(() => {
            const speed = window.scrollY / step
            const calc = max - parseInt(speed.toFixed(0), 10)
            if (calc >= max) {
              return max
            }
            if (calc <= min) {
              return min
            }

            return calc
          })
        }
      }
      window.addEventListener('scroll', handleScroll)

      return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
      <CTAButtonsContainer bottom={bottom}>
        {projectActive ? (
          <Link href={donateHref} passHref>
            <DonateButtonLink onClick={onClickDonate}>Donate</DonateButtonLink>
          </Link>
        ) : null}
        <ShareButton onClick={onClickShare}>Share</ShareButton>
      </CTAButtonsContainer>
    )
  }
