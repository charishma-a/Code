import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter, default as Router } from 'next/router'
import React, { useEffect } from 'react'

import { Layout } from '@/components/Layout/Layout'
import { ProjectDetail } from '@/components/Project/ProjectDetail'
import { getProject, Project, PROJECTS } from '@/data/projects'
import { useWindowSize } from '@/hooks/useWindowSize'
import { size } from '@/utils/device'
import { getReferredId } from '@/utils/getReferredId'

export interface ProjectDetailPageProps {
  cmsProjectContent: Project
}

const ProjectDetailPage: NextPage<ProjectDetailPageProps> = ({
  cmsProjectContent,
}) => {
  const router = useRouter()
  const { projectId, utm_campaign } = router.query

  const referredId = getReferredId({
    query: router.query,
  })

  const idPath = Array.isArray(projectId) ? projectId[0] : projectId
  const { width } = useWindowSize()
  const { id, slug } = cmsProjectContent

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
        pathname: '/projects/slow-pancreatic-cancer-growth',
        query: queryWithoutProjectId,
      })
    }
  }, [utm_campaign, slug])

  useEffect(() => {
    if (id) {
      window.scroll(0, 0)
    }
  }, [id])

  const tablet = parseInt(size.tablet.replace('px', ''), 10)
  const isMobile = width < tablet

  return (
    <Layout {...cmsProjectContent.metatags} stickyNavBar={isMobile}>
      <ProjectDetail
        referredId={referredId}
        idPath={idPath}
        cmsProjectContent={cmsProjectContent}
        key={cmsProjectContent.id}
      />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projectsWithIds = PROJECTS.map((project) => {
    return {
      params: {
        projectId: project.id,
      },
    }
  })
  const projectsWithSlug = PROJECTS.map((project) => {
    return {
      params: {
        projectId: project.slug,
      },
    }
  })
  const projectsWithEmbeddedCode = PROJECTS.map((project) => {
    return {
      params: {
        projectId: project.embeddedCode,
      },
    }
  })
  const paths = [
    ...projectsWithIds,
    ...projectsWithSlug,
    ...projectsWithEmbeddedCode,
  ]
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { projectId } = params

  const id = Array.isArray(projectId) ? projectId[0] : projectId

  const cmsProjectContent = getProject({ id })

  return {
    props: {
      cmsProjectContent,
    },
  }
}

export default ProjectDetailPage
