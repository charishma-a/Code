import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

import { LabeledAvatar } from '../libraries/LabeledAvatar'

/* data */
import { Project } from '@/data/projects'

/* utils */
import { device } from '@/utils/device'
import { Video } from '../Video'
import { trackCategory } from '@/utils/analytics'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Disease = styled.span`
  margin: 0;
  color: #8256ff;
  font-weight: 800;
  font-size: 0.75rem;
  line-height: 1.5rem;

  @media ${device.tablet} {
    padding: 0 0.3rem;
    font-weight: 800;
    font-size: 0.875rem;
    background-color: #8256ff;
    color: #fff;
    border-radius: 5px;
    width: max-content;
  }

  @media ${device.laptop} {
    font-size: 0.75rem;
  }
`

const Title = styled.h1`
  margin: 0;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.1875rem;

  @media ${device.tablet} {
    font-size: 1.5rem;
    line-height: 2.125rem;
  }

  @media ${device.laptop} {
    padding-top: 0.5rem;
    font-size: 1.5rem;
    line-height: 1.8125rem;
  }
`

const Description = styled.p`
  margin: 0;
  color: #8a8a8a;
  font-weight: normal;
  font-size: 0.75rem;
  line-height: 1.1875rem;
  padding-top: 0.5rem;

  @media ${device.tablet} {
    font-size: 1rem;
    line-height: 1.625rem;
  }
`

const MainImage = styled.img`
  margin-top: 0.5rem;
`

const VideoContainer = styled.div`
  padding-top: 1rem;
  width: 100%;

  @media ${device.mobileL} {
    padding-top: 1.5rem;
  }
  @media ${device.tablet} {
    padding-top: 1.5rem;
  }
`
const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  @media ${device.tablet} {
    padding-top: 1.5rem;
  }

  @media ${device.laptop} {
    flex-direction: row;
    justify-content: flex-start;
    padding-top: 0.75rem;
  }
`

const styles = {
  childContainer: `margin-top: 0.25rem`,
  avatarContainer: `
    padding-bottom: 0.25rem;
    @media ${device.laptop} {
      flex: 1 1 55%;
    }
    `,
  avatar: `
    margin: 0 0.5rem 0.5rem 0;
    height: 1.8125rem;
    width: 1.8125rem;
    @media ${device.tablet} {
      height: 4rem;
      width: 4rem;
    }
  `,
  label: `
    margin: 0;
    font-weight: normal;
    font-size: 0.65rem;
    line-height: 0.8125rem;
    
    @media ${device.tablet} {
      margin: 0.5rem 0 0 0.2rem;
      font-weight: 400;
      font-size: 0.75em;
      line-height: 1.12rem}
  `,
  childAvatar: `
    margin: 0;
    width: 0;
    height: 0;
    @media ${device.tablet} {
      visibility: visible;
      margin: 0.2rem 0.1rem 0.5rem 0.2rem ;
      height: 0.72rem;
      width: 0.72rem;
    }
  `,
  childLabel: `
    margin: 0;
    font-weight: normal;
    font-size: 0.65rem;
    line-height: 0.8125rem;
    @media ${device.tablet} {
      margin-left: 0.2rem;
      font-weight: 400;
      font-size: 0.75rem;
      line-height: 1.125rem;}
  `,
  childLabelWithAvatar: `
    margin: 0;
    font-weight: normal;
    font-size: 0.65rem;
    line-height: 0.8125rem;
    @media ${device.tablet} {
      font-weight: 400;
      font-size: 0.75rem;
      line-height: 1.125rem;}
  `,
}

export interface ProjectMainProps {
  cmsProjectContent: Project
}

export const ProjectMain: FunctionComponent<ProjectMainProps> = ({
  cmsProjectContent,
}) => {
  const { disease, image, imageAlt, slug, title, description, video, avatars } =
    cmsProjectContent
  const onPause = () => {
    trackCategory({
      eventProps: {
        eventAction: 'Project Video Pause',
        eventCategory: 'Project Video',
        clickID: 'project-video-click-pause',
      },
      extra: {
        videoName: slug,
        projectSlug: slug,
      },
    })
  }
  const onPlay = () => {
    trackCategory({
      eventProps: {
        eventAction: 'Project Video Play',
        eventCategory: 'Project Video',
        clickID: 'project-video-click-play',
      },
      extra: {
        videoName: slug,
        projectSlug: slug,
      },
    })
  }

  return (
    <Container>
      <Disease>{disease}</Disease>
      <Title>{title}</Title>
      <Description>{description}</Description>
      {video ? (
        <VideoContainer>
          <Video onPause={onPause} onPlay={onPlay} publicId={slug} />
        </VideoContainer>
      ) : (
        <MainImage alt={imageAlt} src={image} />
      )}
      <AvatarContainer>
        {avatars &&
          avatars.map((avatar, index) => {
            return (
              <LabeledAvatar
                key={index + '-' + avatar.label}
                avatar={avatar.avatar}
                label={avatar.label}
                avatarStyles={styles.avatar}
                labelStyles={styles.label}
                containerStyles={styles.avatarContainer}
              >
                {avatar.children ? (
                  <LabeledAvatar
                    avatar={avatar.children.avatar}
                    label={avatar.children.label}
                    avatarStyles={
                      avatar.children.avatar.length > 0
                        ? styles.childAvatar
                        : ''
                    }
                    containerStyles={styles.childContainer}
                    labelStyles={
                      avatar.children.avatar.length > 0
                        ? styles.childLabelWithAvatar
                        : styles.childLabel
                    }
                  />
                ) : null}
              </LabeledAvatar>
            )
          })}
      </AvatarContainer>
    </Container>
  )
}
