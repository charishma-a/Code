import {
  IMAGE_PROPS_FOUNDATION_ALBERT_EINSTEIN,
  IMAGE_PROPS_FOUNDATION_ATRI_USC,
  IMAGE_PROPS_FOUNDATION_PMCF_UHN,
  IMAGE_PROPS_PROJECT_35UEmH7_AVATAR_ARMAND_KEATING,
  IMAGE_PROPS_PROJECT_35UEmH7_MAIN,
  IMAGE_PROPS_PROJECT_57E36H3_AVATAR_DAVID_CESCON,
  IMAGE_PROPS_PROJECT_57E36H3_AVATAR_MATHIEU_LUPIEN,
  IMAGE_PROPS_PROJECT_57E36H3_MAIN,
  IMAGE_PROPS_PROJECT_7CRQ2B2_AVATAR_GRAINNE_OKANE,
  IMAGE_PROPS_PROJECT_7CRQ2B2_AVATAR_STEVE_GALLINGER,
  IMAGE_PROPS_PROJECT_7CRQ2B2_MAIN,
  IMAGE_PROPS_PROJECT_A4D04DF_AVATAR_ANITA,
  IMAGE_PROPS_PROJECT_A4D04DF_AVATAR_BRENDA,
  IMAGE_PROPS_PROJECT_A4D04DF_MAIN,
  IMAGE_PROPS_PROJECT_LK4S12M_HARRIS_GOLDSTEIN,
  IMAGE_PROPS_PROJECT_LK4S12M_MAIN,
  IMAGE_PROPS_PROJECT_YR8UGE2_AVATAR_PAUL_AISEN,
  IMAGE_PROPS_PROJECT_YR8UGE2_MAIN,
} from '@/constants/images'
import { SVG_PROPS_LOCATION_GREY } from '@/constants/svgs'
import {
  albertEinsteinCollegeMedicine,
  americanFriendsOfUHN,
  Foundation,
  pmcf,
  usc,
} from './foundations'

export interface AvatarChild {
  avatar: string
  label: string
}

export interface Avatar {
  avatar: string
  children: AvatarChild
  label: string
}

export interface SharingCommon {
  twitterUrl: string
  facebookUrl: string
  facebookHashtag: string
  linkedinUrl: string
  linkedinSummary?: string
  linkedinSource?: string
  linkedinTitle?: string
  emailSubject: string
  emailUrl: string
}

export interface SharingSectionContent {
  twitterTitle: string
  facebookQuote: string
  emailBody: string
}

export interface Sharing {
  common: SharingCommon
  donated: SharingSectionContent
  project: SharingSectionContent
}

export interface Reseacher {
  avatar?: string
  prefix?: string
  first_name: string
  last_name: string
  title: string
}

export interface Metatags {
  description: string
  image: string
  title: string
  url: string
  twitterImage: string
}

export interface ReseacherInstitute {
  location: string
  name: string
}

export enum SharingSection {
  Donated = 'donated',
  Project = 'project',
}

export interface Project {
  clickID: string
  clickIDCode: string
  embeddedCode: string
  slug: string
  active?: boolean
  avatars?: Avatar[]
  researchers: Reseacher[]
  description: string
  disease?: string
  foundations: Foundation[]
  goals: number[]
  goalType: 'fixed' | 'flexible'
  id: string
  image: string
  imageAlt?: string
  metatags: Metatags
  sharing: Sharing
  researchInstitute: ReseacherInstitute
  title: string
  video?: boolean
  goalTypeTooltipTitle: string
  goalTypeTooltipBody: string
}

const goals = [10000, 50000, 100000, 500000, 1000000]

export const PROJECTS: Project[] = [
  {
    // Harris Goldstein - optimize-cell-activity-non-hodgkins
    id: '97a41de9-4df7-4f7e-8d0a-a777fe7f745a',
    clickID: 'homepage-optimize-cell-activity-non-hodgkins',
    active: true,
    clickIDCode: 'Harris-Goldstein-NH',
    embeddedCode: 'LK4S12M',
    slug: 'optimize-cell-activity-non-hodgkins',
    avatars: [
      {
        avatar: IMAGE_PROPS_FOUNDATION_ALBERT_EINSTEIN.getSrc(),
        label: 'Albert Einstein College of Medicine',
        children: {
          avatar: SVG_PROPS_LOCATION_GREY.getSrc(),
          label: 'New York, United States',
        },
      },
      {
        avatar: IMAGE_PROPS_PROJECT_LK4S12M_HARRIS_GOLDSTEIN.getSrc(),
        label: 'Dr. Harris Goldstein',
        children: {
          avatar: '',
          label: 'Lead Researcher',
        },
      },
    ],
    researchers: [
      {
        avatar: IMAGE_PROPS_PROJECT_LK4S12M_HARRIS_GOLDSTEIN.getSrc(),
        prefix: 'Dr.',
        first_name: 'Harris',
        last_name: 'Goldstein',
        title: 'Lead Researcher',
      },
    ],
    researchInstitute: {
      location: '',
      name: 'Albert Einstein College of Medicine',
    },
    title:
      'Optimizing CAR-T cell activity to treat Non-Hodgkin’s lymphoma and leukemia',
    description:
      'Amplify and train CAR-T cells to deliver more potent anti-cancer activity—ultimately, enabling the cure of previously fatal lymphomas and leukemias.',
    foundations: [albertEinsteinCollegeMedicine],
    goals: [200000],
    goalType: 'flexible',
    image: IMAGE_PROPS_PROJECT_LK4S12M_MAIN.getSrc(),
    video: false,
    // TODO: og
    metatags: {
      description:
        'See research focused on treating lymphoma and leukemia by training cells to deliver anti-cancer activity. Donate directly today!',
      image:
        'https://kernls.com/assets/images/og/project_optimize-cell-activity-non-hodgkins.png',
      title: 'Treating lymphoma with anti-cancer cells | Kernls',
      url: 'https://www.kernls.com/projects/optimize-cell-activity-non-hodgkins',
      twitterImage:
        'https://kernls.com/assets/images/og/twitter_project_optimize-cell-activity-non-hodgkins.png',
    },
    disease: 'Non-Hodgkin’s',
    goalTypeTooltipTitle: 'Flexible Goal',
    goalTypeTooltipBody:
      'This research will receive all of the funds raised regardless of whether it meets its overall funding goal.',
    sharing: {
      common: {
        twitterUrl:
          'https://kernls.com/projects/optimize-cell-activity-non-hodgkins?utm_source=Twitter&utm_medium=Social&utm_campaign=Share',
        facebookUrl: 'https://bit.ly/3fMyC6C',
        facebookHashtag: '#research',
        linkedinUrl: 'https://bit.ly/2SUN4Aw',
        emailSubject: 'Check out this interesting research on lymphoma',
        emailUrl: 'https://bit.ly/2RYUMd7',
      },
      donated: {
        twitterTitle:
          'Harris Goldstein, M.D., is training an army of anti-cancer cells to treat #lymphoma and #leukaemia. Help support this important #research on Kernls.com! @EinsteinMed:',
        facebookQuote:
          '20,000+ Americans die from Non-Hodgkin’s lymphoma every year. Harris Goldstein, M.D., is training an army of anti-cancer cells to change that. Help support this important #research on Kernls.com',
        emailBody: `
          Hey!

          I just donated directly to a research project that aims to treat relapsed lymphoma and leukemia. 
          
          Every dollar helps get us closer to life-saving treatments and cures. 
          
          I thought you’d be interested in checking it out:         
        `,
      },
      project: {
        twitterTitle:
          'Harris Goldstein, M.D., is training an army of anti-cancer cells to treat #lymphoma and #leukaemia. Help support this important #research on Kernls.com! @EinsteinMed:',
        facebookQuote:
          '20,000+ Americans die from Non-Hodgkin’s lymphoma every year. Harris Goldstein, M.D., is training an army of anti-cancer cells to change that. Help support this important #research on Kernls.com',
        emailBody: `
          Hey!

          I thought you’d be interested in checking out this lymphoma project on Kernls: https://bit.ly/2RYUMd7

          You can donate directly to this research team looking to treat relapsed lymphoma and leukemia by training cells. 
          
          Every dollar helps get us closer to life-saving treatments and cures.
      `,
      },
    },
  },

  {
    // Anita Autry - Postpartum Depression
    id: 'a6ab9ab0-eaf3-407c-8954-05309ad96d5a',
    clickID: 'homepage-untangling-postpartum-depression',
    active: true,
    clickIDCode: 'Anita-Autry-PD',
    embeddedCode: 'A4D04DF',
    slug: 'untangling-postpartum-depression',
    avatars: [
      {
        avatar: IMAGE_PROPS_FOUNDATION_ALBERT_EINSTEIN.getSrc(),
        label: 'Albert Einstein College of Medicine',
        children: {
          avatar: SVG_PROPS_LOCATION_GREY.getSrc(),
          label: 'New York, United States',
        },
      },
      {
        avatar: IMAGE_PROPS_PROJECT_A4D04DF_AVATAR_ANITA.getSrc(),
        label: 'Dr. Anita Autry',
        children: {
          avatar: '',
          label: 'Lead Researcher',
        },
      },
      {
        avatar: IMAGE_PROPS_PROJECT_A4D04DF_AVATAR_BRENDA.getSrc(),
        label: 'Brenda Abdelmesih',
        children: {
          avatar: '',
          label: 'Graduate Student Researcher',
        },
      },
    ],
    researchers: [
      {
        avatar: IMAGE_PROPS_PROJECT_A4D04DF_AVATAR_ANITA.getSrc(),
        prefix: 'Dr.',
        first_name: 'Anita',
        last_name: 'Autry',
        title: 'Lead Researcher',
      },
      {
        avatar: IMAGE_PROPS_PROJECT_A4D04DF_AVATAR_BRENDA.getSrc(),
        prefix: '',
        first_name: 'Brenda',
        last_name: 'Abdelmesih',
        title: 'Graduate Student Researcher',
      },
    ],
    researchInstitute: {
      location: '',
      name: 'Albert Einstein College of Medicine',
    },
    title:
      'Untangling how stress disrupts maternal brain communication and mental health',
    description:
      'Study the underlying brain communication mothers need to bond with infants and how stress disrupts this process.',
    foundations: [albertEinsteinCollegeMedicine],
    goals: [25000],
    goalType: 'flexible',
    image: IMAGE_PROPS_PROJECT_A4D04DF_MAIN.getSrc(),
    imageAlt: IMAGE_PROPS_PROJECT_A4D04DF_MAIN.getAlt(),
    video: false,
    metatags: {
      description:
        'Access research focused on potential treatments for postpartum depression by examining the impact of maternal stress on the brain. Donate directly today!',
      image:
        'https://kernls.com/assets/images/og/project_untangling-postpartum-depression.png',
      title: 'Maternal stress and postpartum depression | Kernls',
      url: 'https://www.kernls.com/projects/untangling-postpartum-depression',
      twitterImage:
        'https://kernls.com/assets/images/og/twitter_project_untangling-postpartum-depression.png',
    },
    disease: 'Postpartum Depression',
    goalTypeTooltipTitle: 'Flexible Goal',
    goalTypeTooltipBody:
      'This research will receive all of the funds raised regardless of whether it meets its overall funding goal.',
    sharing: {
      common: {
        twitterUrl:
          'https://kernls.com/projects/untangling-postpartum-depression?utm_source=Twitter&utm_medium=Social&utm_campaign=Share',
        facebookUrl: 'https://bit.ly/3tA3viU',
        facebookHashtag: '#postpartum',
        linkedinUrl: 'https://bit.ly/3lvhDqI',
        emailSubject: 'Check out this postpartum research on Kernls',
        emailUrl: 'https://bit.ly/2OHxLK5',
      },
      donated: {
        twitterTitle:
          'Inspiring mentor-mentee team @anitaautrydixon & @bren_abdelmesih are developing a science-based foundation for potential treatments for #postpartum #depression. Help support this important #research on Kernls.com! #womenshealth @EinsteinMed:',
        facebookQuote:
          'This inspiring mentor-mentee team at Albert Einstein College of Medicine is developing a science-based foundation for building potential treatments for #postpartumdepression by exploring the impact of stress on the maternal brain. #womenshealth #postpartum',
        emailBody: `
          Hey!

          I just donated directly to a female-led research project on Kernls.com exploring how maternal stress leads to postpartum depression. This research aims 
          Every dollar helps get us closer to life-saving treatments and cures. 
          
          I thought you’d be interested in checking it out: 
    
          `,
      },
      project: {
        twitterTitle:
          'Inspiring mentor-mentee team @anitaautrydixon & @bren_abdelmesih are developing a science-based foundation for potential treatments for #postpartum #depression. Help support this important #research on Kernls.com! #womenshealth @EinsteinMed:',
        facebookQuote:
          'This inspiring mentor-mentee team at Albert Einstein College of Medicine is developing a science-based foundation for building potential treatments for #postpartumdepression by exploring the impact of stress on the maternal brain. #womenshealth #postpartum',
        emailBody: `
        Hey!

        I thought you’d be interested in checking out this maternal mental health project on Kernls: https://bit.ly/2OHxLK5
        
        You can donate directly to this female-led research team looking to provide a scientific-based foundation for potential treatments for postpartum depression! 
        
        Every dollar helps get us closer to life-saving treatments and cures. 

      `,
      },
    },
  },

  {
    // AK Pancreatic
    id: '37fddd64-2773-4b56-803c-2ae5d295d551',
    clickID: 'homepage-click-pancreatic-cancer-keating',
    clickIDCode: 'PC',
    embeddedCode: '35UEmH7',
    slug: 'slow-pancreatic-cancer-growth',
    active: true,
    avatars: [
      {
        avatar: IMAGE_PROPS_FOUNDATION_PMCF_UHN.getSrc(),
        label:
          'Cell Therapy Translational Research Laboratory at University of Toronto',
        children: {
          avatar: SVG_PROPS_LOCATION_GREY.getSrc(),
          label: 'Toronto, Canada',
        },
      },
      {
        avatar: IMAGE_PROPS_PROJECT_35UEmH7_AVATAR_ARMAND_KEATING.getSrc(),
        label: 'Dr. Armand Keating',
        children: {
          avatar: '',
          label: 'Lead Researcher',
        },
      },
    ],
    researchers: [
      {
        avatar: IMAGE_PROPS_PROJECT_35UEmH7_AVATAR_ARMAND_KEATING.getSrc(),
        prefix: 'Dr.',
        first_name: 'Armand',
        last_name: 'Keating',
        title: 'Lead Researcher',
      },
    ],
    researchInstitute: {
      location: 'Toronto Western Hospital, University of Toronto',
      name: 'The Cell Therapy Lab, Krembil Research Institute',
    },
    description:
      'Study how the different cells that make up a pancreatic cancer tumor communicate to promote growth and design a way to cut off this communication.',
    disease: 'Pancreatic Cancer',
    foundations: [americanFriendsOfUHN, pmcf],
    goals: [60000],
    goalType: 'flexible',
    image: IMAGE_PROPS_PROJECT_35UEmH7_MAIN.getSrc(),
    metatags: {
      description:
        'Access plain-language research on slowing the growth of pancreatic cancer tumors by studying the role of special, non-cancerous cells. Donate directly today!',
      image:
        'https://kernls.com/assets/images/og/project_pancreatic-cancer.png',
      title: 'Slow pancreatic cancer tumor growth | Kernls',
      url: 'https://www.kernls.com/projects/slow-pancreatic-cancer-growth',
      twitterImage:
        'https://kernls.com/assets/images/og/twitter_project_pancreatic-cancer.png',
    },
    title:
      'Slow tumor growth in pancreatic cancer by cutting off cell communication',
    video: true,
    sharing: {
      common: {
        twitterUrl:
          'https://www.kernls.com/projects/slow-pancreatic-cancer-growth?utm_source=Twitter&utm_medium=Social&utm_campaign=Share',
        facebookUrl: 'https://bit.ly/2WpYKKj',
        facebookHashtag: '#PancreaticCancer',
        linkedinUrl: 'https://bit.ly/34pk3jj',
        emailSubject: 'Check out this research project on Kernls',
        emailUrl: 'https://bit.ly/3r83GSb',
      },
      donated: {
        twitterTitle:
          'I donated directly to life-saving #research on Kernls.com! Please help fund research to find new treatments for #PancreaticCancer @UHN_Research:',
        facebookQuote:
          'I just donated directly to life-saving #research on Kernls.com, every dollar helps get us closer to treatments and cures. Please join in funding this research project to find new treatments for #PancreaticCancer:',
        emailBody: `
          Hey!
  
          I just donated directly to a pancreatic cancer research project on Kernls.com. 
          
          Every dollar helps get us closer to life-saving treatments and cures. 
          
          I thought you’d be interested in checking it out:
  
        `,
      },
      project: {
        twitterTitle:
          'Help fund research to find new treatments for #PancreaticCancer.  Donate directly to life-saving #research on Kernls.com! @UHN_Research:',
        facebookQuote:
          'Please join in funding this research project to find new treatments for #PancreaticCancer. Donate directly to life-saving #research on Kernls.com, every dollar helps to get us closer to treatments and cures:',

        emailBody: `
      Hey!

      I thought you’d be interested in checking out this project: https://bit.ly/3r83GSb. 
      
      You can donate directly to pancreatic cancer research on Kernls.com.
      
      Every dollar helps get us closer to life-saving treatments and cures.

    `,
      },
    },
    goalTypeTooltipTitle: 'Flexible Goal',
    goalTypeTooltipBody:
      'This research will receive all of the funds raised regardless of whether it meets its overall funding goal.',
  },

  {
    // SG - Biliary Tract
    id: 'c2ecf4e5-6a36-4aef-af02-de822a94da90',
    clickID: 'homepage-click-biliary-tract-okane',
    clickIDCode: 'BTC',
    embeddedCode: '7CRQ2B2',
    slug: 'sequencing-biliary-tract-cancers',
    active: true,
    avatars: [
      {
        avatar: IMAGE_PROPS_FOUNDATION_PMCF_UHN.getSrc(),
        label: 'Princess Margaret Cancer Centre',
        children: {
          avatar: SVG_PROPS_LOCATION_GREY.getSrc(),
          label: 'Toronto, Canada',
        },
      },
      {
        avatar: IMAGE_PROPS_PROJECT_7CRQ2B2_AVATAR_STEVE_GALLINGER.getSrc(),
        label: 'Dr. Steve Gallinger',
        children: {
          avatar: '',
          label: 'Lead Researcher',
        },
      },
      {
        avatar: IMAGE_PROPS_PROJECT_7CRQ2B2_AVATAR_GRAINNE_OKANE.getSrc(),
        label: 'Dr. Grainne O’Kane',
        children: {
          avatar: '',
          label: 'Lead Researcher',
        },
      },
    ],
    researchers: [
      {
        avatar: IMAGE_PROPS_PROJECT_7CRQ2B2_AVATAR_STEVE_GALLINGER.getSrc(),
        prefix: 'Dr.',
        first_name: 'Steve',
        last_name: 'Gallinger',
        title: 'Lead Researcher',
      },
      {
        avatar: IMAGE_PROPS_PROJECT_7CRQ2B2_AVATAR_GRAINNE_OKANE.getSrc(),
        prefix: 'Dr.',
        first_name: 'Grainne',
        last_name: 'O’Kane',
        title: 'Lead Researcher',
      },
    ],
    researchInstitute: {
      location: 'Princess Margaret Cancer Centre',
      name: 'University of Toronto, University Health Network',
    },
    goalTypeTooltipTitle: 'Flexible Goal',
    goalTypeTooltipBody:
      'This research will receive all of the funds raised regardless of whether it meets its overall funding goal.',
    title:
      'Unlocking potential treatments for biliary tract cancers by studying the DNA of advanced patients',
    description:
      'This study aims to use genetic sequencing to explore this rare, deadly and underfunded disease so the data can be mined and used to develop more effective and personalized treatments.',
    foundations: [americanFriendsOfUHN, pmcf],
    goals,
    goalType: 'flexible',
    image: IMAGE_PROPS_PROJECT_7CRQ2B2_MAIN.getSrc(),
    video: true,
    metatags: {
      description:
        'Access plain-language research on finding new treatments for biliary tract cancers using genetic sequencing. Donate directly today!',
      image:
        'https://kernls.com/assets/images/og/project_biliary-tract-cancer.png',
      title: 'Biliary tract cancers research using DNA | Kernls',
      url: 'https://www.kernls.com/projects/sequencing-biliary-tract-cancers',
      twitterImage:
        'https://kernls.com/assets/images/og/twitter_project_biliary-tract-cancer.png',
    },
    disease: 'Biliary Tract Cancer',
    sharing: {
      common: {
        twitterUrl:
          'https://www.kernls.com/projects/sequencing-biliary-tract-cancers?utm_source=Twitter&utm_medium=Social&utm_campaign=Share',
        facebookUrl: 'https://bit.ly/2Wsv7YK',
        facebookHashtag: '#research',
        linkedinUrl: 'https://bit.ly/3nxEL8m',
        emailSubject: 'Check out this research project on Kernls',
        emailUrl: 'https://bit.ly/34qGrZN',
      },
      donated: {
        twitterTitle:
          'I donated directly to life-saving #research on Kernls.com! Please help fund research to find new treatments for biliary tract cancers @UHN_Research:',
        facebookQuote:
          'I just donated directly to life-saving #research on Kernls.com, every dollar helps get us closer to treatments and cures. Please join in funding this research project looking to find new treatments and cures for those with biliary tract cancers:',
        emailBody: `
          Hey!
  
          I just donated directly to a pancreatic cancer research project on Kernls.com. 
          
          Every dollar helps get us closer to life-saving treatments and cures. 
          
          I thought you’d be interested in checking it out:
  
        `,
      },
      project: {
        twitterTitle:
          'Please help fund research to find new treatments for biliary tract cancers @UHN_Research. Donate directly to life-saving #research on Kernls.com:',
        facebookQuote:
          'Please join in funding this research project looking to find new treatments and cures for those with biliary tract cancers. Donate directly to life-saving #research on Kernls.com, every dollar helps to get us closer to treatments and cures.',

        emailBody: `
      Hey!

      I thought you’d be interested in checking out this project: https://bit.ly/34qGrZN. 
      
      You can donate directly to research focused on biliary tract cancers on Kernls.com.
      
      Every dollar helps to get us closer to life-saving treatments and cures. 

    `,
      },
    },
  },

  {
    // ML - Breast cancer
    id: '3d6c2183-934c-431b-98fa-1ffc40151a2a',
    clickID: 'homepage-click-breast-cancer-lupien',
    active: true,
    clickIDCode: 'BC',
    embeddedCode: '57E36H3',
    slug: 'breast-cancer-relapse',
    avatars: [
      {
        avatar: IMAGE_PROPS_FOUNDATION_PMCF_UHN.getSrc(),
        label: 'Princess Margaret Cancer Centre, at University of Toronto',
        children: {
          avatar: SVG_PROPS_LOCATION_GREY.getSrc(),
          label: 'Toronto, Canada',
        },
      },
      {
        avatar: IMAGE_PROPS_PROJECT_57E36H3_AVATAR_MATHIEU_LUPIEN.getSrc(),
        label: 'Dr. Mathieu Lupien',
        children: {
          avatar: '',
          label: 'Senior Scientist',
        },
      },
      {
        avatar: IMAGE_PROPS_PROJECT_57E36H3_AVATAR_DAVID_CESCON.getSrc(),
        label: 'Dr. David Cescon',
        children: {
          avatar: '',
          label: 'Clinician Scientist',
        },
      },
    ],
    researchers: [
      {
        avatar: IMAGE_PROPS_PROJECT_57E36H3_AVATAR_MATHIEU_LUPIEN.getSrc(),
        prefix: 'Dr.',
        first_name: 'Mathieu',
        last_name: 'Lupien',
        title: 'Senior Scientist',
      },
      {
        avatar: IMAGE_PROPS_PROJECT_57E36H3_AVATAR_DAVID_CESCON.getSrc(),
        prefix: 'Dr.',
        first_name: 'David',
        last_name: 'Cescon',
        title: 'Clinician Scientist',
      },
    ],
    researchInstitute: {
      location: 'Princess Margaret Cancer Centre',
      name: 'University of Toronto, University Health Network',
    },
    title:
      'Pursuing a cure for breast cancer relapse using recent advances in technology',
    description:
      'Map out breast cancer tumors from 500 women at risk for relapse and use technology to find weaknesses in the tumor that can lead to treatments.',
    foundations: [americanFriendsOfUHN, pmcf],
    goals,
    goalType: 'flexible',
    image: IMAGE_PROPS_PROJECT_57E36H3_MAIN.getSrc(),
    video: true,
    metatags: {
      description:
        'Access plain-language research on using artificial intelligence to find potential new treatments for breast cancer relapse. Donate directly today!',
      image: 'https://kernls.com/assets/images/og/project_breast-cancer.png',
      title: 'Find breast cancer treatments using AI | Kernls',
      url: 'https://www.kernls.com/projects/breast-cancer-relapse',
      twitterImage:
        'https://kernls.com/assets/images/og/twitter_project_breast-cancer.png',
    },
    disease: 'Breast Cancer',
    goalTypeTooltipTitle: 'Flexible Goal',
    goalTypeTooltipBody:
      'This research will receive all of the funds raised regardless of whether it meets its overall funding goal.',
    sharing: {
      common: {
        twitterUrl:
          'https://www.kernls.com/projects/breast-cancer-relapse?utm_source=Twitter&utm_medium=Social&utm_campaign=Share',
        facebookUrl: 'https://bit.ly/3mylOAW',
        facebookHashtag: '#breastcancer',
        linkedinUrl: 'https://bit.ly/2KHwVdW',
        emailSubject: 'Check out this research project on Kernls',
        emailUrl: 'https://bit.ly/3mujs67',
      },
      donated: {
        twitterTitle:
          'I donated directly to life-saving #research on Kernls.com! Help fund research finding new treatments for #breastcancer using #ArtificialIntelligence @MatLupien @UHN_Research:',
        facebookQuote:
          'I just donated directly to life-saving #research on Kernls.com, every dollar helps get us closer to treatments and cures. Please join in funding this research project finding new treatments for #breastcancer relapse using #ArtificialIntelligence',
        emailBody: `
            Hey!
    
            I just donated directly to a breast cancer research project on Kernls.com. 
            
            Every dollar helps get us closer to life-saving treatments and cures.
            
            I thought you’d be interested in checking it out: 
    
          `,
      },
      project: {
        twitterTitle:
          'Help fund research finding new treatments for #breastcancer using #ArtificialIntelligence. Donate directly to life-saving #research on Kernls.com! @MatLupien @UHN_Research:',
        facebookQuote:
          'Please join in funding this research project finding new treatments for #breastcancer relapse using #ArtificialIntelligence. Donate directly to life-saving #research on Kernls.com, every dollar helps to get us closer to treatments and cures.',
        emailBody: `
        Hey!

        I thought you’d be interested in checking out this project: https://bit.ly/3mujs67. 
        
        You can donate directly to breast cancer research on Kernls.com. 
        
        Every dollar helps get us closer to life-saving treatments and cures.

      `,
      },
    },
  },

  // {
  //   // HK Breast
  //   id: '45e8c62f-0550-46d4-87b4-36cd39f3bf44',
  //   clickID: 'homepage-click-breast-cancer-benjamin',
  //   clickIDCode: 'HK',
  //   embeddedCode: '45KSdL8',
  //   slug: 'personalized-breast-cancer-treatment',
  //   active: true,
  //   avatars: [
  //     {
  //       avatar: IMAGE_PROPS_FOUNDATION_PMCF_UHN.getSrc(),
  //       label: 'Princess Margaret Cancer Centre, at University of Toronto',
  //       children: {
  //         avatar: SVG_PROPS_LOCATION_GREY.getSrc(),
  //         label: 'Toronto, Canada',
  //       },
  //     },
  //     {
  //       avatar: '/assets/images/projects/hk-avatar-benjamin.png',
  //       label: 'Dr. Benjamin Haibe-Kains',
  //       children: {
  //         avatar: '',
  //         label: 'Lead Researcher',
  //       },
  //     },
  //     {
  //       avatar: '/assets/images/projects/hk-avatar-trevor.png',
  //       label: 'Dr. Trevor Pugh',
  //       children: {
  //         avatar: '',
  //         label: 'Co-Lead Researcher',
  //       },
  //     },
  //   ],
  //   researchers: [
  //     {
  //       avatar: '/assets/images/projects/hk-avatar-benjamin.png',
  //       prefix: 'Dr.',
  //       first_name: 'Benjamin',
  //       last_name: 'Haibe-Kains',
  //       title: 'Lead Researcher',
  //     },
  //     {
  //       avatar: '/assets/images/projects/hk-avatar-trevor.png',
  //       prefix: 'Dr.',
  //       first_name: 'Trevor',
  //       last_name: 'Pugh',
  //       title: 'Co-Lead Researcher',
  //     },
  //   ],
  //   researchInstitute: {
  //     location: 'Toronto Western Hospital, University of Toronto',
  //     name: 'Princess Margaret Cancer Centre',
  //   },
  //   description:
  //     'Study of how the different tumor cells can be targeted to create unique, personally-tailored treatment options for breast cancer patients',
  //   disease: 'Breast Cancer',
  //   foundations: [americanFriendsOfUHN, pmcf],
  //   goals,
  //   goalType: 'flexible',
  //   image: '/assets/images/projects/hk-main.png',
  //   metatags: {
  //     description:
  //       'Access plain-language research on how applying machine learning to patient data can lead to personalized treatment for breast cancer. Donate directly today!',
  //     image:
  //       'https://kernls.com/assets/images/og/project_personalized-breast-cancer-treatment.png',
  //     title: 'Personalized treatment for breast cancer | Kernls',
  //     url:
  //       'https://www.kernls.com/projects/personalized-breast-cancer-treatment',
  //     twitterImage:
  //       'https://kernls.com/assets/images/og/twitter_project_personalized-breast-cancer-treatment.png',
  //   },
  //   title: 'Personalized Treatment Options for Breast Cancer Patients',
  //   video: '',
  //   sharing: {
  //     common: {
  //       twitterUrl:
  //         'https://www.kernls.com/projects/personalized-breast-cancer-treatment?utm_source=Twitter&utm_medium=Social&utm_campaign=Share',
  //       facebookUrl: 'https://bit.ly/2YRB42F',
  //       facebookHashtag: '#research',
  //       linkedinUrl: 'https://bit.ly/2YQYaWZ',
  //       emailSubject: 'Check out this research project on Kernls',
  //       emailUrl: 'https://bit.ly/3cLf9Cn',
  //     },
  //     donated: {
  //       twitterTitle:
  //         '@bhaibeka and his team are using #MachineLearning to personalize #BreastCancer treatment! Donate directly to this life-saving #research on Kernls.com! @UHN_Research:',
  //       facebookQuote:
  //         'AI and Machine Learning can get us closer to personalized treatment options for breast cancer patients! I just donated directly to a life-saving #research on Kernls.com, every dollar helps get us closer to treatments and cures. Please join in supporting this research:',
  //       emailBody: `
  //       Hey!

  //       I just donated directly to a research project on Kernls.com that is using machine learning to personalize treatment options for breast cancer patients.

  //       Every dollar helps get us closer to life-saving treatments and cures.

  //       I thought you’d be interested in checking it out:
  //       `,
  //     },
  //     project: {
  //       twitterTitle:
  //         '@bhaibeka and his team are using #MachineLearning to personalize #BreastCancer treatment! Donate directly to this life-saving #research on Kernls.com! @UHN_Research:',
  //       facebookQuote:
  //         'AI and Machine Learning can get us closer to personalized treatment options for breast cancer patients! I just donated directly to a life-saving #research on Kernls.com, every dollar helps get us closer to treatments and cures. Please join in supporting this research:',

  //       emailBody: `
  //       Hey!

  //       I thought you’d be interested in checking out this project on Kernls: https://bit.ly/3cLf9Cn

  //       You can donate directly to this project that’s using machine learning to personalize treatment options for breast cancer patients.

  //       Every dollar helps get us closer to life-saving treatments and cures.

  //   `,
  //     },
  //   },
  //   goalTypeTooltipTitle: 'Flexible Goal',
  //   goalTypeTooltipBody:
  //     'This research will receive all of the funds raised regardless of whether it meets its overall funding goal.',
  // },

  // PA - Alzheimers disease
  {
    id: 'db3b5345-eb47-4c4c-a0b5-40a8602b4345',
    clickID: 'homepage-click-alzheimers-detection-aisen',
    clickIDCode: 'AP',
    embeddedCode: 'YR8UGE2',
    slug: 'alzheimers-disease-detection',
    active: true,
    title:
      "Detect Alzheimer's disease with a simple blood test before symptoms appear",
    description:
      'We want to find a safe and affordable test to diagnose AD even in those without symptoms, ultimately allowing us to treat AD earlier, before memory loss occurs.',
    video: true,
    avatars: [
      {
        avatar: IMAGE_PROPS_FOUNDATION_ATRI_USC.getSrc(),
        label: 'ATRI at University of Southern California',
        children: {
          avatar: SVG_PROPS_LOCATION_GREY.getSrc(),
          label: 'San Diego, California',
        },
      },
      {
        avatar: IMAGE_PROPS_PROJECT_YR8UGE2_AVATAR_PAUL_AISEN.getSrc(),
        label: 'Dr. Paul Aisen',
        children: {
          avatar: '',
          label: 'Lead Researcher',
        },
      },
    ],
    foundations: [usc],
    researchers: [
      {
        avatar: IMAGE_PROPS_PROJECT_YR8UGE2_AVATAR_PAUL_AISEN.getSrc(),
        prefix: 'Dr.',
        first_name: 'Paul',
        last_name: 'Aisen',
        title: 'Lead Researcher',
      },
    ],
    researchInstitute: {
      location: 'Alzheimer’s Therapeutic Research Institute',
      name: 'Keck School of Medicine, University of Southern California',
    },
    goals: [1000000],
    goalType: 'flexible',
    image: IMAGE_PROPS_PROJECT_YR8UGE2_MAIN.getSrc(),
    metatags: {
      description:
        "Support research focused on detecting Alzheimer's disease before memory loss happens so we can find treatments and cures faster. Donate directly today!",
      image:
        'https://kernls.com/assets/images/og/project_alzheimers-disease-detection.png',
      title: 'Detect Alzheimer’s disease before memory loss | Kernls',
      url: 'https://www.kernls.com/projects/alzheimers-disease-detection',
      twitterImage:
        'https://kernls.com/assets/images/og/twitter_project_alzheimers-disease-detection.png',
    },
    disease: 'Alzheimer’s Disease',
    goalTypeTooltipTitle: 'Flexible Goal',
    goalTypeTooltipBody:
      'This research will receive all of the funds raised regardless of whether it meets its overall funding goal.',
    sharing: {
      common: {
        twitterUrl:
          'https://www.kernls.com/projects/alzheimers-disease-detection?utm_source=Twitter&utm_medium=Social&utm_campaign=Share',
        facebookUrl: 'https://bit.ly/3tH2ZA2',
        facebookHashtag: '#Alzheimers',
        linkedinUrl: 'https://bit.ly/3eukRYm',
        emailSubject: 'Check out this research project on Kernls',
        emailUrl: 'https://bit.ly/3euirZQ',
      },
      donated: {
        twitterTitle:
          'I donated directly to life-saving #research on Kernls.com! Help #ENDALZ by supporting research detecting #Alzheimers before memory loss occurs @ATRI_USC @KeckMedUSC:',
        facebookQuote:
          'I just donated directly to life-saving #research on Kernls.com, every dollar helps get us closer to treatments and cures. Please join in funding this research project looking to detect #Alzheimers disease years before memory loss occurs:',
        emailBody: `
        Hey!

        I just donated directly to research on detecting Alzheimer’s disease on Kernls.com. 

        Detecting Alzheimer’s disease early gives us a better chance at finding treatments and cures faster!

        I thought you’d be interested in checking it out: 
      `,
      },
      project: {
        twitterTitle:
          'Help #ENDALZ by supporting research detecting #Alzheimers before memory loss occurs @ATRI_USC @KeckMedUSC! Donate directly to life-saving #research on Kernls.com:',
        facebookQuote:
          'Please join in funding this research project looking to detect #Alzheimers disease years before memory loss occurs. Donate directly to life-saving #research on Kernls.com, every dollar helps to get us closer to treatments and cures:',
        emailBody: `
          Hey!

          I thought you’d be interested in checking out this project: https://bit.ly/3euirZQ
          
          You can donate directly to research on detecting Alzheimer’s disease on Kernls.com. 
          
          Detecting Alzheimer’s disease early gives us a better chance at finding treatments and cures faster!        
        `,
      },
    },
  },
  // MR - Alzheimer's Disease
  // {
  //   id: '3679a391-c8d5-4c8e-bc85-23d875a77f00',
  //   clickID: 'homepage-click-alzheimers-down-syndrome-rafii',
  //   clickIDCode: 'AD',
  //   embeddedCode: '5IDNEAV',
  //   slug: 'alzheimers-disease-down-syndrome',
  //   active: true,
  //   video: true,
  //   avatars: [
  //     {
  //       avatar: '/assets/images/foundations/atri-logo1.png',
  //       label: 'ATRI at University of Southern California',
  //       children: {
  //         avatar: SVG_PROPS_LOCATION_GREY.getSrc(),
  //         label: 'San Diego, California',
  //       },
  //     },
  //     {
  //       avatar: '/assets/images/foundations/mrafii1.png',
  //       label: 'Dr. Michael Rafii',
  //       children: {
  //         avatar: '',
  //         label: 'Lead Researcher',
  //       },
  //     },
  //   ],
  //   researchers: [
  //     {
  //       avatar: '/assets/images/foundations/mrafii1.png',
  //       prefix: 'Dr.',
  //       first_name: 'Michael',
  //       last_name: 'Rafii',
  //       title: 'Lead Researcher',
  //     },
  //   ],
  //   researchInstitute: {
  //     location: 'Alzheimer’s Therapeutic Research Institute',
  //     name: 'Keck School of Medicine, University of Southern California',
  //   },
  //   title:
  //     "Make Alzheimer's research more accessible to participants with Down syndrome",
  //   description:
  //     "Study a cohort of 120 people with both Down syndrome (DS) and Alzheimer's disease (AD) to gather insights about the efficacy and timing of interventions in those without a family history of AD.",
  //   foundations: [usc],
  //   goals,
  //   goalType: 'flexible',
  //   image: '/assets/images/alzheimer-disease-down-syndrome.png',
  //   metatags: {
  //     description:
  //       "Access plain-language research on making Alzheimer's disease studies accessible to those with Down syndrome, a high-risk population. Donate directly today!",
  //     image:
  //       'https://kernls.com/assets/images/og/project_alzheimers-down-syndrome.png',
  //     title: "Down syndrome and Alzheimer's disease | Kernls",
  //     url: 'https://www.kernls.com/projects/alzheimers-disease-down-syndrome',
  //     twitterImage:
  //       'https://kernls.com/assets/images/og/twitter_project_alzheimers-down-syndrome.png',
  //   },
  //   disease: 'Alzheimer’s Disease',

  //   goalTypeTooltipTitle: 'Flexible Goal',
  //   goalTypeTooltipBody:
  //     'This research will receive all of the funds raised regardless of whether it meets its overall funding goal.',
  //   sharing: {
  //     common: {
  //       twitterUrl:
  //         'https://www.kernls.com/projects/alzheimers-disease-down-syndrome?utm_source=Twitter&utm_medium=Social&utm_campaign=Share',
  //       facebookUrl: 'https://bit.ly/38ei42F',
  //       facebookHashtag: '#DownSyndrome',
  //       linkedinUrl: 'https://bit.ly/3aptjru',
  //       emailSubject: 'Check out this research project on Kernls',
  //       emailUrl: 'https://bit.ly/3mAYi6l',
  //     },
  //     donated: {
  //       twitterTitle:
  //         'I donated directly to life-saving #research on Kernls.com! Help make #AlzheimersResearch more inclusive for those with #DownSyndrome #ENDALZ @ATRI_USC @KeckMedUSC:',
  //       facebookQuote:
  //         'I just donated directly to life-saving #research on Kernls.com, every dollar helps get us closer to treatments and cures. Please join in funding this research project looking to make #AlzheimersResearch more inclusive for those with #DownSyndrome, a high-risk population:',
  //       emailBody: `
  //           Hey!

  //           I just donated directly to research on preventing Alzheimer’s disease in those with Down syndrome on Kernls.com.

  //           Every dollar helps get us closer to life-saving treatments and cures.

  //           I thought you’d be interested in checking it out:

  //         `,
  //     },
  //     project: {
  //       twitterTitle:
  //         'Help make #AlzheimersResearch more inclusive for those with #DownSyndrome #ENDALZ @ATRI_USC Donate directly to life-saving #research on Kernls.com:',
  //       facebookQuote:
  //         'Please join in funding this research project looking to make #AlzheimersResearch more inclusive for those with #DownSyndrome, a high-risk population. Donate directly to life-saving #research on Kernls.com, every dollar helps to get us closer to treatments and cures:',
  //       emailBody: `
  //         Hey!

  //         I thought you’d be interested in checking out this project: https://bit.ly/3mAYi6l.

  //         You can donate directly to research on preventing Alzheimer’s disease in those with Down syndrome on Kernls.com.

  //         Every dollar helps to get us closer to life-saving treatments and cures.
  //       `,
  //     },
  //   },
  // },
]

export const getProject = ({ id }: { id: string }): Project | void => {
  const project = PROJECTS.find(
    (project) =>
      project.embeddedCode === id || project.slug === id || project.id === id
  )

  if (!project) {
    return null
  }

  return project
}
