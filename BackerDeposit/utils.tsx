import validator from 'validator'
import { BackerDepositFormInitialValues } from './BackerDepositStepTwo'
import { DetailSection, DetailSectionItem } from './styled'

export type Section = {
  property: string
  value: string
}

export interface RenderSectionsProps {
  sections: Section[]
}

export const renderSections = ({
  sections,
}: RenderSectionsProps): JSX.Element => {
  return (
    <DetailSection>
      {sections.map((section) => {
        if (!section || !section.value) {
          return null
        }
        return (
          <DetailSectionItem key={section.property}>
            <p>
              <strong>{section.property}</strong>
            </p>
            <p>{section.value}</p>
          </DetailSectionItem>
        )
      })}
    </DetailSection>
  )
}

interface ValidationError {
  coverFeePercent: string
  amount: string
}

const fieldRequiredErrorMessage = 'This field is required'

export const validateBackerDepositForm = ({
  maxmimumDepositAmount,
  minmumDepositAmount = 100,
  values,
}: {
  maxmimumDepositAmount: number
  minmumDepositAmount?: number
  values: BackerDepositFormInitialValues
}): Partial<ValidationError> => {
  const errors: Partial<ValidationError> = {}

  if (!values.amount) {
    errors.amount = fieldRequiredErrorMessage
  }

  const strAmount = String(values.amount)

  if (
    !validator.isFloat(strAmount, {
      min: minmumDepositAmount,
      max: maxmimumDepositAmount,
    })
  ) {
    const isMininSameAsMax = minmumDepositAmount === maxmimumDepositAmount
    errors.amount = isMininSameAsMax
      ? `The donation amount should be $${minmumDepositAmount}`
      : `The donation amount should be between $${minmumDepositAmount} - $${maxmimumDepositAmount}`
  }

  return errors
}
