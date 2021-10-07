import React from 'react'

import { cellStyles } from './constants'
import {
  ProjectTabName,
  ProjectTabSection,
  ProjectTabContentStats,
  ProjectTabContentImage,
  ProjectTabContentTable,
  ProjectSlugs,
} from './types'
import { mapToParagraphs } from './utils'

/* components */
import { LabeledAvatar } from '@/components/libraries/LabeledAvatar'
import {
  IMAGE_PROPS_PROJECT_57E36H3_GRAPH,
  IMAGE_PROPS_PROJECT_7CRQ2B2_GRAPH,
} from '../images'

const commonDiseaseTab = {
  clickID: 'project-page-click-disease',
  tabName: ProjectTabName.Disease,
}

export const projectTabDisease: ProjectTabSection = {
  [ProjectSlugs.SEQUENCING_BILIARY_TRACT_CANCERS]: {
    ...commonDiseaseTab,
    content: [
      {
        content: 'The Impact of Biliary Tract Cancer',
        topPadding: false,
        type: 'topHeading',
      },
      ...mapToParagraphs({
        collection: [
          'Biliary tract cancers (BTCs) refer to a group of cancers that include gallbladder cancer (GBC) and bile duct cancer. BTCs are rare but on the rise, and those who are diagnosed face limited options and a very high mortality rate. There hasn’t been a lot of progress in the treatment of BTCs because the biology of these tumors is still poorly understood.',
          'Bile duct cancer starts in the bile duct, a thin tube, about 4 to 5 inches long, that reaches from the liver to the small intestine. Patients may have weight loss, pain, jaundice, changes in their urine and stool and other general symptoms',
        ],
      }),
      {
        properties: {
          stats: [
            {
              title: '8,000',
              description:
                'The number of people in the U.S. that develop cholangiocarcinoma per year.',
            },
            {
              title: '< 1 year',
              description: 'The survival rate for those with advanced disease.',
            },
            {
              title: 'Age 50',
              description:
                'Incidence rate is rising with over 25% diagnosed younger than 50 years.',
            },
          ],
        },
        topPadding: true,
        type: 'stats',
      } as ProjectTabContentStats,
      {
        content: 'Biliary Tract Cancer - 5-Year Survival Rate',
        topPadding: true,
        type: 'heading',
      },
      {
        properties: {
          src: IMAGE_PROPS_PROJECT_7CRQ2B2_GRAPH.getSrc(),
        },
        topPadding: true,
        type: 'image',
      } as ProjectTabContentImage,
    ],
  },
  [ProjectSlugs.BREAST_CANCER_RELAPSE]: {
    ...commonDiseaseTab,
    content: [
      {
        content:
          'While current therapies can be effective, treatment fails for many women with breast cancer. They go on to experience incurable relapses due to limited treatment options. The breast cancers that are most likely to relapse tend to affect younger women, amplifying impacts on the individual and families.',
        topPadding: false,
        type: 'paragraph',
      },
      ...mapToParagraphs({
        collection: [
          'Biliary tract cancers (BTCs) refer to a group of cancers that include gallbladder cancer (GBC) and bile duct cancer. BTCs are rare but on the rise, and those who are diagnosed face limited options and a very high mortality rate. There hasn’t been a lot of progress in the treatment of BTCs because the biology of these tumors is still poorly understood.',
          'Bile duct cancer starts in the bile duct, a thin tube, about 4 to 5 inches long, that reaches from the liver to the small intestine. Patients may have weight loss, pain, jaundice, changes in their urine and stool and other general symptoms',
        ],
      }),
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
      {
        content: 'Breast Cancer - 5-Year Survival Rate',
        topPadding: true,
        type: 'heading',
      },
      {
        properties: {
          src: IMAGE_PROPS_PROJECT_57E36H3_GRAPH.getSrc(),
        },
        topPadding: true,
        type: 'image',
      } as ProjectTabContentImage,
    ],
  },
  [ProjectSlugs.PERSONALIZED_BREAST_CANCER_TREATMENT]: {
    ...commonDiseaseTab,
    content: [
      {
        content: 'The Impact of Breast Cancer',
        topPadding: false,
        type: 'topHeading',
      },
      {
        content:
          'The current ways in which cancer drugs are tested is simply too slow. There are too many possible drug combinations for our traditional research approaches to handle. Our research will use machine learning to accelerate the pace of drug combination research to the benefit of millions of Canadian women.',
        topPadding: false,
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
      {
        content: 'Breast Cancer - 5-Year Survival Rate',
        topPadding: true,
        type: 'heading',
      },
      {
        properties: {
          alt: 'graph',
          src: '/assets/images/projects/hk-graph.png',
        },
        topPadding: true,
        type: 'image',
      } as ProjectTabContentImage,
    ],
  },
  [ProjectSlugs.ALZHEIMERS_DISEASE_DETECTION]: {
    ...commonDiseaseTab,
    content: [
      {
        content: 'The Impact of Alzheimer’s Disease',
        topPadding: false,
        type: 'topHeading',
      },
      {
        content:
          'Alzheimer’s disease (AD) is a type of degenerative brain disease, affecting 1 in 14 people over the age of 65 and 1 in every 6 people over the age of 80.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        properties: {
          stats: [
            {
              title: '1 in 3',
              description:
                'A third of all seniors die with AD or another dementia',
            },
            {
              title: '6M+',
              description: 'number of Americans living with AD',
            },
            {
              title: '20 years',
              description:
                'The number of years AD is thought to begin before symptoms appear',
            },
          ],
        },
        topPadding: true,
        type: 'stats',
      } as ProjectTabContentStats,
      {
        content: 'The History of Alzheimer’s Disease',
        topPadding: true,
        type: 'heading',
      },
      {
        properties: {
          cellStyles: cellStyles.stages,
          columns: [
            { accessor: 'date', Header: 'Date' },
            { accessor: 'description', Header: 'Description' },
          ],
          data: [
            {
              date: '2400 years ago',
              description:
                'Plato remarks that aging and madness seem to be related',
            },
            {
              date: '1906',
              description:
                'Alois Alzheimer describes the symptoms and autopsy findings of his patient with dementia (as of 1910, called Alzheimer’s Disease). Alzheimer describes “PLAQUES and TANGLES” viewed microscopically in the brains for people with AD.',
            },
            {
              date: '1970',
              description:
                'AD is formally recognized as different from “normal memory loss” in aging',
            },
            {
              date: '1984',
              description:
                'National Institutes of Health (NIH) recognizes AD as a clinical diagnosis. The only way to officially diagnose AD is an autopsy to view plaques and tangles.',
            },
            {
              date: '1984',
              description:
                'Amyloid beta is identified as the main component of brain plaques in AD',
            },
            {
              date: '1994',
              description:
                'Former President of the United States Ronald Reagan announces that he has been diagnosed with AD. This leads to greater awareness of the disease.',
            },
            {
              date: '2004',
              description:
                'Alzheimer’s Disease Neuroimaging Initiative (ADNI) established to unify AD research.',
            },
            {
              date: '2007',
              description:
                'Amyloid is seen in the brain of a living AD patient with PET scan technology.',
            },
            {
              date: '2010',
              description:
                'Alzheimer’s is identified as the sixth leading cause of death in the United States.',
            },
            {
              date: '2010',
              description:
                'A publication shows that neuroimaging can identify AD long before symptoms appear!',
            },
            {
              date: '2019',
              description:
                'Journal of the American Medical Association publishes that brain imaging that detects AD significantly influenced the way physicians manage patients with mild cognitive impairment and dementia',
            },
            {
              date: (
                <LabeledAvatar
                  avatar="/assets/images/location-purple.png"
                  label="2020"
                />
              ),
              description:
                '6 million Americans are living with AD and the diagnosis no longer requires brain tissue. Technology improves to allow researchers to see plaques and tangles in the living brains of people who are symptomatic to allow “presumptive diagnosis” without autopsy or brain biopsy.',
            },
          ],
          highlightedDataRows: [11],
          showHeaderRow: false,
          topPadding: true,
        },
        type: 'table',
      } as ProjectTabContentTable,
      {
        content: 'Beyond 2020: The Last Mile to Treatment',
        topPadding: true,
        type: 'heading',
      },
      {
        content:
          'ATRI is actively studying multiple anti-amyloid therapies. American biotech company, Biogen, has submitted the first FDA application of an anti-amyloid treatment.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        content: 'Where the Research Is Going Next',
        topPadding: true,
        type: 'heading',
      },
      {
        content:
          'Diagnosis: Imaging and Blood tests that are precise and reliable for the detection of AD before any symptoms occur,Treatment: Safe and effective treatments to stop and reverse AD progression. Primary Prevention: screen young asymptomatic people, identify prodromal AD, and treat them before symptoms every begin.',
        topPadding: true,
        type: 'paragraph',
      },
    ],
  },
  [ProjectSlugs.ALZHEIMERS_DISEASE_DOWN_SYNDROME]: {
    ...commonDiseaseTab,
    content: [
      {
        content: 'The Impact of Alzheimer’s Disease',
        topPadding: false,
        type: 'topHeading',
      },
      {
        content:
          'The impact of Alzheimer’s disease (AD) is devastating. It robs people of their memories, and their ability to live their life out independently. AD disproportionately affects adults with Down syndrome (DS), nearly all those with DS over the age of 50 will have it.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        properties: {
          stats: [
            {
              title: '75%',
              description:
                'The percentage of people with Down Syndrome who will develop AD',
            },
            {
              title: 'No. 1',
              description:
                'AD is the number one cause of death in people with Down Syndrome over the age of 50',
            },
            {
              title: '1 in 10',
              description: 'The number of Americans over the age of 65 with AD',
            },
          ],
        },
        topPadding: true,
        type: 'stats',
      } as ProjectTabContentStats,
      {
        content: 'The History of Alzheimer’s Disease',
        topPadding: true,
        type: 'heading',
      },
      {
        properties: {
          cellStyles: cellStyles.stages,
          columns: [
            { accessor: 'date', Header: 'Date' },
            { accessor: 'description', Header: 'Description' },
          ],
          data: [
            {
              date: '2400 years ago',
              description:
                'Plato remarks that aging and madness seem to be related',
            },
            {
              date: '1906',
              description:
                'Alois Alzheimer describes the symptoms and autopsy findings of his patient with dementia (as of 1910, called Alzheimer’s Disease). Alzheimer describes “PLAQUES and TANGLES” viewed microscopically in the brains for people with AD.',
            },
            {
              date: '1970',
              description:
                'AD is formally recognized as different from “normal memory loss” in aging',
            },
            {
              date: '1984',
              description:
                'National Institutes of Health (NIH) recognizes AD as a clinical diagnosis. The only way to officially diagnose AD is an autopsy to view plaques and tangles.',
            },
            {
              date: '1984',
              description:
                'Amyloid beta is identified as the main component of brain plaques in AD',
            },
            {
              date: '1994',
              description:
                'Former President of the United States Ronald Reagan announces that he has been diagnosed with AD. This leads to greater awareness of the disease.',
            },
            {
              date: '2004',
              description:
                'Alzheimer’s Disease Neuroimaging Initiative (ADNI) established to unify AD research.',
            },
            {
              date: '2007',
              description:
                'Amyloid is seen in the brain of a living AD patient with PET scan technology.',
            },
            {
              date: '2010',
              description:
                'Alzheimer’s is identified as the sixth leading cause of death in the United States.',
            },
            {
              date: '2010',
              description:
                'A publication shows that neuroimaging can identify AD long before symptoms appear!',
            },
            {
              date: '2019',
              description:
                'Journal of the American Medical Association publishes that brain imaging that detects AD significantly influenced the way physicians manage patients with mild cognitive impairment and dementia',
            },
            {
              date: (
                <LabeledAvatar
                  avatar="/assets/images/location-purple.png"
                  label="2020"
                />
              ),
              description:
                '6 million Americans are living with AD and the diagnosis no longer requires brain tissue. Technology improves to allow researchers to see plaques and tangles in the living brains of people who are symptomatic to allow “presumptive diagnosis” without autopsy or brain biopsy.',
            },
          ],
          highlightedDataRows: [11],
          showHeaderRow: false,
          topPadding: true,
        },
        type: 'table',
      } as ProjectTabContentTable,
      {
        content: 'Beyond 2020: The Last Mile to Treatment',
        topPadding: true,
        type: 'heading',
      },
      {
        content:
          'ATRI is actively studying multiple anti-amyloid therapies. American biotech company, Biogen, has submitted the first FDA application of an anti-amyloid treatment.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        content: 'Where the Research Is Going Next',
        topPadding: true,
        type: 'heading',
      },
      {
        content:
          'Diagnosis: Imaging and Blood tests that are precise and reliable for the detection of AD before any symptoms occur, Treatment: Safe and effective treatments to stop and reverse AD progression. Primary Prevention: screen young asymptomatic people, identify prodromal AD, and treat them before symptoms every begin.',
        topPadding: true,
        type: 'paragraph',
      },
    ],
  },
}
