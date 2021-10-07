import validator from 'validator'

import { DonationFormInitialValues } from '../DonationForm'

/* data */
import { Project } from '../../../data/projects'
import { albertEinsteinCollegeMedicine } from '@/data/foundations'

export interface ValidationError {
  backerId: string
  cardholderName: string
  coverFeePercent: string
  didBackerRefer: string
  donationAmount: string
  donorProvince: string
  donorState: string
  donationReason: string
  donationReasonOther: string
  donorFirstName: string
  donorLastName: string
  donorEmail: string
  donorAddress: string
  donorCity: string
  donorCountry: string
  donorPostalCode: string
  donorZipCode: string
  foundationId: string
  receiveTaxReceiptFromFoundation: string
  receiveUpdatesFromFoundation: string
  receiveUpdatesFromKernls: string
  tipPercentOther: string
  useCanadianAddressForm: boolean
}

const fieldRequiredErrorMessage = 'This field is required'

export const validateDonationForm = (
  values: DonationFormInitialValues,
  project: Project,
  foundationId: string
): Partial<ValidationError> => {
  const errors: Partial<ValidationError> = {}

  if (!values.donorFirstName) {
    errors.donorFirstName = fieldRequiredErrorMessage
  }

  if (!values.donorLastName) {
    errors.donorLastName = fieldRequiredErrorMessage
  }

  if (!validator.isEmail(values.donorEmail)) {
    errors.donorEmail = 'Invalid email address'
  }

  const strDonationAmount = String(values.donationAmount)

  if (!validator.isFloat(strDonationAmount, { min: 5 })) {
    errors.donationAmount = 'The minimum donation amount should be 5'
  }

  const foundation = project.foundations.find(
    (f) => f.id === values.foundationId || foundationId
  )
  const foundationIsEinstein =
    foundation?.id === albertEinsteinCollegeMedicine.id

  if (foundationIsEinstein) {
    if (values.useCanadianAddressForm) {
      if (!values.donorAddress) {
        errors.donorAddress = fieldRequiredErrorMessage
      }
      if (!values.donorCity) {
        errors.donorCity = fieldRequiredErrorMessage
      }
      if (!values.donorCountry) {
        errors.donorCountry = fieldRequiredErrorMessage
      }
      if (!values.donorProvince) {
        errors.donorProvince = fieldRequiredErrorMessage
      }
      if (!values.donorPostalCode) {
        errors.donorPostalCode = fieldRequiredErrorMessage
      } else if (values.donorPostalCode) {
        const donorPostalCodeError = validator.isPostalCode(
          values.donorPostalCode,
          'CA'
        )
        if (!donorPostalCodeError) {
          errors.donorPostalCode =
            'The postal code you provided is not a valid Canadian postal code'
        }
      }
    } else {
      if (!values.donorAddress) {
        errors.donorAddress = fieldRequiredErrorMessage
      }
      if (!values.donorCity) {
        errors.donorCity = fieldRequiredErrorMessage
      }
      if (!values.donorCountry) {
        errors.donorCountry = fieldRequiredErrorMessage
      }
      if (!values.donorState) {
        errors.donorState = fieldRequiredErrorMessage
      }
      if (!values.donorZipCode) {
        errors.donorZipCode = fieldRequiredErrorMessage
      } else if (values.donorZipCode) {
        const donorZipCodeError = validator.isPostalCode(
          values.donorZipCode,
          'US'
        )
        if (!donorZipCodeError) {
          errors.donorZipCode =
            'The zip code you provided is not a valid US zip code'
        }
      }
    }
  } else if (
    values.receiveTaxReceiptFromFoundation &&
    foundation.currency === 'cad'
  ) {
    if (!values.donorAddress) {
      errors.donorAddress = fieldRequiredErrorMessage
    }
    if (!values.donorCity) {
      errors.donorCity = fieldRequiredErrorMessage
    }
    if (!values.donorCountry) {
      errors.donorCountry = fieldRequiredErrorMessage
    }
    if (!values.donorProvince) {
      errors.donorProvince = fieldRequiredErrorMessage
    }
    if (!values.donorPostalCode) {
      errors.donorPostalCode = fieldRequiredErrorMessage
    } else if (values.donorPostalCode) {
      const donorPostalCodeError = validator.isPostalCode(
        values.donorPostalCode,
        'CA'
      )
      if (!donorPostalCodeError) {
        errors.donorPostalCode =
          'The postal code you provided is not a valid Canadian postal code'
      }
    }
  }

  if (values.tipPercent?.value === 'other' && values.tipPercentOther) {
    const valueInt = values.tipPercentOther
    if (valueInt < 0 || valueInt > 100) {
      errors.tipPercentOther = 'Invalid Tip % (0 - 100)'
    }
  }

  if (!values.cardholderName) {
    errors.cardholderName = fieldRequiredErrorMessage
  }

  return errors
}
