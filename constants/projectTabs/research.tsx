import React from 'react'

import { cellStyles } from './constants'
import {
  ProjectSlugs,
  ProjectTabContentOrderedList,
  ProjectTabContentTable,
  ProjectTabContentTableProjectBudget,
  ProjectTabContentTimeline,
  ProjectTabName,
  ProjectTabSection,
} from './types'

/* components */
import { LabeledAvatar } from '@/components/libraries/LabeledAvatar'
import { mapToParagraphs } from './utils'
import { Paragraph } from '@/components/Paragraph'
import { IMAGE_PROPS_LOCATION_PURPLE } from '../images'

const commonResearchTab = {
  clickID: 'project-page-click-research',
  tabName: ProjectTabName.Research,
}

export const projectTabResearch: ProjectTabSection = {
  [ProjectSlugs.OPTIMIZE_CELL_ACTIVITY_NON_HODGKINS]: {
    ...commonResearchTab,
    content: [
      {
        content: 'The Research Vision',
        type: 'topHeading',
      },
      ...mapToParagraphs({
        collection: [
          'We will work with highly immunodeficient mice to create an in vivo model for pre-clinical evaluation of our CAR-T cell therapy approach.',
          'We anticipate that data from this project will establish protocols for optimal CAR T-cell manufacture—both for pre-infusion TCR activation and expansion as well as post-infusion CAR T-cell activation and expansion.',
          'It is our near-term aim to advance into clinical trial design and implementation to treat relapsed lymphoma and leukemia.',
        ],
      }),
      {
        content: 'Who Will Benefit',
        topPadding: true,
        type: 'heading',
      },
      {
        content:
          'Success in this project will lead to a transformative cancer treatment option for the thousands of individuals diagnosed with Non-Hodgkin’s lymphoma, Hodgkin’s lymphoma, leukemia—and other devastating diseases. In short, this treatment could cure patients who would otherwise die.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        content: 'Research Timeline',
        topPadding: true,
        type: 'heading',
      },
      {
        properties: {
          list: [
            {
              content: 'Set up the study',
              status: 'in-progress',
              title: 'April 2021',
            },
            {
              content: 'Optimize the strategy of using in vivo approaches',
              status: 'in-progress',
              title: 'June 2021',
            },
            {
              content: 'Establish humanized model of lymphoma/leukemia',
              status: 'in-progress',
              title: 'Dec 2021',
            },
            {
              content:
                'Test strategy to eliminate lymphoma/leukemia cells in preclinical humanized mouse model',
              status: 'incomplete',
              title: 'June 2022',
            },
          ],
        },
        type: 'timeline',
      } as ProjectTabContentTimeline,
      {
        content: 'Research Budget',
        topPadding: true,
        type: 'heading',
      },
      {
        properties: {
          data: [
            {
              category: 'Personnel',
              description: 'Include consultants, if applicable',
              totalCostUsd: '$400,000',
            },
            {
              category: 'Equipment',
              description: '',
              totalCostUsd: '$80,000',
            },
            {
              category: 'Materials and supplies',
              description: '',
              totalCostUsd: '$200,000',
            },
            {
              category: 'Animal models',
              description: '',
              totalCostUsd: '$80,000',
            },
            {
              category: 'Drugs',
              description: '',
              totalCostUsd: '$20,000',
            },
            {
              category: 'Publication costs',
              description: '',
              totalCostUsd: '$12,000',
            },
            {
              category: 'Facilities and admin',
              description: '',
              totalCostUsd: '$20,000',
            },
            {
              category: 'Total',
              description: '',
              totalCostUsd: '$812,000',
              highlightBg: true,
              highlightText: true,
            },
          ],
          topPadding: true,
        },
        type: 'tabletProjectBudget',
      } as ProjectTabContentTableProjectBudget,
    ],
  },
  [ProjectSlugs.UNTANGLING_POSTPARTUM_DEPRESSION]: {
    ...commonResearchTab,
    content: [
      {
        content: 'The Research Vision',
        type: 'topHeading',
      },
      {
        content:
          'This research will examine the impact of stress on the brain circuits that control maternal behavior. It has the potential to make a significant impact on postpartum depression by developing a science-based foundation for building more targeted clinical interventions—ultimately, promoting healthy infant bonding for mothers everywhere.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        content:
          'Illuminating how the brain’s biology impacts maternal behavior will:',
        topPadding: true,
        type: 'paragraph',
      },
      {
        content:
          '1) enhance understanding of which individuals have risk factors that make them susceptible to postpartum mental disorders;',
        topPadding: true,
        type: 'paragraph',
      },
      {
        content:
          '2) highlight that susceptibility is biological rather than sociological, which will help to destigmatize maternal mental health; and',
        type: 'paragraph',
      },
      {
        content:
          '3) provide the basis for innovating novel therapeutic targets.',
        type: 'paragraph',
      },
      {
        content: 'Who Will Benefit',
        topPadding: true,
        type: 'heading',
      },
      {
        content:
          'Every year, 4 million babies are born in the United States. Up to 20% of mothers and 10% of fathers experience postpartum mental disorders annually.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        content:
          "These parental mental illnesses may impact the relationship between parent and baby during some of the most critical times for childhood development and bonding. Decoding the brain's mechanisms involved in this pathology could greatly benefit entire families and promote positive relationship building.",
        topPadding: true,
        type: 'paragraph',
      },
      {
        content: 'Research Timeline',
        topPadding: true,
        type: 'heading',
      },
      {
        properties: {
          list: [
            {
              content: 'Collect neural recording data',
              status: 'in-progress',
              title: 'August-September 2021',
            },
            {
              content: 'Analyze statistics',
              status: 'in-progress',
              title: 'October 2021',
            },
            {
              content: 'Analyze statistics',
              status: 'in-progress',
              title: 'November 2021',
            },
            {
              content: 'Collect neural manipulation data',
              status: 'incomplete',
              title: 'December-January 2022',
            },
            {
              content: 'Analyze statistics',
              status: 'incomplete',
              title: 'February 2022',
            },
            {
              content: 'Test impact of stress through behavioral assays',
              status: 'incomplete',
              title: 'March-April 2022',
            },
            {
              content: 'Analyze statistics',
              status: 'incomplete',
              title: 'May 2022',
            },
            {
              content: 'Prepare and submit manuscript',
              status: 'incomplete',
              title: 'June-August 2022',
            },
            {
              content: 'Publish study results',
              status: 'incomplete',
              title: 'September 2022',
            },
          ],
        },
        type: 'timeline',
      } as ProjectTabContentTimeline,
      {
        content: 'Research Budget',
        topPadding: true,
        type: 'heading',
      },
      {
        properties: {
          data: [
            {
              category: 'Materials and supplies',
              description: 'Lab consumables (i.e., gloves, pipet tips)',
              totalCostUsd: '$5,000',
            },
            {
              category: 'Animal models',
              description:
                '100 cages for animal models; viruses, antibodies, small implants for behavior',
              totalCostUsd: '$15,000',
            },
            {
              category: 'Facilities & admin',
              description: 'Core Facilities',
              totalCostUsd: '$5,000',
            },
            {
              category: 'Total',
              description: '',
              totalCostUsd: '$25,000',
              highlightBg: true,
              highlightText: true,
            },
          ],
          topPadding: true,
        },
        type: 'tabletProjectBudget',
      } as ProjectTabContentTableProjectBudget,
    ],
  },
  [ProjectSlugs.SLOW_PANCREATIC_CANCER_GROWTH]: {
    ...commonResearchTab,
    content: [
      {
        content: 'The Research Vision',
        type: 'topHeading',
      },
      ...mapToParagraphs({
        collection: [
          "Pancreatic cancer is one of the deadliest forms of cancer. It's difficult to detect in its early stages and even harder to treat.",
          'The vast majority (roughly 90%) of cells that make up a pancreatic cancer tumor are actually not cancerous. We believe these special cells, called stromal cells, create a mico-environment for the tumor to grow.',
          'Our lab has already been able to confirm:',
          '1. Bone marrow stromal cells send signals to the tumor cells.',
        ],
      }),
      ...mapToParagraphs({
        collection: [
          '2. This communication activates the stromal cells to release other factors that help the tumor grow.',
          '3. This feedback loop leads to an increase in a growth factor called interleukin-6 coming from the stromal cell.',
          '4. Tumor growth as a result of interleukin-6 can be prevented.',
        ],
        topPadding: false,
      }),
      {
        content:
          'The purpose of this research is to identify exactly what happens to the stromal cell after the release of interleukin-6 so we can find pathways to interfere and possibly generate new treatments.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        content: 'Who Will Benefit',
        topPadding: true,
        type: 'heading',
      },
      ...mapToParagraphs({
        collection: [
          'Every year in the U.S, 40,000 people are diagnosed and die from pancreatic cancer. Treating pancreatic cancer tumors using chemotherapy and radiation therapy isn’t always successful.',
          "There haven't been significant advancements in pancreatic cancer treatment in the last 20 years.",
          'If we can cut off the feedback loop that helps the tumor grow, it could mean that we’d be able to perform a surgery to eliminate or reduce tumor burden and increase the patient survival rate.',
        ],
      }),
      {
        content: 'Research Timeline',
        topPadding: true,
        type: 'heading',
      },
      {
        properties: {
          list: [
            {
              content:
                'Project Start-up: Hire a post doctoral fellow who will establish stromal and pancreatic cancer cell cultures, validate our original findings and obtain tumour cell conditioned medium for analysis',
              status: 'in-progress',
              title: '2021',
            },
            {
              content: 'Analysis',
              status: 'incomplete',
              title: '2022',
            },
          ],
        },
        type: 'timeline',
      } as ProjectTabContentTimeline,
      {
        content: 'Research Budget',
        topPadding: true,
        type: 'heading',
      },
      {
        content:
          'This project aims to study stromal cells in the lab over 2 years.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        properties: {
          data: [
            {
              category: 'Salaries & Benefits',
              description: 'Post-doctoral Fellow',
              totalCostUsd: '$40,000',
            },
            {
              category: 'Materials and Supplies',
              description: (
                <>
                  <p>
                    Flowcytometry, secretome, miRNA seq, mass spectrometry
                    analyses
                  </p>
                  <p>
                    Tissue culture media, Plasticware & cytokines, Antibodies,
                    Cell lines
                  </p>
                </>
              ),
              totalCostUsd: '$20,000',
            },
            {
              category: 'Travel',
              description: 'Travel to conference for PDF',
              totalCostUsd: '$1,500',
            },
            {
              category: 'Knowledge Translation',
              description: 'Publication costs',
              totalCostUsd: '$3,850',
            },
            {
              category: 'Total Funds',
              description: '',
              totalCostUsd: '$122,350',
              highlightText: true,
              removeEmptyCells: true,
              style: `
                grid-template-columns:
                minmax(100px, 2fr)
                minmax(50px, 1fr);
              `,
            },
            {
              category:
                'Research Institute Salaries & Administrative Support – 15%',
              description: '',
              totalCostUsd: '$18,350',
              removeEmptyCells: true,
              style: `
                grid-template-columns:
                minmax(100px, 2fr)
                minmax(50px, 1fr);
              `,
            },
            {
              category: 'Space – 15%',
              description: '',
              totalCostUsd: '$18,350',
            },
            {
              category: 'Research Institute Operations - 10%',
              description: '',
              totalCostUsd: '$12,250',
            },
            {
              category: 'Total',
              description: '',
              totalCostUsd: '$171,300',
              highlightBg: true,
              highlightText: true,
            },
          ],
          topPadding: true,
        },
        type: 'tabletProjectBudget',
      } as ProjectTabContentTableProjectBudget,
    ],
  },
  [ProjectSlugs.SEQUENCING_BILIARY_TRACT_CANCERS]: {
    ...commonResearchTab,
    content: [
      {
        content:
          'The purpose of this study is to better understand the biology of biliary tract cancers, so we can know why they develop and what treatments are best.',
        topPadding: false,
        type: 'paragraph',
      },
      {
        content:
          'BTCs are generally classified according to where they are located in the body. However, more evidence suggests that there may be certain genetic changes in these tumors that would result in better classification.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        content:
          'Potential pathways to treatment have already been discovered through the sequencing of DNA from the tumor. This makes BTCs an attractive tumor group for clinical trials exploring personalized approaches to patient care. Despite all that we know about individual genetic drivers, there is less information on the entire human genome - the code that tells your cells how to behave.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        content:
          'We plan to build a more complete picture by studying the whole genome. This will help determine relationships of the DNA changes and patterns and may aid in a better knowledge of how and why these cancers develop.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        content: 'Project Stages',
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
              date: (
                <LabeledAvatar
                  avatar={IMAGE_PROPS_LOCATION_PURPLE.getSrc()}
                  label="Nov 2020"
                />
              ),
              description: 'Study design will be finalized',
            },
            {
              date: 'Feb 2021',
              description: 'Study is open to recruting patients',
            },
            {
              date: 'Dec 2024',
              description:
                'Recruit 60-90 patients over 3 years years to the molecular profiling aspect of the study while collecting clinical and epidemiological data',
            },
            {
              date: 'Jun 2025',
              description:
                'Clinical trials to test treatments based on findings',
            },
          ],
          highlightedDataRows: [0],
          showHeaderRow: false,
          topPadding: true,
        },

        type: 'table',
      } as ProjectTabContentTable,
      {
        content: 'Why is this research important?',
        topPadding: true,
        type: 'heading',
      },
      ...mapToParagraphs({
        collection: [
          'People diagnosed with BTCs have limited treatment options. Despite this, research funding dedicated to BTCs is low compared to other tumor types.',
          'Today, BTCs are classified and treated without considering molecular subtypes, which is the way a cancer is divided into smaller groupings based on their cells. Understanding a cancer on this level is the key to unlocking more personalized treatment approaches and will lead to better outcomes for patients.',
          'This research is important because it looks to establish biomarker-directed treatments for patients with advanced BTCs in real-time. It will also help the world better understand this complex disease by building a comprehensive database of much-needed patient data.',
          'The research on this disease is at a stage that’s premature for interest from private biotech and pharma, meaning it must be funded by philanthropy or grants.',
        ],
      }),
      {
        content: 'Who will benefit?',
        topPadding: true,
        type: 'heading',
      },
      ...mapToParagraphs({
        collection: [
          'The number of patients with bile duct cancer is increasing in both Canada and the U.S. and the death rate is very high. This study focuses on younger adults and those with underlying inflammatory conditions because these patients have limited options and aggressive cancers.',
          'This work will teach us how to best design treatment studies for this population of patients.',
        ],
      }),
      {
        properties: {
          cellStyles: cellStyles.budget,
          columns: [
            { accessor: 'category', Header: 'Category' },
            { accessor: 'description', Header: 'Description' },
            { accessor: 'totalCost', Header: 'Total Cost ($USD)' },
          ],
          data: [
            {
              category: 'Salaries & Benefits',
              description: 'Program Manager/Epidemiologist',
              subRows: [
                {
                  category: '',
                  description: 'Data Coordinator',
                  totalCost: '$77,000',
                },
                {
                  category: '',
                  description: 'Patient Recruitment',
                  totalCost: '$77,000',
                },
              ],
              totalCost: '$115,000',
            },
            {
              category: 'Services',
              description: 'Bioinformatics',
              subRows: [
                {
                  category: '',
                  description: 'Genomics',
                  totalCost: '$247,170',
                },
                {
                  category: '',
                  description: 'Biospecimen Management',
                  totalCost: '$172,480',
                },
              ],
              totalCost: '$69,300',
            },
            {
              category: <span style={{ color: '#8256FF' }}>Total Funds</span>,
              description: '',
              totalCost: <span style={{ color: '#8256FF' }}>$758,450</span>,
            },
            {
              category:
                'Research Institute Salaries & Administrative Support – 15%',
              description: '',
              totalCost: '$113,768',
            },
            {
              category: 'Space – 15%',
              description: '',
              totalCost: '$113,768',
            },
            {
              category: 'Research Institute Operations - 10%',
              description: '',
              totalCost: '$75,845',
            },
            {
              category: 'Total',
              description: '',
              totalCost: '$1,061,830',
            },
          ],
          highlightedDataRows: [6],
          topPadding: true,
        },
        type: 'table',
      } as ProjectTabContentTable,
    ],
  },
  [ProjectSlugs.BREAST_CANCER_RELAPSE]: {
    ...commonResearchTab,
    content: [
      {
        content:
          'We still don’t fully understand why standard breast cancer therapy fails. Recent advances in technologies and artificial intelligence enable us to study breast cancer relapse with clarity like never before.',
        topPadding: false,
        type: 'paragraph',
      },
      {
        content: 'In this study, we aim to:',
        topPadding: true,
        type: 'paragraph',
      },
      {
        properties: {
          list: [
            'Create an atlas of changes that occur in tumors that relapse.',
            'Mine the atlas for weaknesses in breast tumor that relapse using human and artificial intelligence.',
            'Translate weaknesses into clinical tools and treatments.',
          ],
        },
        topPadding: true,
        type: 'orderedList',
      } as ProjectTabContentOrderedList,
      {
        content: 'Project Stages',
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
              date: (
                <LabeledAvatar
                  avatar={IMAGE_PROPS_LOCATION_PURPLE.getSrc()}
                  label="2020-2022"
                />
              ),
              description:
                'Accrue samples from breast tumour of patients at high-risk of relapse',
            },
            {
              date: '2020-2023',
              description: 'Comprehensively scrutinize accrued samples',
            },
            {
              date: '2022-2024',
              description:
                'Design innovative AI solutions to find vulnerabilities in tumours that relapse',
            },
            {
              date: '2023-2024',
              description:
                'Convert vulnerabilities into therapeutic opportunities to test in preclinical settings',
            },
            {
              date: '2024-2025',
              description: 'Transform our discoveries into clinical products',
            },
          ],
          highlightedDataRows: [0],
          showHeaderRow: false,
          topPadding: true,
        },
        type: 'table',
      } as ProjectTabContentTable,
      {
        content: 'Why is this research important?',
        topPadding: true,
        type: 'heading',
      },
      ...mapToParagraphs({
        collection: [
          'Difficulties in treating breast cancer relapse reveal the complexity of this disease.',
          'The first step to understand this complexity is creating an atlas of changes that occur during breast cancer relapse. Then our dream team’s brightest minds will mine the atlas for the “Achilles heal” of relapse and to find new treatment options.',
        ],
      }),
      {
        content: 'Who will benefit?',
        topPadding: true,
        type: 'heading',
      },
      ...mapToParagraphs({
        collection: [
          'This research will benefit 20% of breast cancer patients. These are women who relapse and die after standard therapy.',
          "Because relapse often affects women before their 50's, our research will benefit their growing families and communities. Our research will also spare patients and providers the costs and toxicities of ineffective therapies.",
        ],
      }),
      {
        content: 'Budget',
        topPadding: true,
        type: 'heading',
      },
      {
        content: 'This project will study the tumors of 500 women over 5 years',
        topPadding: true,
        type: 'paragraph',
      },
      {
        properties: {
          cellStyles: cellStyles.budget,
          columns: [
            { accessor: 'category', Header: 'Category' },
            { accessor: 'description', Header: 'Description' },
            { accessor: 'totalCost', Header: 'Total Cost ($USD)' },
          ],
          data: [
            {
              category: 'Research staff & trainees',
              description:
                'Graduate student, Postdoctoral fellow, Clinical fellow,Research staff',
              totalCost: '$4,830,000',
            },
            {
              category: 'Materials and Supplies',
              description:
                'Laboratory reagents expendables (expendable tangible property; useful life of 1 year or less; a cost of less than $2,000)',
              totalCost: '$5,390,000',
            },
            {
              category: 'Patient derived models',
              description:
                'Patient-derived xenografts, Patient-derived organoids, Patient-derived explants, etc',
              totalCost: '$700,000',
            },
            {
              category: 'Services',
              description:
                'Core services (sequencing, imaging, etc), Cluster access fees',
              totalCost: '$700,000',
            },
            {
              category: 'Knowledge transition',
              description: 'Publishing research results, conferences',
              totalCost: '$390,000',
            },
            {
              category: 'Total funds over 5 years',
              description: '',
              totalCost: '$12,000,000',
            },
            {
              category: (
                <span style={{ color: '#8256FF' }}>
                  Research Operating Expenses
                </span>
              ),
              description: (
                <span style={{ color: '#8256FF' }}>40% of budget</span>
              ),
              totalCost: '',
            },
            {
              category:
                'Research Institute Salaries & Administrative Support – 15%',
              description: '',
              totalCost: '$3,010,000',
            },
            {
              category: 'Space – 15%',
              description: '',
              totalCost: '$3,010,000',
            },
            {
              category: 'Research Institute Operations - 10%',
              description: '',
              totalCost: '$1,540,000',
            },
            {
              category: 'Total',
              description: '',
              totalCost: '$19,500,000',
            },
          ],
          highlightedDataRows: [10],
          topPadding: true,
        },
        type: 'table',
      } as ProjectTabContentTable,
    ],
  },
  [ProjectSlugs.PERSONALIZED_BREAST_CANCER_TREATMENT]: {
    ...commonResearchTab,
    content: [
      {
        content:
          'Our team uses new technologies to identify breast cancer cells with different sets of genetically different breast cancer cells within a tumor.',
        topPadding: false,
        type: 'paragraph',
      },
      ...mapToParagraphs({
        collection: [
          'We then use this information, alongside advanced machine learning models, to predict a personalized combination of therapies to optimize treatments for breast cancer patients. ',
          'Our research has the potential to greatly improve breast cancer therapy outcomes and reduce the total time patients spend in therapy.',
        ],
      }),
      {
        content: 'Project Stages',
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
              date: (
                <LabeledAvatar
                  avatar={IMAGE_PROPS_LOCATION_PURPLE.getSrc()}
                  label="June 2021"
                />
              ),
              description:
                'Sequencing of breast tumors using single-cell sequencing technology.',
            },
            {
              date: 'Dec. 2021',
              description:
                'Prediction of therapy response and drug combination using artificial intelligence.',
            },
            {
              date: 'Sept. 2022',
              description:
                'Assess the performance of the model predictions in patient-derived samples.',
            },
            {
              date: 'Oct. 2023',
              description:
                "Verify the ability of the model to predict patients' response to ongoing therapeutic trials.",
            },
            {
              date: 'April 2024',
              description:
                'Implementation of the final product for clinical use and publishing results of the study.',
            },
          ],
          highlightedDataRows: [0],
          showHeaderRow: false,
          topPadding: true,
        },
        type: 'table',
      } as ProjectTabContentTable,
      {
        content: 'Why is this research important?',
        topPadding: true,
        type: 'heading',
      },
      ...mapToParagraphs({
        collection: [
          'With over 2 million new cases of breast cancer worldwide (25% of all cancer cases) and a death rate of 40% worldwide, there is an urgent need for new, more effective cancer-fighting therapies. Treating cancer with single drugs has been unsuccessful for the deadliest breast tumors, as they contain many cancer cells that respond differently to therapy.',
          'We will develop a new way to prioritize combination therapies from high-resolution genomic information. Our new approach will provide personalized combinations of drugs targeting all populations of cancer cells and reducing the risk of treatment resistance.',
          'This paradigm shift will enable large-scale exploration of drug combinations and a rational prioritization for clinical testing, overcoming a long-standing challenge in precision cancer medicine.',
        ],
      }),
      {
        content: 'Who will benefit?',
        topPadding: true,
        type: 'heading',
      },
      ...mapToParagraphs({
        collection: [
          '323,000 people are diagnosed with breast cancer in Canada and the US each year. This research has the potential to impact how they benefit from their treatment.',
        ],
      }),
      {
        content: 'Project Budget',
        topPadding: true,
        type: 'heading',
      },
      {
        properties: {
          cellStyles: cellStyles.budget,
          columns: [
            { accessor: 'category', Header: 'Category' },
            { accessor: 'description', Header: 'Description' },
            { accessor: 'totalCost', Header: 'Total Cost ($USD)' },
          ],
          data: [
            {
              category: 'Salaries & Benefits',
              description: 'Lab Technician (0.5 FTE) x 2',
              totalCost: '$130,000',
            },
            {
              category: 'Materials and Supplies',
              description:
                'Data storage: Single-cell sequencing and Pharmacogenetics',
              subRows: [
                {
                  category: '',
                  description: <br />,
                  totalCost: '',
                },
                {
                  category: '',
                  description: 'Computation:',
                  totalCost: '$229,000',
                },
                {
                  category: '',
                  description: '- Single-cell sequencing data processing',
                  totalCost: '',
                },
                {
                  category: '',
                  description: '- Pharmacogenomics sequencing data processing',
                  totalCost: '',
                },
                {
                  category: '',
                  description:
                    '- Biomarker discovery (univariate + multivariate)',
                  totalCost: '',
                },
                {
                  category: '',
                  description: '- Drug combination prediction',
                  totalCost: '',
                },
              ],
              totalCost: '$34,200',
            },
            {
              category: <span style={{ color: '#8256FF' }}>Total Funds</span>,
              description: '',
              totalCost: <span style={{ color: '#8256FF' }}>$763,200</span>,
            },
            {
              category:
                'Research Institute Salaries & Administrative Support – 15%',
              description: '',
              totalCost: '$114,480',
            },
            {
              category: 'Space – 15%',
              description: '',
              totalCost: '$114,480',
            },
            {
              category: 'Research Institute Operations - 10%',
              description: '',
              totalCost: '$11,448',
            },
            {
              category: 'Total',
              description: '',
              totalCost: '$1,003,608',
            },
          ],
          highlightedDataRows: [10],
          topPadding: true,
        },
        type: 'table',
      } as ProjectTabContentTable,
    ],
  },
  [ProjectSlugs.ALZHEIMERS_DISEASE_DETECTION]: {
    ...commonResearchTab,
    content: [
      {
        content: 'The Research Vision',
        type: 'topHeading',
      },
      {
        content:
          'This type of research is called primary prevention research, which means trying to prevent the consequences of Alzheimer’s disease (AD) before memory loss  occurs. It also uses results from a secondary prevention trial called the A4 Study, where we proved we can detect AD early enough to attempt to treat it before memory loss begins.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        content: 'This project can help fill two existing gaps in AD research:',
        topPadding: true,
        type: 'paragraph',
      },
      {
        content: (
          <>
            1. Drugs to <u>stop</u> diagnosed AD from getting worse continues to
            be a huge unmet need.
          </>
        ),
        topPadding: true,
        type: 'paragraph',
      },
      {
        content: (
          <>
            2. Drugs to <u>prevent</u> AD symptoms altogether are now being
            developed.
          </>
        ),
        topPadding: false,
        type: 'paragraph',
      },
      {
        content:
          'The only treatments currently available briefly slow cognitive decline for an average of 6 months.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        content:
          'The use of blood tests can significantly reduce cost of testing for AD and successful prevention can reduce annual healthcare costs for AD patients ($260B in 2017).',
        topPadding: true,
        type: 'paragraph',
      },
      {
        content: (
          <>
            It took <strong>4.5 years</strong> to recruit participants for the
            A4 Study. This project will innovate how to involve those who
            don&rsquo;t yet have symptoms in this next stage of prevention
            research and accelerate the enrollment of prevention trials.
          </>
        ),
        topPadding: true,
        type: 'paragraph',
      },
      {
        content: 'Who Will Benefit',
        topPadding: true,
        type: 'heading',
      },
      ...mapToParagraphs({
        collection: [
          "We think this research will be impactful because 6 million people are currently suffering from Alzheimer's disease (AD) in the U.S. today. The number of patients is expected to double by 2050.",
          'If this research is successful, it has the potential to offset the expected 2020 cost to the nation of $305 billion—By 2050, these costs could rise as high as $1.1 trillion.',
        ],
      }),
      {
        content: 'Research Timeline',
        topPadding: true,
        type: 'heading',
      },
      {
        properties: {
          list: [
            {
              content: 'Set up the study, recruit 2,000 participants',
              status: 'in-progress',
              title: '2021',
            },
            {
              content: 'Give first round of blood tests',
              status: 'in-progress',
              title: '2022',
            },
            {
              content: 'Give second round of blood tests',
              status: 'incomplete',
              title: '2024',
            },
            {
              content: 'Give third round of blood tests',
              status: 'incomplete',
              title: '2026',
            },
            {
              content: 'Give fourth round of blood tests',
              status: 'incomplete',
              title: '2028',
            },
            {
              content: 'Analyze results and determine most reliable test',
              status: 'incomplete',
              title: '2029',
            },
          ],
        },
        type: 'timeline',
      } as ProjectTabContentTimeline,
      {
        content: 'Research Budget',
        topPadding: true,
        type: 'heading',
      },
      {
        properties: {
          data: [
            {
              category: 'Service',
              description: (
                <>
                  <Paragraph>2,000 blood tests</Paragraph>
                  <Paragraph topPadding>
                    Each participant requires 4 blood tests over the span of 6
                    years.
                  </Paragraph>
                </>
              ),
              totalCostUsd: '$500',
            },
            {
              category: 'Total',
              description: '',
              totalCostUsd: '$4,000,000',
              highlightBg: true,
              highlightText: true,
            },
          ],
          topPadding: true,
        },
        type: 'tabletProjectBudget',
      } as ProjectTabContentTableProjectBudget,
    ],
  },
  [ProjectSlugs.ALZHEIMERS_DISEASE_DOWN_SYNDROME]: {
    ...commonResearchTab,
    content: [
      {
        content:
          'We want to add new screening methods - the recently FDA approved Tau PET brain imaging and blood biomarkers - to the clinical trial enrollment process for adults with Down syndrome (DS). The purpose is to reduce the burden for participants while also including use of new and more powerful data.',
        topPadding: false,
        type: 'paragraph',
      },
      ...mapToParagraphs({
        collection: [
          'Identifying people with greater risks, like those with DS, who are interested in participating in clinical trials aimed at discovering treatments that will reduce their risk of developing Alzheimer’s dementia is the goal.',
          'By simplifying the nature of tests required for people with DS to participate, researchers will be able to quickly enroll volunteers which allows for new treatments to be discovered as soon as possible.',
        ],
      }),
      {
        content: 'Project Stages',
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
              date: (
                <LabeledAvatar
                  avatar={IMAGE_PROPS_LOCATION_PURPLE.getSrc()}
                  label="Dec 2020"
                />
              ),
              description: 'Setting up study',
            },
            {
              date: 'Jan 2021',
              description: 'Recruiting and screening participants',
            },
            {
              date: 'Mar 2021',
              description:
                'Conducting the trial and keeping participants involved',
            },
            {
              date: 'Jun 2022',
              description: '“Locking” the database to prevent any changes',
            },
            {
              date: 'Nov 2022',
              description: 'Publishing results of the study',
            },
          ],
          highlightedDataRows: [0],
          showHeaderRow: false,
          topPadding: true,
        },
        type: 'table',
      } as ProjectTabContentTable,
      {
        content: 'Why is this research important?',
        topPadding: true,
        type: 'heading',
      },
      ...mapToParagraphs({
        collection: [
          'Serving people with Down syndrome (DS), by making research easier to participate in, is providing vital information from a higher risk population. We have the right team of leading DS researchers.',
          'Our researchers come from the top 15 international sites and USC Alzheimer’s Therapeutic Research Institute. The consortium infrastructure has been used over 30 years, in hundreds of clinical trials.',
          'This team science approach is required to recruit and retain the large numbers of volunteers required to find the first survivor. Incorporating new tests into existing protocols is best done by our team where significant investments are already in place.',
        ],
      }),
      {
        content: 'Who will benefit?',
        topPadding: true,
        type: 'heading',
      },
      ...mapToParagraphs({
        collection: [
          'Conducting clinical trials with people who have both Down syndrome (DS) and Alzheimer’s diease (AD) may benefit patients with DS, but may also provide important insights about the efficacy and timing of interventions targeting sporadic AD - that is AD that occurs without a family history - in the general population.',
          'If we can find a cure faster, we can potentially save millions of lives. Giving people even just a few extra years before memory loss occurs means they can enjoy life and remain independent longer.',
        ],
      }),
      {
        content: 'Budget',
        topPadding: true,
        type: 'heading',
      },
      {
        content:
          'This project will study a cohort of 120 participants with Down syndrome.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        properties: {
          cellStyles: cellStyles.budget,
          columns: [
            { accessor: 'category', Header: 'Category' },
            { accessor: 'description', Header: 'Description' },
            { accessor: 'totalCost', Header: 'Total Cost ($USD)' },
          ],
          data: [
            {
              category: 'Personnel',
              description:
                'Site clinicians (5 years) and MS researchers (4 years)',
              totalCost: '$1,050,000',
            },
            {
              category: 'Travel',
              description:
                'Escorted travel for subjects to obtain PET scans and blood tests, 2 trips per participant',
              totalCost: '$360,000',
            },
            {
              category: 'Drugs',
              description:
                '240 flortaucipir injectable tracer for PET scans (2 scans per participant)',
              totalCost: '$600,000',
            },
            {
              category: 'Services',
              description:
                'PET scans for 120 subjects (2 per subject total 240)',
              subRows: [
                {
                  category: '',
                  description: 'Blood assays for 240 PTau217 assays',
                  totalCost: '$480,000',
                },
              ],
              totalCost: '$740,000',
            },
            {
              category: 'Facilities & Admin costs',
              description: '50%',
              totalCost: '$2,315,000',
            },
            {
              category: 'Total',
              description: '',
              totalCost: '$5,545,000',
            },
          ],
          highlightedDataRows: [],
          topPadding: true,
        },
        type: 'table',
      } as ProjectTabContentTable,
    ],
  },
}
