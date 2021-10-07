import { FOR_BACKERS_URL, FOR_RESEARCHERS_URL } from '@/constants/config'
import {
  IMAGE_PROPS_HOW_IT_WORKS_CHAMPION,
  IMAGE_PROPS_HOW_IT_WORKS_DONOR,
  IMAGE_PROPS_HOW_IT_WORKS_RESEARCHER,
} from '@/constants/images'
export const howItWorksContent = [
  {
    clickID: 'HKW-click-donors-explore-projects',
    imgAlt: IMAGE_PROPS_HOW_IT_WORKS_DONOR.getAlt(),
    img: IMAGE_PROPS_HOW_IT_WORKS_DONOR.getSrc(),
    userType: 'Donor',
    title: 'Fund science directly',
    description:
      'Donors browse research projects and support those they believe will have the greatest impact.',
    linkText: 'Explore Projects',
    link: '#explore-projects',
    internalLink: true,
  },
  {
    clickID: 'HKW-click-backers-explore-projects',
    imgAlt: IMAGE_PROPS_HOW_IT_WORKS_CHAMPION.getAlt(),
    img: IMAGE_PROPS_HOW_IT_WORKS_CHAMPION.getSrc(),
    userType: 'Champion',
    title: 'Double your impact',
    description:
      'Champions double donations on research they care about and share the project with their network.',
    linkText: 'Learn about being a Champion',
    link: FOR_BACKERS_URL,
    internalLink: false,
  },
  {
    clickID: 'HKW-click-for-researchers',
    imgAlt: IMAGE_PROPS_HOW_IT_WORKS_RESEARCHER.getAlt(),
    img: IMAGE_PROPS_HOW_IT_WORKS_RESEARCHER.getSrc(),
    userType: 'Researcher',
    title: 'Make research accessible',
    description:
      'Researchers share the potential impact of their work and tap into a community of motivated donors.',
    linkText: 'For researchers',
    link: FOR_RESEARCHERS_URL,
    internalLink: false,
  },
]
