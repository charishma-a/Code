import styled from 'styled-components'
import {
  ProjectSlugs,
  ProjectTabContentSingleFocusedTabs,
  ProjectTabContentStats,
  ProjectTabContentTableProjectSummary,
  ProjectTabContentTeamMember,
  ProjectTabName,
  ProjectTabSection,
} from './types'
import { IconTextAlertIcons } from '@/components/IconTextAlert'
import { InfoBox } from '@/common/styled'
import { Paragraph } from '@/components/Paragraph'
import { TableLegend, TableLegendCircle } from '@/components/Table'
import { hIndexTooltipContent } from '@/constants/tooltips'

import { mapToParagraphs } from './utils'
import { Accordion } from '@/components/Accordion'
import { useRouter } from 'next/router'
import {
  IMAGE_PROPS_FOUNDATION_ALBERT_EINSTEIN,
  IMAGE_PROPS_FOUNDATION_ATRI_USC,
  IMAGE_PROPS_FOUNDATION_PMCF_UHN,
  IMAGE_PROPS_PROJECT_35UEmH7_AVATAR_ARMAND_KEATING,
  IMAGE_PROPS_PROJECT_35UEmH7_GRAPH,
  IMAGE_PROPS_PROJECT_A4D04DF_AVATAR_ANITA,
  IMAGE_PROPS_PROJECT_A4D04DF_AVATAR_BRENDA,
  IMAGE_PROPS_PROJECT_A4D04DF_GRAPH,
  IMAGE_PROPS_PROJECT_GRAPH_LOCKED,
  IMAGE_PROPS_PROJECT_LK4S12M_GRAPH,
  IMAGE_PROPS_PROJECT_LK4S12M_HARRIS_GOLDSTEIN,
  IMAGE_PROPS_PROJECT_YR8UGE2_AVATAR_PAUL_AISEN,
  IMAGE_PROPS_PROJECT_YR8UGE2_GRAPH,
} from '../images'
import {
  SVG_PROPS_ARROW_LONG_RIGHT,
  SVG_PROPS_ARROW_LONG_RIGHT_PURPLE,
} from '../svgs'

const commonProjectTab = {
  clickID: 'project-page-click-project',
  tabName: ProjectTabName.Project,
}

const InfoBoxLocked = styled(InfoBox)`
  background: #8f8f8f;
  p {
    color: #ffffff;
  }
`

const PurpleLink = styled.a`
  align-items: center;
  color: #8256ff;
  display: flex;
  justify-content: start;
  margin-top: 1rem;
`

const graphLockedImg = (
  <img
    src={IMAGE_PROPS_PROJECT_GRAPH_LOCKED.getSrc()}
    style={{
      height: '130px',
      margin: '1rem auto',
      width: '130px',
    }}
  />
)
const longArrowRightImg = (
  <img
    src={SVG_PROPS_ARROW_LONG_RIGHT.getSrc()}
    style={{ marginLeft: '0.3rem' }}
  />
)
const longArrowRightPurpleImg = (
  <img
    src={SVG_PROPS_ARROW_LONG_RIGHT_PURPLE.getSrc()}
    style={{ marginLeft: '0.3rem' }}
  />
)

export const projectTabProject: ProjectTabSection = {
  [ProjectSlugs.OPTIMIZE_CELL_ACTIVITY_NON_HODGKINS]: {
    ...commonProjectTab,
    content: [
      {
        properties: {
          content: 'Help raise $200,000 to get this project launched!',
          icon: IconTextAlertIcons.ROCKET,
          heading: 'Project Start-Up',
        },
        type: 'iconTextAlert',
      },
      {
        content: 'Project Summary',
        topPadding: true,
        type: 'topHeading',
      },
      ...mapToParagraphs({
        collection: [
          'Lymphoma impacts the lymph system, which functions within the immune system—meaning the place that fights infection and disease in your body is under attack by this type of cancer. While the infected cells begin in places such as lymph nodes, the spleen, and digestive tract, it is a rapidly progressive disease that can aggressively grow and spread.',
          'We want to train cells to deliver more potent anti-cancer activity. We will work with highly immunodeficient mice to create a model to evaluate our CAR-T cell therapy approach. It is our near-term aim to advance into clinical trial design and implementation to treat relapsed lymphoma and leukemia. To get there, our year-long Phase 1 will focus on perfecting concept, experimental protocol, and initial testing.',
        ],
      }),
      {
        properties: {
          projectLength: '1 year',
          projectGoal:
            'Launch preliminary research to create the most effective strategy for CAR-T cells to attack malignant cells',
          projectResearchType: 'Exploratory',
          topPadding: true,
        },
        type: 'tabletProjectSummary',
      } as ProjectTabContentTableProjectSummary,
      {
        content: 'Why This Research is Important',
        topPadding: true,
        type: 'heading',
      },
      {
        properties: {
          stats: [
            {
              title: '81,560',
              description:
                'people are diagnosed with Non-Hodgkin’s lymphoma in the U.S annually.',
            },
            {
              title: '23,100',
              description:
                'patients die from Non-Hodgkin’s lymphoma every year in the US.',
            },
          ],
          v2: true,
        },
        topPadding: true,
        type: 'stats',
      } as ProjectTabContentStats,
      ...mapToParagraphs({
        collection: [
          'By converting highly functional cytotoxic T cells into CAR-T cells, we hypothesize that we could generate CAR-T cells with more potent anti-cancer activity and prolong their lifespan in patients.',
          'To visualize, this is like forming an army recruited from Olympic biathlon teams with previous military experience—and having high expectations that they will be more effective soldiers than, say, random individuals with no previous training (a good comparison for how CAR-T cells currently work).',
        ],
      }),
      {
        content: 'What Funding Helps Achieve',
        topPadding: true,
        type: 'heading',
      },
      {
        getProperties: ({ onClickTab }) => {
          return {
            style: { marginTop: '1rem' },
            tabs: [
              {
                content: (
                  <>
                    <Paragraph>
                      Build the team, research plan, and preliminary testing
                      strategy to begin defining and driving a powerful protocol
                      for CAR-T cell development.
                    </Paragraph>
                    <img
                      alt={IMAGE_PROPS_PROJECT_LK4S12M_GRAPH.getAlt()}
                      src={IMAGE_PROPS_PROJECT_LK4S12M_GRAPH.getSrc()}
                      style={{ marginTop: '1rem' }}
                    />
                    <Accordion
                      data={[
                        {
                          content: (
                            <TableLegend
                              data={[
                                {
                                  code: (
                                    <TableLegendCircle
                                      style={{ background: '#B8E8EB' }}
                                    />
                                  ),
                                  name: 'Personnel',
                                  description: '$100,000',
                                },
                                {
                                  code: (
                                    <TableLegendCircle
                                      style={{ background: '#00C0CC' }}
                                    />
                                  ),
                                  name: 'Equipment',
                                  description: '$20,000',
                                },
                                {
                                  code: (
                                    <TableLegendCircle
                                      style={{ background: '#004549' }}
                                    />
                                  ),
                                  name: 'Materials and supplies',
                                  description: '$50,000',
                                },
                                {
                                  code: (
                                    <TableLegendCircle
                                      style={{ background: '#A4B6D4' }}
                                    />
                                  ),
                                  name: 'Animal models',
                                  description: '$20,000',
                                },
                                {
                                  code: (
                                    <TableLegendCircle
                                      style={{ background: '#1535A9' }}
                                    />
                                  ),
                                  name: 'Drugs',
                                  description: '$5,000',
                                },
                                {
                                  code: (
                                    <TableLegendCircle
                                      style={{ background: '#233269' }}
                                    />
                                  ),
                                  name: 'Publication',
                                  description: '$3,000',
                                },
                                {
                                  code: (
                                    <TableLegendCircle
                                      style={{ background: '#E2E2E3' }}
                                    />
                                  ),
                                  name: 'Facilities and admin',
                                  description: '$5,000',
                                },
                              ]}
                            />
                          ),
                          id: 'with-table',
                          heading: 'View Details',
                        },
                      ]}
                    />
                  </>
                ),
                renderFooter: ({ setCurrentTabId }) => {
                  const router = useRouter()
                  return (
                    <InfoBox>
                      <a
                        onClick={() => {
                          setCurrentTabId('whats-next-2022')
                          router.replace(
                            `/projects/${ProjectSlugs.OPTIMIZE_CELL_ACTIVITY_NON_HODGKINS}#whats-next-2022`
                          )
                        }}
                      >
                        $200,000 is needed to launch this project. See what
                        comes next
                      </a>
                      {longArrowRightImg}
                    </InfoBox>
                  )
                },
                id: 'project-startup',
                title: 'PROJECT START-UP 2021',
              },
              {
                content: (
                  <>
                    <Paragraph>
                      Upon successful completion of phase 1, we will be able to
                      unlock a scalable project to collect and examine the
                      necessary amount of data to drive real discovery. Each of
                      our 4 phases will build to our goal of launching a
                      clinical trial for effective patient therapeutics.
                    </Paragraph>
                    <PurpleLink
                      href="#research-tab"
                      onClick={() => {
                        onClickTab('Research')
                      }}
                    >
                      Dig deeper into the Research
                      {longArrowRightPurpleImg}
                    </PurpleLink>
                    {graphLockedImg}
                  </>
                ),
                renderFooter: () => (
                  <InfoBoxLocked>
                    <Paragraph>
                      This Funding Goal will be unlocked if Project Start-Up is
                      successful
                    </Paragraph>
                  </InfoBoxLocked>
                ),
                id: 'whats-next-2022',
                title: "WHAT'S NEXT: 2022",
              },
            ],
          }
        },
        type: 'singleFocusedTabs',
      } as ProjectTabContentSingleFocusedTabs,
      {
        content: 'Research Team',
        topPadding: true,
        type: 'heading',
      },
      {
        properties: {
          avatar: IMAGE_PROPS_PROJECT_LK4S12M_HARRIS_GOLDSTEIN.getSrc(),
          hIndex: 27,
          hIndexTooltipContent,
          role: 'Lead Researcher',
          title: 'Harris Goldstein, MD',
        },
        topPadding: true,
        type: 'teamMember',
      } as ProjectTabContentTeamMember,
      {
        content:
          'Dr. Goldstein is a leading expert in microbiology, immunology, and autoimmune diseases with a specific focus on cancer and HIV research and genetic programming of immune responses, among other scientific areas.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        properties: {
          avatar: IMAGE_PROPS_FOUNDATION_ALBERT_EINSTEIN.getSrc(),
          location: 'New York, United States',
          title: 'Albert Einstein College of Medicine',
        },
        topPadding: true,
        type: 'teamMember',
      } as ProjectTabContentTeamMember,
      {
        content:
          'Einstein research teams have contributed to the world’s knowledge base in life-saving ways, including leading the largest early-stage breast cancer clinical trial in history. We also discovered a compound that makes cancer cells self-destruct while sparing healthy cells and drove the clinical trial into the first promising drug against COVID-19, among other notable breakthroughs.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        content:
          'The research enterprise is growing quickly with $197.3 million in NIH funding earned in 2020.',
        topPadding: true,
        type: 'paragraph',
      },
    ],
  },
  [ProjectSlugs.UNTANGLING_POSTPARTUM_DEPRESSION]: {
    ...commonProjectTab,
    content: [
      {
        properties: {
          content: 'Help raise $25,000 to get this project launched!',
          icon: IconTextAlertIcons.ROCKET,
          heading: 'Project Start-Up',
        },
        type: 'iconTextAlert',
      },
      {
        content: 'Project Summary',
        topPadding: true,
        type: 'topHeading',
      },
      ...mapToParagraphs({
        collection: [
          '80% of birth and adoptive mothers will experience some form of anxiety or depression after birth, known as the "baby blues".',
          'We plan to use an animal model of postpartum depression to uncover the impact of stress on the brain circuits that control maternal behavior. ',
          'Upon identifying how stress affects these circuits, we will attempt to block the effects of stress by manipulating these brain cells. We will conduct extensive review of these findings to identify how stress impacts a mother’s brain circuitry and how that brain function affects parental behaviors.',
        ],
      }),
      {
        properties: {
          projectLength: '1 year',
          projectGoal:
            'Identify how stress impacts a mother’s brain circuitry and how that brain function affects parental behaviors.',
          projectResearchType: 'Exploratory',
          topPadding: true,
        },
        type: 'tabletProjectSummary',
      } as ProjectTabContentTableProjectSummary,
      {
        content: 'Why This Research is Important',
        topPadding: true,
        type: 'heading',
      },
      {
        properties: {
          stats: [
            {
              title: '15%',
              description:
                'of mothers experience postpartum depression and 10% of fathers',
            },
            {
              title: '7th',
              description:
                'Suicide is the 7th leading cause of maternal death in the U.S.',
            },
          ],
          v2: true,
        },
        topPadding: true,
        type: 'stats',
      } as ProjectTabContentStats,
      {
        content:
          'Caring for a new baby often feels overwhelming and can lead to feelings of inadequacy or experiences of extreme distress. These feelings are normal and have a biological basis that can be understood by decoding the brain. Our research holds promise in informing the most effective therapeutics for postpartum depression so more mothers can experience the joys of caring for their newborn.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        content: 'What Funding Helps Achieve',
        topPadding: true,
        type: 'heading',
      },
      {
        getProperties: ({ onClickTab }) => {
          return {
            style: { marginTop: '1rem' },
            tabs: [
              {
                content: (
                  <>
                    <Paragraph>
                      In the start-up phase, we will use an animal model of
                      postpartum depression to uncover the impact of stress on
                      the brain circuits that control maternal behavior.
                    </Paragraph>
                    <img
                      alt={IMAGE_PROPS_PROJECT_A4D04DF_GRAPH.getAlt()}
                      src={IMAGE_PROPS_PROJECT_A4D04DF_GRAPH.getSrc()}
                      style={{ marginTop: '1rem' }}
                    />
                    <Accordion
                      data={[
                        {
                          content: (
                            <TableLegend
                              data={[
                                {
                                  code: (
                                    <TableLegendCircle
                                      style={{ background: '#B8E8EB' }}
                                    />
                                  ),
                                  name: 'Lab consumables',
                                  description: '$5,000',
                                },
                                {
                                  code: (
                                    <TableLegendCircle
                                      style={{ background: '#00C0CC' }}
                                    />
                                  ),
                                  name: 'Animal models',
                                  description: '$15,000',
                                },
                                {
                                  code: (
                                    <TableLegendCircle
                                      style={{ background: '#004549' }}
                                    />
                                  ),
                                  name: 'Facilities & admin',
                                  description: '$5,000',
                                },
                              ]}
                            />
                          ),
                          id: 'with-table',
                          heading: 'View Details',
                        },
                      ]}
                    />
                  </>
                ),
                renderFooter: ({ setCurrentTabId }) => {
                  const router = useRouter()
                  return (
                    <InfoBox>
                      <a
                        onClick={() => {
                          setCurrentTabId('whats-next-2022')
                          router.replace(
                            `/projects/${ProjectSlugs.UNTANGLING_POSTPARTUM_DEPRESSION}#whats-next-2022`
                          )
                        }}
                      >
                        $25,000 is needed to launch this project. See what comes
                        next
                      </a>
                      {longArrowRightImg}
                    </InfoBox>
                  )
                },
                id: 'project-startup',
                title: 'PROJECT START-UP 2021',
              },
              {
                content: (
                  <>
                    <Paragraph>
                      Following this research protocol, the team will submit
                      their paper for publication — a crucial step in driving
                      the conversation across the scientific and medical
                      communities. These basic science findings hold promise in
                      leading to meaningful therapeutic and clinical impact.
                    </Paragraph>
                    <PurpleLink
                      href="#research-tab"
                      onClick={() => {
                        onClickTab('Research')
                      }}
                    >
                      Dig deeper into the Research
                      {longArrowRightPurpleImg}
                    </PurpleLink>
                    {graphLockedImg}
                  </>
                ),
                renderFooter: () => (
                  <InfoBoxLocked>
                    <Paragraph>
                      This Funding Goal will be unlocked if Project Start-Up is
                      successful
                    </Paragraph>
                  </InfoBoxLocked>
                ),
                id: 'whats-next-2022',
                title: "WHAT'S NEXT: 2022",
              },
            ],
          }
        },
        type: 'singleFocusedTabs',
      } as ProjectTabContentSingleFocusedTabs,
      {
        content: 'Research Team',
        topPadding: true,
        type: 'heading',
      },
      {
        properties: {
          avatar: IMAGE_PROPS_PROJECT_A4D04DF_AVATAR_ANITA.getSrc(),
          hIndex: 17,
          hIndexTooltipContent,
          role: 'Lead Researcher',
          title: 'Anita Autry, PhD',
        },
        topPadding: true,
        type: 'teamMember',
      } as ProjectTabContentTeamMember,
      {
        properties: {
          avatar: IMAGE_PROPS_PROJECT_A4D04DF_AVATAR_BRENDA.getSrc(),
          role: 'Graduate Student Researcher',
          title: 'Brenda Abdelmesih',
        },
        topPadding: true,
        type: 'teamMember',
      } as ProjectTabContentTeamMember,
      {
        content:
          "An inspiring mentor-mentee team, Dr. Autry and Brenda are energized rising stars in social neuroscience. They conduct their research within Einstein's Dominick P. Purpura Department of Neuroscience and contribute novel discoveries to the esteemed Brain Science Initiative.",
        topPadding: true,
        type: 'paragraph',
      },
      {
        properties: {
          avatar: IMAGE_PROPS_FOUNDATION_ALBERT_EINSTEIN.getSrc(),
          location: 'New York, United States',
          title: 'Albert Einstein College of Medicine',
        },
        topPadding: true,
        type: 'teamMember',
      } as ProjectTabContentTeamMember,
      {
        content:
          'Einstein research teams have contributed to the world’s knowledge base in life-saving ways, including leading the largest early-stage breast cancer clinical trial in history. We also discovered a compound that makes cancer cells self-destruct while sparing healthy cells and drove the clinical trial into the first promising drug against COVID-19, among other notable breakthroughs.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        content:
          'The research enterprise is growing quickly with $197.3 million in NIH funding earned in 2020.',
        topPadding: true,
        type: 'paragraph',
      },
    ],
  },
  [ProjectSlugs.SLOW_PANCREATIC_CANCER_GROWTH]: {
    ...commonProjectTab,
    content: [
      {
        properties: {
          content: 'Help raise $60,000 to get this project launched!',
          icon: IconTextAlertIcons.ROCKET,
          heading: 'Project Start-Up',
        },
        type: 'iconTextAlert',
      },
      {
        content: 'Project Summary',
        topPadding: true,
        type: 'topHeading',
      },
      ...mapToParagraphs({
        collection: [
          'Roughly 90% of cells that make up pancreatic cancer tumors are actually not cancerous. We want to investigate the role of these special cells, called stromal cells, in creating an environment for the tumor to grow so we can disrupt it.',
          'We’ve been studying similar cells derived from bone marrow in our lab for years and want to apply our learnings to pancreatic cancer cells.',
          'At the end of the start-up phase, we anticipate validating our observations and generating a list of potential pancreatic cancer factors that stimulate stromal cells to promote cancer growth that we can investigate further.',
        ],
      }),
      {
        properties: {
          projectLength: '9-12 months',
          projectGoal:
            'To validate our observations and generate a list of factors that stimulate growth that we can investigate further.',
          projectResearchType: 'Exploratory',
          topPadding: true,
        },
        type: 'tabletProjectSummary',
      } as ProjectTabContentTableProjectSummary,
      {
        content: 'Why This Research is Important',
        topPadding: true,
        type: 'heading',
      },
      {
        properties: {
          stats: [
            {
              title: '40,000+',
              description:
                'are diagnosed and die from pancreatic cancer in the U.S. every year.',
            },
            {
              title: '<10%',
              description:
                'is the 5 year survival rate for those diagnosed with pancreatic cancer.',
            },
          ],
          v2: true,
        },
        topPadding: true,
        type: 'stats',
      } as ProjectTabContentStats,
      {
        content:
          "There haven't been significant advancements in pancreatic cancer treatment in the last 20 years. We believe the lack of progress in treatments for pancreatic cancer is partly due to the lack of focus on the non-cancerous cells that surround the tumor.",
        topPadding: true,
        type: 'paragraph',
      },
      {
        content: 'What Funding Helps Achieve',
        topPadding: true,
        type: 'heading',
      },
      {
        getProperties: ({ onClickTab }) => {
          return {
            style: { marginTop: '1rem' },
            tabs: [
              {
                content: (
                  <>
                    <Paragraph>
                      If the start up phase generates a list of potential tumour
                      generating agents, we will then evaluate each of these
                      factors individually and in combination in promoting the
                      production of IL-6 from the stromal cells and promoting
                      pancreatic cancer cell growth.
                    </Paragraph>
                    <img
                      alt={IMAGE_PROPS_PROJECT_35UEmH7_GRAPH.getAlt()}
                      src={IMAGE_PROPS_PROJECT_35UEmH7_GRAPH.getSrc()}
                      style={{ marginTop: '1rem' }}
                    />
                    <Accordion
                      data={[
                        {
                          content: (
                            <TableLegend
                              data={[
                                {
                                  code: (
                                    <TableLegendCircle
                                      style={{ background: '#B8E8EB' }}
                                    />
                                  ),
                                  name: 'Hire a Post Doctoral Fellow',
                                  description: '$40,000',
                                },
                                {
                                  code: (
                                    <TableLegendCircle
                                      style={{ background: '#00C0CC' }}
                                    />
                                  ),
                                  name: 'Cost of materials, reagents and supplies',
                                  description: '$20,000',
                                },
                              ]}
                            />
                          ),
                          id: 'with-table',
                          heading: 'View Details',
                        },
                      ]}
                    />
                  </>
                ),
                renderFooter: ({ setCurrentTabId }) => {
                  const router = useRouter()
                  return (
                    <InfoBox>
                      <a
                        onClick={() => {
                          setCurrentTabId('whats-next-2022')
                          router.replace(
                            `/projects/${ProjectSlugs.SLOW_PANCREATIC_CANCER_GROWTH}#whats-next-2022`
                          )
                        }}
                      >
                        $60,000 is needed to launch this project. See what comes
                        next
                      </a>
                      {longArrowRightImg}
                    </InfoBox>
                  )
                },
                id: 'project-startup',
                title: 'PROJECT START-UP 2021',
              },
              {
                content: (
                  <>
                    <Paragraph>
                      If the start up phase generates a list of potential tumour
                      generating agents, we will then evaluate each of these
                      factors individually and in combination in promoting the
                      production of IL-6 from the stromal cells and promoting
                      pancreatic cancer cell growth.
                    </Paragraph>
                    <PurpleLink
                      href="#research-tab"
                      onClick={() => {
                        onClickTab('Research')
                      }}
                    >
                      Dig deeper into the Research
                      {longArrowRightPurpleImg}
                    </PurpleLink>
                    {graphLockedImg}
                  </>
                ),
                renderFooter: () => (
                  <InfoBoxLocked>
                    <Paragraph>
                      This Funding Goal will be unlocked if Project Start-Up is
                      successful
                    </Paragraph>
                  </InfoBoxLocked>
                ),
                id: 'whats-next-2022',
                title: "WHAT'S NEXT: 2022",
              },
            ],
          }
        },
        type: 'singleFocusedTabs',
      } as ProjectTabContentSingleFocusedTabs,
      {
        content: 'Research Team',
        topPadding: true,
        type: 'heading',
      },
      {
        properties: {
          avatar: IMAGE_PROPS_PROJECT_35UEmH7_AVATAR_ARMAND_KEATING.getSrc(),
          hIndex: 60,
          hIndexTooltipContent,
          role: 'Lead Researcher',
          title: 'Dr. Armand Keating, MD FRCPC',
        },
        topPadding: true,
        type: 'teamMember',
      } as ProjectTabContentTeamMember,
      {
        content:
          'Dr. Keating was a Cancer Research Scientist at the National Cancer Institute of Canada for 10 years and a Senior Scientist at the Toronto General Research Institute for many years. He established the largest stem cell transplantation program in Canada at University Health Network, Toronto.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        properties: {
          avatar: IMAGE_PROPS_FOUNDATION_PMCF_UHN.getSrc(),
          location: 'Toronto, Canada',
          title: 'Cell Therapy Translational Research Lab',
        },
        topPadding: true,
        type: 'teamMember',
      } as ProjectTabContentTeamMember,
      {
        content:
          'The Cell Therapy Translational Research Laboratory is part of the University Health Network (UHN). It focuses on developing treatment strategies for cancer and degenerative diseases using immune and other cells of the body.',
        topPadding: true,
        type: 'paragraph',
      },
    ],
  },
  [ProjectSlugs.ALZHEIMERS_DISEASE_DETECTION]: {
    ...commonProjectTab,
    content: [
      {
        properties: {
          content: 'Help raise $1M to get this project launched!',
          icon: IconTextAlertIcons.ROCKET,
          heading: 'Project Start-Up',
        },
        type: 'iconTextAlert',
      },
      {
        content: 'Project Summary',
        topPadding: true,
        type: 'topHeading',
      },
      ...mapToParagraphs({
        collection: [
          'Through a program we’ve created to build a trial-ready cohort, we have recruited 40,000 people interested in getting involved in clinical trials aimed at discovering treatments that will reduce the risk of AD. These people, all age 50 and older, have been screened and are members of the general population.',
          'We want to invite 2,000 of these people for blood sample analysis every other year for the next 6 years. Our goal is to work with these people to find a blood test that accurately and reliably detects AD before any symptoms of memory loss occurs.',
          'If found, this test will make it easier for people at risk to get involved in AD research and, ultimately, help us find a treatment or cure for AD faster.',
          'This project is focused on raising funds for the first round of blood tests.',
        ],
      }),
      {
        properties: {
          projectLength: '2 years',
          projectGoal:
            "To identify a reliable blood test for Alzheimer's Disease before symptoms appear",
          projectResearchType: 'Clinical Trial',
          topPadding: true,
        },
        type: 'tabletProjectSummary',
      } as ProjectTabContentTableProjectSummary,
      {
        content: 'Why This Research is Important',
        topPadding: true,
        type: 'heading',
      },
      {
        properties: {
          stats: [
            {
              title: '6M+',
              description: 'Number of Americans living with AD.',
            },
            {
              title: '1 in 4',
              description:
                '65 year olds already have amyloid building up in their brain but do not yet have memory loss',
            },
          ],
          v2: true,
        },
        topPadding: true,
        type: 'stats',
      } as ProjectTabContentStats,
      ...mapToParagraphs({
        collection: [
          'Until recently Alzheimer’s disease could only be diagnosed definitively after death, by linking clinical measures with an examination of brain tissue in an autopsy.',
          'In the past ten years it has been shown that experimental neuromolecular imaging can diagnose AD, even in people who are not yet experiencing memory impairment. Now, blood tests for the proteins that damage the brain have been found. If successful, this study could find a diagnostic test that can be easily and safely administered to the general population.',
          'An early diagnosis gives people more opportunities to participate in clinical trials that are testing possible new treatments for Alzheimer’s disease.',
          'Beginning treatment early in the disease process may help preserve daily function for some time, even though the underlying disease process can’t be stopped or reversed.',
        ],
      }),
      {
        content: 'What Funding Helps Achieve',
        topPadding: true,
        type: 'heading',
      },
      {
        getProperties: ({ onClickTab }) => {
          return {
            style: { marginTop: '1rem' },
            tabs: [
              {
                content: (
                  <>
                    <Paragraph>
                      In the start-up phase, we want to raise enough money to
                      administer the first blood test for 2,000 people. This
                      cohort of 2,000 will require 4 blood tests in total over
                      the next 6 years.
                    </Paragraph>
                    <img
                      alt={IMAGE_PROPS_PROJECT_YR8UGE2_GRAPH.getAlt()}
                      src={IMAGE_PROPS_PROJECT_YR8UGE2_GRAPH.getSrc()}
                      style={{ marginTop: '1rem' }}
                    />
                    <Accordion
                      data={[
                        {
                          content: (
                            <TableLegend
                              data={[
                                {
                                  code: (
                                    <TableLegendCircle
                                      style={{ background: '#B8E8EB' }}
                                    />
                                  ),
                                  name: 'Blood tests ($500 x 2000 people)',
                                  description: '$1M',
                                },
                              ]}
                            />
                          ),
                          id: 'with-table',
                          heading: 'View Details',
                        },
                      ]}
                    />
                  </>
                ),
                renderFooter: ({ setCurrentTabId }) => {
                  const router = useRouter()
                  return (
                    <InfoBox>
                      <a
                        onClick={() => {
                          setCurrentTabId('whats-next-2022')
                          router.replace(
                            `/projects/${ProjectSlugs.ALZHEIMERS_DISEASE_DETECTION}#whats-next-2022`
                          )
                        }}
                      >
                        $1M is needed to launch this project. See what comes
                        next
                      </a>
                      {longArrowRightImg}
                    </InfoBox>
                  )
                },
                id: 'project-startup',
                title: 'PROJECT START-UP 2021',
              },
              {
                content: (
                  <>
                    <Paragraph>
                      Two years after we’ve given our first blood test, we want
                      to raise enough money to administer the second blood test
                      for our cohort of 2,000 people.
                    </Paragraph>
                    <PurpleLink
                      href="#research-tab"
                      onClick={() => {
                        onClickTab('Research')
                      }}
                    >
                      Dig deeper into the Research
                      {longArrowRightPurpleImg}
                    </PurpleLink>
                    {graphLockedImg}
                  </>
                ),
                renderFooter: () => (
                  <InfoBoxLocked>
                    <Paragraph>
                      This Funding Goal will be unlocked if Project Start-Up is
                      successful
                    </Paragraph>
                  </InfoBoxLocked>
                ),
                id: 'whats-next-2022',
                title: "WHAT'S NEXT: 2022",
              },
            ],
          }
        },
        type: 'singleFocusedTabs',
      } as ProjectTabContentSingleFocusedTabs,
      {
        content: 'Research Team',
        topPadding: true,
        type: 'heading',
      },
      {
        properties: {
          avatar: IMAGE_PROPS_PROJECT_YR8UGE2_AVATAR_PAUL_AISEN.getSrc(),
          hIndex: 80,
          hIndexTooltipContent,
          role: 'Professor of Neurology and Director of ATRI',
          title: 'Dr. Paul Aisen',
        },
        topPadding: true,
        type: 'teamMember',
      } as ProjectTabContentTeamMember,
      ...mapToParagraphs({
        collection: [
          'Dr. Aisen founded the Alzheimer’s Therapeutic Research Institute (ATRI) at the University of Southern California (USC) in 2015. Dr. Aisen has been a leading figure in Alzheimer’s disease research for more than three decades, having developed novel methodologies as well as designed and directed many large therapeutic trials.',
          "In November 2018, Expertscape recognized Dr. Aisen as one of the world's top-ranked experts in Alzheimer's disease.",
        ],
      }),
      {
        properties: {
          avatar: IMAGE_PROPS_FOUNDATION_ATRI_USC.getSrc(),
          location: 'San Diego, California',
          title: 'Alzheimer’s Therapeutic Research Institute at USC',
        },
        topPadding: true,
        type: 'teamMember',
      } as ProjectTabContentTeamMember,
      ...mapToParagraphs({
        collection: [
          'USC ATRI is one of only three institutions leading the National Institute on Ageing’s (NIA) Alzhiemer’s Clinical Trial Consortium (ACTC) dedicated to finding a prevention and cure.',
          'USC ATRI promotes extensive collaboration, or team science, and data sharing across many types of partners in the quest for the first survivor.',
        ],
      }),
    ],
  },
}
