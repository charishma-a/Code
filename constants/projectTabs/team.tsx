import {
  ProjectSlugs,
  ProjectTabContentImage,
  ProjectTabContentTeamMember,
  ProjectTabContentUnorderedList,
  ProjectTabName,
  ProjectTabSection,
} from './types'
import { mapToParagraphs } from './utils'

/* constants */
import { hIndexTooltipContent } from '@/constants/tooltips'
import {
  IMAGE_PROPS_FOUNDATION_ALBERT_EINSTEIN,
  IMAGE_PROPS_FOUNDATION_ATRI_USC,
  IMAGE_PROPS_FOUNDATION_PMCF_UHN,
  IMAGE_PROPS_PROJECT_35UEmH7_AVATAR_ARMAND_KEATING,
  IMAGE_PROPS_PROJECT_57E36H3_AVATAR_DAVID_CESCON,
  IMAGE_PROPS_PROJECT_57E36H3_AVATAR_MATHIEU_LUPIEN,
  IMAGE_PROPS_PROJECT_7CRQ2B2_AVATAR_GRAINNE_OKANE,
  IMAGE_PROPS_PROJECT_7CRQ2B2_AVATAR_STEVE_GALLINGER,
  IMAGE_PROPS_PROJECT_A4D04DF_AVATAR_ANITA,
  IMAGE_PROPS_PROJECT_A4D04DF_AVATAR_BRENDA,
  IMAGE_PROPS_PROJECT_LK4S12M_HARRIS_GOLDSTEIN,
  IMAGE_PROPS_PROJECT_YR8UGE2_AVATAR_PAUL_AISEN,
  IMAGE_PROPS_PROJECT_YR8UGE2_TEAM_TAB,
} from '@/constants/images'

const commonTeamTab = {
  clickID: 'project-page-click-team',
  tabName: ProjectTabName.Team,
}

export const projectTabTeam: ProjectTabSection = {
  [ProjectSlugs.OPTIMIZE_CELL_ACTIVITY_NON_HODGKINS]: {
    ...commonTeamTab,
    content: [
      {
        content: 'Research Team',
        type: 'topHeading',
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
        content: (
          <strong>
            Dr. Goldstein is a leading expert in microbiology, immunology, and
            autoimmune diseases with a specific focus on cancer and HIV research
            and genetic programming of immune responses, among other scientific
            areas.
          </strong>
        ),
        topPadding: true,
        type: 'paragraph',
      },
      ...mapToParagraphs({
        collection: [
          'Throughout the COVID-19 pandemic, Dr. Goldstein has been instrumental in facilitating cross-institutional collaboration to optimize Einstein’s research output against this virus.',
          'Dr. Goldstein completed his fellowship at the NIH and today serves as Associate Dean for Scientific Resources, Charles Michael Chair in Autoimmune Diseases, Professor in the Departments of Pediatrics and of Microbiology & Immunology, and Director of the Einstein-Rockefeller-CUNY Center for AIDS Research.',
        ],
      }),
      {
        content: 'Research Institution',
        topPadding: true,
        type: 'heading',
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
      ...mapToParagraphs({
        collection: [
          'Montefiore Health System and Albert Einstein College of Medicine stands as a premier academic health system and a nationally ranked leader in providing cutting-edge care to approximately three million people in the Bronx, Westchester, and the Hudson Valley.',
          'We comprise 15 hospitals, more than 200 outpatient care sites, and our research and academic Jack and Pearl Resnick Campus, which drives leading transformational research and fosters the next generation of medical and scientific professionals.',
          'Operating in the borough housing the poorest congressional district in the nation, Montefiore and Einstein care and discover for some of the most pervasive health issues in urban populations anywhere.',
        ],
      }),
    ],
  },
  [ProjectSlugs.UNTANGLING_POSTPARTUM_DEPRESSION]: {
    ...commonTeamTab,
    content: [
      {
        content: 'Research Team',
        type: 'topHeading',
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
        content: (
          <strong>
            Dr. Autry is a rising star in social neuroscience, proven by her
            critical work in uncovering biological mechanisms of antidepressants
            to her recent discovery of a small brain region that promotes infant
            neglect, abuse, and infanticide.
          </strong>
        ),
        topPadding: true,
        type: 'paragraph',
      },
      ...mapToParagraphs({
        collection: [
          'Dr. Autry studied the role of the neuropeptide brain-derived neurotrophic factor in depression-related behavior and antidepressant efficacy.  Seminal work from her PhD thesis with Dr. Lisa Monteggia at UT Southwestern uncovered rapid plasticity mechanisms in the hippocampus underlying the fast-acting antidepressant effects of ketamine.',
          'She then studied the role of peptide-expressing hypothalamic neurons in the control of parental behavior with Dr. Catherine Dulac at Harvard University. In her own lab at Albert Einstein College of Medicine, Dr. Autry is combining these areas of expertise to study how stress affects neural circuits underlying parental behavior in males and females.',
          'Dr. Autry is a recognized leader in studying stress and social behaviors. Her mentee Brenda Abdelmesih holds the distinguished Tishman Scholarship within the Brain Science Initiative and has extensive experience using advanced molecular techniques. Together, they are poised to advance quickly and make unique contributions to the field.',
        ],
      }),
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
          'Under the mentorship of Dr. Autry, Brenda Abdelmesih is a PhD candidate at Albert Einstein College of Medicine. Brenda joined Einstein upon completion of her undergraduate degree in Neuroscience at Hunter College. Today, she studies the neuromodulatory effects of circuits and behavior and works in close collaboration with Dr. Autry on advancing the world’s understanding of maternal mental health. Brenda holds the prized Dan and Sheryl Tishman Scholarship in Brain Science.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        content: 'Research Institution',
        topPadding: true,
        type: 'heading',
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
      ...mapToParagraphs({
        collection: [
          'Montefiore Health System and Albert Einstein College of Medicine stands as a premier academic health system and a nationally ranked leader in providing cutting-edge care to approximately three million people in the Bronx, Westchester, and the Hudson Valley. ',
          'We comprise 15 hospitals, more than 200 outpatient care sites, and our research and academic Jack and Pearl Resnick Campus, which drives leading transformational research and fosters the next generation of medical and scientific professionals. ',
          'Operating in the borough housing the poorest congressional district in the nation, Montefiore and Einstein care and discover for some of the most pervasive health issues in urban populations anywhere. ',
        ],
      }),
    ],
  },
  [ProjectSlugs.SLOW_PANCREATIC_CANCER_GROWTH]: {
    ...commonTeamTab,
    content: [
      {
        content: 'Research Team',
        type: 'topHeading',
      },
      {
        properties: {
          avatar: IMAGE_PROPS_PROJECT_35UEmH7_AVATAR_ARMAND_KEATING.getSrc(),
          hIndex: 60,
          hIndexTooltipContent,
          role: 'Cell Therapy Translational Research Laboratory, University Health Network, Princess Margaret Cancer Centre, Krembil Research Institute',
          title: 'Dr. Armand Keating, MD FRCPC',
        },
        topPadding: true,
        type: 'teamMember',
      } as ProjectTabContentTeamMember,
      {
        content: (
          <strong>
            Dr. Armand Keating earned his MD degree from the University of
            Ottawa, completed internal medicine and hematology training at the
            University of Toronto and a research fellowship at the University of
            Washington and the Fred Hutchinson Cancer Research Center in
            Seattle, Washington.
          </strong>
        ),
        topPadding: true,
        type: 'paragraph',
      },
      ...mapToParagraphs({
        collection: [
          'His clinical and research interests focus on anti-cancer cell therapy, regenerative medicine, blood and marrow transplantation and cell therapy of chronic inflammatory disorders. He has conducted laboratory and translational research in cell and gene therapy, normal and malignant hematopoiesis, and on the biology and clinical application of mesenchymal stromal cells and natural killer cells.',
          'Here are some highlights from his career:',
        ],
      }),
      {
        properties: {
          list: [
            'He was a Cancer Research Scientist of the National Cancer Institute of Canada for 10 years and a Senior Scientist at the Toronto General Research Institute for many years.',
            'He established the largest stem cell transplantation program in Canada at University Health Network, Toronto.',
            'He was Director, Division of Hematology at University of Toronto for 19 years.',
            'He served as president of the American Society of Hematology',
            'He was listed in Best Doctors in Canada',
            'He is the author of over 400 publications,',
          ],
        },
        topPadding: true,
        type: 'unorderedList',
      } as ProjectTabContentUnorderedList,
      {
        content: 'Research Institution',
        topPadding: true,
        type: 'heading',
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
          'The Cell Therapy Translational Research Laboratory is pursuing translational and clinical research to develop cell therapy-based treatment for cancer and degenerative diseases.',
        topPadding: true,
        type: 'paragraph',
      },
      {
        content: 'The aims of our program are:',
        topPadding: true,
        type: 'paragraph',
      },
      {
        properties: {
          list: [
            'Translation of laboratory research into preclinical models leading to clinical cell therapy trials.',
            'Design of innovative cell therapy studies for cancer and the regeneration of injured or chronically inflamed tissue.',
            'Development of correlative studies to rigorously investigate the mechanisms of cell-based therapy and thus inform future studies.',
          ],
        },
        topPadding: true,
        type: 'unorderedList',
      } as ProjectTabContentUnorderedList,
    ],
  },
  [ProjectSlugs.SEQUENCING_BILIARY_TRACT_CANCERS]: {
    ...commonTeamTab,
    content: [
      {
        content: 'Lead Researchers: Dr. Steve Gallinger and Dr. Grainne O’Kane',
        type: 'topHeading',
      },
      {
        properties: {
          avatar: IMAGE_PROPS_PROJECT_7CRQ2B2_AVATAR_STEVE_GALLINGER.getSrc(),
          company: 'Princess Margaret Cancer Centre',
          hIndex: 126,
          hIndexTooltipContent,
          title: 'Dr. Steve Gallinger',
        },
        topPadding: true,
        type: 'teamMember',
      } as ProjectTabContentTeamMember,
      {
        properties: {
          avatar: IMAGE_PROPS_PROJECT_7CRQ2B2_AVATAR_GRAINNE_OKANE.getSrc(),
          company: 'Princess Margaret Cancer Centre',
          hIndexTooltipContent,
          title: 'Dr. Grainne O’Kane MB, BCH, BAO, MRCPI, MD',
        },
        topPadding: true,
        type: 'teamMember',
      } as ProjectTabContentTeamMember,
      ...mapToParagraphs({
        collection: [
          'Dr. Steven Gallinger is an Hepatobiliary/pancreatic (HPB) surgical oncologist and member of the GI Site Cancer Program at Princess Margaret Cancer Centre. He is Professor of Surgery at the University of Toronto and Chair of the Cancer Care Ontario HPB Community of Practice.',
          'His research interests are primarily in the area of GI cancer genetics and he is co-Director of the Centre for Cancer Genetics at the Samuel Lunenfeld Research Institute, and co-Principal Investigator of the Zane Cohen Familial Gastrointestinal Cancer Registry at MSH. He is also Principal Investigator of the Ontario Pancreas Cancer Study, a member of the NIH-funded Pancreas Cancer Genetic Epidemiology consortium, a population-based registry of pancreas cancer cases and their families which is now integrated with the International Cancer Genome Consortium at the OICR where he is Head of the Translational Research Initiative in pancreas cancer, termed PanCuRx. Dr. Gallinger also co-leads (with Dr. Jennifer Knox) the McCain Centre for Pancreas Cancer which supports the rapid diagnostic and treatment program at UHN.',
          'Dr. O’Kane is a medical oncologist at Princess Margaret Cancer Centre, the largest cancer research institution in Canada. She specialises in the treatment of pancreas and  hepatobiliary cancers. She is particularly passionate about these areas as these cancers are highly fatal with less research input than other cancers. Specifically for this study, Dr O’Kane was struck by the short journey of a young patient with underlying ulcerative colitis who developed a very aggressive cholangiocarcinoma. Dr O’Kane recognised the limited options and poor understanding of these aggressive diseases.',
          'Dr. O’Kane has been recognized around the world for her contribution to research including the Scholar-in Training Award from the American Association of Cancer Research, and Merit Awards from both the European Society of Medical Oncology and American Society of Clinical Oncology. She has published over 40 peer reviewed papers and is currently managing a number of clinical trials at the Princess Margaret Cancer Centre.',
        ],
      }),
      {
        content: 'About Princess Margaret Cancer Centre',
        topPadding: true,
        type: 'heading',
      },
      ...mapToParagraphs({
        collection: [
          'The Princess Margaret Cancer Centre and University Health Network are the largest medical group in Canada. We treat the highest volume of BTC in the country.',
          'Our large group of surgeons, liver doctors, oncologists and researchers has allowed to us to develop an expert team in this field. We also work closely with scientists at the Ontario Institute for Cancer Research and are world renowned for the progress made in the care of these patients.',
        ],
      }),
    ],
  },
  [ProjectSlugs.BREAST_CANCER_RELAPSE]: {
    ...commonTeamTab,
    content: [
      {
        content: 'Lead Researchers: Dr. Mathieu Lupien and Dr. David Cescon',
        type: 'topHeading',
      },
      {
        properties: {
          avatar: IMAGE_PROPS_PROJECT_57E36H3_AVATAR_MATHIEU_LUPIEN.getSrc(),
          company: 'Princess Margaret Cancer Centre',
          role: 'Senior Scientist',
          hIndex: 52,
          hIndexTooltipContent,
          title: 'Dr. Mathieu Lupien',
        },
        topPadding: true,
        type: 'teamMember',
      } as ProjectTabContentTeamMember,
      {
        properties: {
          avatar: IMAGE_PROPS_PROJECT_57E36H3_AVATAR_DAVID_CESCON.getSrc(),
          company: 'Princess Margaret Cancer Centre',
          role: 'Clinician Scientist',
          hIndex: 38,
          hIndexTooltipContent,
          title: 'Dr. David W. Cescon',
        },
        topPadding: true,
        type: 'teamMember',
      } as ProjectTabContentTeamMember,
      ...mapToParagraphs({
        collection: [
          'Our leadership embodies our scientific rigour and clinical excellence. Drs. Lupien and Cescon combine over 30 years of experience in breast cancer research. In 2016, they joined forces to build a dream team of ten world-experts and their staff (>100). They are set on finding a cure for breast cancer relapse.',
          'Our dream team is known for transforming discoveries into clinical applications. We previously led the clinical development of novel targeted therapies, made landmark discoveries, and designed new methods for biomarker assessment and monitoring. Our translational research platforms and pioneering preclinical studies are bringing us closer to a cure against breast cancer relapse.',
        ],
      }),
      {
        content: 'A Dream Team of Scientists and Clinicians',
        topPadding: true,
        type: 'heading',
      },
      ...mapToParagraphs({
        collection: [
          'There are several factors that leads to breast cancer relapse. Finding a cure requires a deep understanding of the disease.',
          'We built a dream team of scientists and clinicians with the needed complementary expertise. They benefit from the latest technologies and world-class infrastructure of the Princess Margaret Cancer Centre. Collectively, our dream team is uniquely positioned to bring the best care to breast cancer patients through innovative discoveries and methodologies.',
        ],
      }),
      {
        content: 'One of the Top 5 Cancer Research Centres Worldwide',
        topPadding: true,
        type: 'heading',
      },
      ...mapToParagraphs({
        collection: [
          'Our home is the Princess Margaret Cancer Centre. Located in Toronto, Canada, it is one of the top 5 cancer research centres in the world.',
          'Its commitment to research, education and innovation supports a diverse, inclusive and vibrant community. Its world-renowned scientific excellence draws from internationally-recognized researchers and cutting-edge infrastructure. Its clinical impact stems from world-class clinical trials resources. Its successes originate from the collegiality of its members.',
        ],
      }),
    ],
  },
  [ProjectSlugs.PERSONALIZED_BREAST_CANCER_TREATMENT]: {
    ...commonTeamTab,
    content: [
      {
        content:
          'Lead Researchers: Dr. Benjamin Haibe-Kains and Dr. Trevor Pugh',
        type: 'topHeading',
      },
      {
        properties: {
          avatar: '/assets/images/projects/hk-avatar-benjamin.png',
          role: 'Lead Researcher',
          hIndex: 62,
          hIndexTooltipContent,
          title: 'Dr. Benjamin Haibe-Kains',
        },
        topPadding: true,
        type: 'teamMember',
      } as ProjectTabContentTeamMember,
      {
        properties: {
          avatar: '/assets/images/projects/hk-avatar-trevor.png',
          role: 'Co-Lead',
          hIndex: 53,
          hIndexTooltipContent,
          title: 'Dr. Trevor Pugh',
        },
        topPadding: true,
        type: 'teamMember',
      } as ProjectTabContentTeamMember,
      {
        content: (
          <span>
            <strong>Dr. Benjamin Haibe-Kains</strong> earned his PhD in
            Bioinformatics at the Université Libre de Bruxelles in Belgium. He
            then conducted cancer research at Harvard University in the U.S
            before running his own laboratory at the Université de Montréal in
            Canada.
          </span>
        ),
        topPadding: true,
        type: 'paragraph',
      },
      ...mapToParagraphs({
        collection: [
          'He is now a Principal Investigator at the Princess Margaret Cancer Centre in Toronto, Canada. His research focuses on the integration of big data analytics to improve disease outcomes, with a particular emphasis on cancer.',
          "Dr. Haibe-Kains' main scientific contributions include several prognostic gene signatures in breast cancer, subtype classification models for ovarian and breast cancers, as well as genomic predictors of drug response in cancer cells.",
        ],
      }),
      {
        content: (
          <span>
            <strong>Dr. Trevor Pugh</strong> is a Senior Investigator and the
            Director of Genomics at the Ontario Institute of Cancer Research
            (OICR). He leads the OICR Genomics program, which brings together
            several genomics teams in the Toronto area to support cancer
            research.
          </span>
        ),
        topPadding: true,
        type: 'paragraph',
      },
      ...mapToParagraphs({
        collection: [
          'Dr. Pugh is a cancer genomics researcher and a board-certified molecular geneticist. His research program is focused on understanding the clinical consequences of different cancer cells in tumours during treatment. He and his collaborators develop software tools and data analysis systems required to determine genetic variation and immune response of cancer cells.',
        ],
      }),
      {
        content: 'About the Lab',
        topPadding: true,
        type: 'heading',
      },
      ...mapToParagraphs({
        collection: [
          'Dr. Haibe-Kains’ laboratory is a part of the Princess Margaret Cancer Centre (a research hospital within the University Health Network) and affiliated with the University of Toronto.',
          'Our research focuses on the development of new computer-based methods to evaluate cancer progression and targeted drug therapies. We are national leaders in predictive modeling from genomic data to advance personalized medicine.',
        ],
      }),
      {
        content: 'One of the Top 5 Cancer Research Centres Worldwide',
        topPadding: true,
        type: 'heading',
      },
      ...mapToParagraphs({
        collection: [
          'Our home is the Princess Margaret Cancer Centre. Located in Toronto, Canada, it is one of the top 5 cancer research centres in the world.',
          'Its commitment to research, education and innovation supports a diverse, inclusive and vibrant community.  Its world-renowned scientific excellence draws from internationally-recognized researchers and cutting-edge infrastructure. Its clinical impact stems from world-class clinical trials resources. Its successes originate from the collegiality of its members.',
        ],
      }),
    ],
  },
  [ProjectSlugs.ALZHEIMERS_DISEASE_DETECTION]: {
    ...commonTeamTab,
    content: [
      {
        content: 'Research Team',
        type: 'topHeading',
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
          'Paul S. Aisen, MD has conducted therapeutic research on Alzheimer’s disease for over 30 years. After spending 15 years on the faculty at Mount Sinai, Dr. Aisen moved to Georgetown University, Washington, DC, in 1999 as professor in the departments of neurology and of medicine and became vice chair of the Department of Neurology in 2004.',
          "In 2007, Dr. Aisen took over for Dr. Leon Thal as the Director of the Alzheimer’s Disease Cooperative Study in San Diego. In 2015, he became the Founding Director of the University of Southern California Alzheimer’s Therapeutic Research Institute, located in San Diego, California. He is also a co-leader of the next generation of team science with the Alzheimer's Clinical Trial Consortium.",
        ],
      }),
      {
        content: 'Research Institution',
        topPadding: true,
        type: 'heading',
      },
      {
        properties: {
          avatar: IMAGE_PROPS_FOUNDATION_ATRI_USC.getSrc(),
          location: 'San Diego, California',
          title: 'Alzheimer’s Therapeutic Research Insititute',
        },
        topPadding: true,
        type: 'teamMember',
      } as ProjectTabContentTeamMember,
      {
        properties: {
          alt: IMAGE_PROPS_PROJECT_YR8UGE2_TEAM_TAB.getAlt(),
          src: IMAGE_PROPS_PROJECT_YR8UGE2_TEAM_TAB.getSrc(),
        },
        topPadding: true,
        type: 'image',
      } as ProjectTabContentImage,
      ...mapToParagraphs({
        collection: [
          "Alzheimer’s Therapeutic Research Institute (ATRI) at USC is an academic clinical trial organization. We’re co-leading the Alzheimer's Clinical Trials Consortium dedicated to finding a prevention and cure.",
          'Our facility is located in San Diego, California, and forms an integral part of the Los Angeles-based USC Keck School of Medicine’s mission to address the public health impact of Alzheimer’s on millions of people.',
          'USC ATRI promotes extensive collaboration, or team science, and data sharing across many types of partners in the quest for the first survivor.',
          'An additional goal includes training future leaders in AD clinical research.',
        ],
      }),
    ],
  },
  [ProjectSlugs.ALZHEIMERS_DISEASE_DOWN_SYNDROME]: {
    ...commonTeamTab,
    content: [
      {
        content: 'Dr. Michael Rafii',
        type: 'topHeading',
      },
      {
        properties: {
          avatar: '/assets/images/foundations/mrafii1.png',
          company: "Alzheimer's Therapeutic Research Institute",
          hIndexTooltipContent,
          title: 'Dr. Michael Rafii',
        },
        topPadding: true,
        type: 'teamMember',
      } as ProjectTabContentTeamMember,
      ...mapToParagraphs({
        collection: [
          'Michael Rafii is a board-certified neurologist and Associate Professor of Clinical Neurology at the Keck School of Medicine of the University of Southern California (USC). He is also Medical Director of the Alzheimer’s Therapeutic Research Institute (ATRI) and the National Institutes of Health (NIH)-funded Alzheimer’s Clinical Trial Consortium (ACTC) where he oversees safety across all clinical trials.',
          'He received his MD and PhD degrees from Brown University School of Medicine and conducted neurogenetics research at Harvard Medical School. Dr. Rafii completed his Neurology residency at Johns Hopkins Hospital where he also served as chief resident. He then completed a fellowship in dementia at UC San Diego.',
          'Dr. Rafii’s research focuses on the design and conduct of multi-center clinical trials for Alzheimer’s disease including a genetic form of AD which occurs in Down syndrome. Dr. Rafii is co-editor of the textbook ‘Common Pathogenic Mechanisms between Down Syndrome and Alzheimer’s Disease: Steps toward Therapy.’ He is a scientific reviewer for the NIA and the Alzheimer’s Association. His work has been featured in the New York Times, Chicago Tribune, Wall Street Journal and on National Public Radio (NPR).',
        ],
      }),
      {
        content: 'About the Team',
        topPadding: true,
        type: 'heading',
      },
      ...mapToParagraphs({
        collection: [
          'We’re the only team to lead this research because we were the first to conduct the A4 Study, a landmark secondary prevention trial where we worked to detect AD disease early and prevent it from getting worse.',
          "We’re the right team to lead this research because Alzheimer’s Therapeutic Research Institute (ATRI) at USC is leading the Alzheimer's Clinical Trial Consortium consisting of leading investigators from nearly every major academic institution in the U.S.  ATRI talent has over 3 decades of experience with clinical trial design and coordination at over 75 sites around the world. ",
        ],
      }),
      {
        content: 'About Alzheimer’s Therapeutic Research Institute',
        topPadding: true,
        type: 'heading',
      },
      ...mapToParagraphs({
        collection: [
          "USC ATRI is an academic clinical trial organization. We’re leading the Alzheimer's Clinical Trials Consortium dedicated to finding a prevention and cure.",
          'Our facility is located in San Diego, California, and forms an integral part of the Los Angeles-based USC Keck School of Medicine’s mission to address the public health impact of Alzheimer’s on millions of people.',
          'USC ATRI promotes extensive collaboration, or team science, and data sharing across many types of partners in the quest for the first survivor.',
          'An additional goal includes training future leaders in AD clinical research.',
        ],
      }),
    ],
  },
}
