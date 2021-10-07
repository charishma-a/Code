import Link from 'next/link'
import styled from 'styled-components'

import { ContentContainer } from '@/common/styled'
import { trackCategory } from '@/utils/analytics'
import { device } from '@/utils/device'
import { IMAGE_PROPS_LOGO } from '@/constants/images'
import { PRESS_ROOM_URL, CAREERS_URL } from '@/constants/config'

const Wrapper = styled.footer`
  background-color: transparent;
  margin-top: 2rem;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.5rem 0 4.5rem 0;
  @media ${device.tablet} {
    padding: 2.5rem 0 2.5rem 0;
    flex-direction: row;
    justify-content: space-between;
  }
`

const LogoCopyrightContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    font-size: 0.8rem;
    margin-top: 1rem;
    margin-bottom: 0;
    color: #000;
  }

  @media ${device.tablet} {
    align-items: flex-start;
  }
`

const Links = styled.ul`
  align-items: flex-end;
  list-style: none;
  display: flex;
  justify-content: center;
  padding-left: 0;
  margin: 0;
  margin-top: 0.5rem;
  li a {
    color: #565656;
  }
  li:not(:last-child) {
    margin-right: 0.5rem;
  }
`

const Logo = styled.img`
  align-self: center;
  /* height: 0.7rem; */
  /* width: 20%; */

  @media ${device.tablet} {
    align-self: flex-start;
    /* width: auto; */
    /* height: 1.2rem; */
    margin-bottom: 0;
  }
`

export const Footer: React.FC = () => {
  return (
    <Wrapper>
      <ContentContainer>
        <Container>
          <LogoCopyrightContainer>
            <Logo
              src={IMAGE_PROPS_LOGO.getSrc()}
              alt={IMAGE_PROPS_LOGO.getAlt()}
            />
            <p>© 2021 Kernls Inc. All Rights Reserved</p>
          </LogoCopyrightContainer>
          <Links>
            <li>
              <Link href="/terms-of-use">
                <a
                  onClick={() => {
                    trackCategory({
                      eventProps: {
                        eventAction: 'Footer Link Click',
                        eventCategory: 'Footer',
                        clickID: 'footer-link-click-terms-of-use',
                      },
                    })
                  }}
                  target="_blank"
                  rel="noreferrer"
                >
                  Terms of Use
                </a>
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy">
                <a
                  onClick={() => {
                    trackCategory({
                      eventProps: {
                        eventAction: 'Footer Link Click',
                        eventCategory: 'Footer',
                        clickID: 'footer-link-click-privacy-policy',
                      },
                    })
                  }}
                  target="_blank"
                  rel="noreferrer"
                >
                  Privacy Policy
                </a>
              </Link>
            </li>
            <li>
              <a
                href={PRESS_ROOM_URL}
                onClick={() => {
                  trackCategory({
                    eventProps: {
                      eventAction: 'Footer Link Click',
                      eventCategory: 'Footer',
                      clickID: 'footer-link-click-press-room',
                    },
                  })
                }}
                target="_blank"
                rel="noreferrer"
              >
                Press
              </a>
            </li>
            <li>
              <a
                href={CAREERS_URL}
                onClick={() => {
                  trackCategory({
                    eventProps: {
                      eventAction: 'Footer Link Click',
                      eventCategory: 'Footer',
                      clickID: 'footer-link-click-careers',
                    },
                  })
                }}
                target="_blank"
                rel="noreferrer"
              >
                Careers
              </a>
            </li>
          </Links>
        </Container>
      </ContentContainer>
    </Wrapper>
  )
}
