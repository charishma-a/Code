import HowItWorksMobile from './HowItWorksMobile'
import HowItWorksDesktop from './HowItWorksDesktop'
import { trackCategory } from '@/utils/analytics'
import { size } from '@/utils/device'
import { useWindowSize } from '@/hooks/useWindowSize'

export const HowItWorks: React.FC = () => {
  const { width } = useWindowSize()
  const mobileL = parseInt(size.mobileL.split('p')[0])

  const trackHKW = (clickID, clickText) => {
    return trackCategory({
      eventProps: {
        eventAction: 'How Kernls Works',
        eventCategory: 'HKW Link Click',
        clickID,
        clickText,
      },
    })
  }

  return (
    <>
      {width > mobileL ? (
        <HowItWorksDesktop trackHKW={trackHKW} />
      ) : (
        <HowItWorksMobile trackHKW={trackHKW} />
      )}
    </>
  )
}
