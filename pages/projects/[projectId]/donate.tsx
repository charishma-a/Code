import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

/* common */
import { BackLink } from '@/common/styled'

/* components */
import { Layout } from '@/components/Layout'
import { Donation } from '@/components/Donation'

/* data */
import { PROJECTS } from '@/data/projects'
import { getReferredId } from '@/utils/getReferredId'

const baseClass = 'project-id-donate-page'

const Page = styled.div`
  align-items: center;
  background-color: #f8f8f8;
  color: #565656;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
`

const ProjectDonatePage: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { projectId, utm_campaign } = router.query

  const [showReview, setShowReview] = useState(false)

  const referredId = getReferredId({
    query: router.query,
  })

  // find the target project
  const cmsProjectContent = PROJECTS.find(
    (project) =>
      project.embeddedCode === projectId ||
      project.slug === projectId ||
      project.id === projectId
  )
  const {
    metatags = {
      description: '',
      image: '',
      title: '',
      url: '',
      twitterImage: '',
    },
    slug,
  } = cmsProjectContent || {}

  useEffect(() => {
    if (
      utm_campaign === 'Toolkit_CalleyMeans' &&
      slug !== 'slow-pancreatic-cancer-growth'
    ) {
      const queryWithoutProjectId = Object.keys(router.query).reduce(
        (acc, key) => {
          if (key !== 'projectId') {
            return {
              ...acc,
              [key]: router.query[key],
            }
          }
          return acc
        },
        {}
      )
      router.replace({
        pathname: '/projects/slow-pancreatic-cancer-growth/donate',
        query: queryWithoutProjectId,
      })
    }
  }, [utm_campaign, slug])

  const className = ['page', baseClass].join(' ')

  return (
    <Page className={className}>
      <Layout
        backLink={`/projects/${projectId}`}
        backLinkOnClick={
          showReview
            ? () => {
                setShowReview(false)
              }
            : undefined
        }
        {...metatags}
        title={`Donate to ${metatags.title}`}
      >
        <Donation
          backLink={
            <Link href={`/projects/${projectId}`} passHref>
              <BackLink>&#60; Return to project</BackLink>
            </Link>
          }
          cmsProjectContent={cmsProjectContent}
          referredId={referredId}
          setShowReview={(value: boolean) => {
            setShowReview(value)
          }}
          showReview={showReview}
        />
      </Layout>
    </Page>
  )
}

export default ProjectDonatePage
