import { device } from '@/utils/device'

export const cellStyles = {
  stages: `
    @media ${device.mobileS} { 
      flex: 1 1 70%;
      &:first-child {
        flex: 1 1 30%;
      }
    }
    @media ${device.tablet} { 
      flex: 1 1 70%;
      &:first-child {
        flex: 1 1 30%;
      }
    }
    @media ${device.laptop} { 
      flex: 1 1 75%;
      &:first-child {
        flex: 1 1 25%;
      }
    }
  `,
  budget: `
    @media ${device.mobileS} {
      flex: 1 1 43%;
      &:first-child {
        flex: 1 1 30%;
      }
      &:last-child {
        flex: 1 1 20%;
      }
    }
    @media ${device.tablet} {
      flex: 1 1 60%;
      &:first-child {
        flex: 1 1 25%;
      }
      &:last-child {
        flex: 1 1 25%;
      }
    }
  `,
}
