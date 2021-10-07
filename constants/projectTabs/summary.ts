import {
  ProjectSlugs,
  ProjectTabContentLink,
  ProjectTabContentStats,
  ProjectTabName,
  ProjectTabSection,
} from './types'
import { mapToParagraphs } from './utils'

const commonSummaryTab = {
  clickID: 'project-page-click-summary',
  tabName: ProjectTabName.Summary,
}

const learnMoreLinkContent = {
  content: 'Learn More',
  properties: {
    href: '#disease-tab',
    tabToSet: 'Diease',
  },
  topPadding: true,
  type: 'link',
} as ProjectTabContentLink

const moreResearchLinkContent = {
  content: 'More research',
  properties: {
    href: '#research-tab',
    tabToSet: 'Research',
  },
  topPadding: true,
  type: 'link',
} as ProjectTabContentLink

const teamLinkContent = {
  content: 'About the team',
  properties: {
    href: '#team-tab',
    tabToSet: 'Team',
  },
  topPadding: true,
  type: 'link',
} as ProjectTabContentLink

export const projectTabSummary: ProjectTabSection = {
  [ProjectSlugs.SEQUENCING_BILIARY_TRACT_CANCERS]: {
    ...commonSummaryTab,
    content: [
      {
        content: 'The Impact of Biliary Tract Cancer',
        type: 'topHeading',
      },
      {
        content:
          'Biliary tract cancers (BTCs) refer to a group of cancers that include gallbladder cancer (GBC) and bile duct cancer. BTCs are rare but on the rise, and those who are diagnosed face limited options and a very high mortality rate. There hasn’t been a lot of progress in the treatment of BTCs because the biology of these tumors is still poorly understood.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        properties: {
          stats: [
            {
              title: '8,000',
              description:
                'The number of people in the U.S. that develop bile duct cancer per year.',
            },
            {
              title: '< 1 year',
              description: 'The survival rate for those with advanced disease.',
            },
            {
              title: 'Age 50',
              description:
                'More people are getting diagnosed with over 25% diagnosed younger than 50.',
            },
          ],
        },
        topPadding: true,
        type: 'stats',
      } as ProjectTabContentStats,
      learnMoreLinkContent,
      {
        content: 'Using DNA Sequencing to Find Effective Treatments',
        topPadding: true,
        type: 'heading',
      },
      {
        content:
          'The purpose of this study is to better understand the biology of biliary tract cancers, so we can know why they develop and what treatments are best.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        content:
          'We plan to recruit 60-90 patients over 3 years. We will collect blood and tumor samples from these patients to study BTCs on a molecular level and then use this information to build a database that we can share with researchers around the world.',
        topPadding: true,
        type: 'paragraph',
      },
      moreResearchLinkContent,
      {
        content: 'Treating The Highest Number of BTC Patients in Canada',
        topPadding: true,
        type: 'heading',
      },
      {
        content:
          'The Princess Margaret Cancer Centre and University Health Network are the largest medical group in Canada. We treat the highest volume of BTCs in the country. Our large group of surgeons, liver doctors, oncologists and researchers has allowed to us to develop an expert team in this field.',
        topPadding: true,
        type: 'paragraph',
      },
      teamLinkContent,
      {
        content: 'Latest Updates',
        topPadding: true,
        type: 'heading',
      },
      {
        content: 'There is currently no update',
        topPadding: true,
        type: 'paragraph',
      },
    ],
  },
  [ProjectSlugs.BREAST_CANCER_RELAPSE]: {
    ...commonSummaryTab,
    content: [
      {
        content: 'The Impact of Breast Cancer',
        topPadding: false,
        type: 'topHeading',
      },
      {
        content:
          'While current therapies can be effective, treatment fails for many women with breast cancer. They go on to experience incurable relapses due to limited treatment options. The breast cancers that are most likely to relapse tend to affect younger women, amplifying impacts on the individual and families.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        properties: {
          stats: [
            {
              title: '1 in 8',
              description:
                'The number of women who will develop invasive breast cancer in their lifetime.',
            },
            {
              title: '300,000',
              description:
                'The approximate number of Americans diagnosed with breast cancer each year.',
            },
            {
              title: '20%',
              description:
                'The percentage of breast cancer patients who relapse and die after standard therapy.',
            },
          ],
        },
        topPadding: true,
        type: 'stats',
      } as ProjectTabContentStats,
      learnMoreLinkContent,
      {
        content: 'Turning Tumor Weaknesses Into Treatment Opportunities',
        topPadding: true,
        type: 'heading',
      },
      {
        content:
          'We still don’t fully understand why standard breast cancer therapy fails. Recent advances in technologies and artificial intelligence enable us to study breast cancer relapse with clarity like never before. We want to create and analyze an atlas of changes that occur in tumors that relapse to find new treatments.',
        topPadding: true,
        type: 'paragraph',
      },
      moreResearchLinkContent,
      {
        content: 'Over 30 Years Experience in Breast Cancer Research',
        topPadding: true,
        type: 'heading',
      },
      {
        content:
          'Our leadership embodies our scientific rigour and clinical excellence. Drs. Lupien and Cescon combine over 30 years of experience in breast cancer research. In 2016, they joined forces to build a dream team of 10 world-experts and their staff (>100). They are set on finding a cure for breast cancer relapse.',
        topPadding: true,
        type: 'paragraph',
      },
      teamLinkContent,
      {
        content: 'Latest Updates',
        topPadding: true,
        type: 'heading',
      },
      {
        content: 'There is currently no update',
        topPadding: true,
        type: 'paragraph',
      },
    ],
  },
  [ProjectSlugs.PERSONALIZED_BREAST_CANCER_TREATMENT]: {
    ...commonSummaryTab,
    content: [
      {
        content: 'The Impact of Breast Cancer',
        topPadding: false,
        type: 'topHeading',
      },
      {
        content:
          'The current ways in which cancer drugs are tested is simply too slow. There are too many possible drug combinations for our traditional research approaches to handle. Our research will use machine learning to accelerate the pace of drug combination research to the benefit of millions of Canadian women.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        properties: {
          stats: [
            {
              title: '1 in 8',
              description:
                '1 in 8 women in the United States will be diagnosed with Breast Cancer.',
            },
            {
              title: '20',
              description:
                '20 women die of breast cancer for every 100,000 women.',
            },
            {
              title: 'No. 1',
              description:
                'Breast cancer is the most common form of new cancer diagnosis in women.',
            },
          ],
        },
        topPadding: true,
        type: 'stats',
      } as ProjectTabContentStats,
      learnMoreLinkContent,
      {
        content: 'Personalizing Breast Cancer Treatment Using Technology',
        topPadding: true,
        type: 'heading',
      },
      {
        content:
          'Our team uses new technologies to identify different breast cancer cells within a tumor. We then match cancer-fighting drugs to each identified tumor cell. The result is a personalized and highly effective treatment option for breast cancer patients.',
        topPadding: true,
        type: 'paragraph',
      },
      moreResearchLinkContent,
      {
        content: 'National Leaders in Predictive Therapeutic Modeling',
        topPadding: true,
        type: 'heading',
      },
      ...mapToParagraphs({
        collection: [
          'BHK Lab is a part of the Princess Margaret Cancer Centre (a research hospital within the University Health Network) and affiliated with the University of Toronto. Our research focuses on the development of new computer-based methods to evaluate cancer progression and targeted drug therapy.',
          'The combined team is composed of over 50 experts in genetics, computer science, bioinformatics and software development. We specialize in predictive tools to help physicians diagnose and treat cancer.',
        ],
      }),
      teamLinkContent,
      {
        content: 'Latest Updates',
        topPadding: true,
        type: 'heading',
      },
      {
        content: 'There is currently no update',
        topPadding: true,
        type: 'paragraph',
      },
    ],
  },
}
