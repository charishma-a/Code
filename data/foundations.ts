export const PROCESSING_FEE_NON_CHARITABLE = 2.9
export const PROCESSING_FEE_CHARITABLE = 2.2

export interface Foundation {
  id: string
  city: string
  country: string
  countryCode: string
  currency: string
  name: string
  description: string
  processingFee: number
  taxReceiptStatement: string
}

export const albertEinsteinCollegeMedicine: Foundation = {
  id: 'c95bd821-3ca7-4923-ab2c-7e1990634acb',
  city: 'New York',
  country: 'United States',
  countryCode: 'US',
  currency: 'usd',
  name: 'Albert Einstein College of Medicine',
  description:
    'Albert Einstein College of Medicine, a New York based 501(c)(3) registered charity',
  processingFee: PROCESSING_FEE_CHARITABLE,
  taxReceiptStatement:
    'I’d like to receive a tax receipt from Albert Einstein College of Medicine, a New York based 501(c)(3) registered charity',
}

export const americanFriendsOfUHN: Foundation = {
  id: '6bf595d7-ded1-4cc9-8f32-0d4be611ecd1',
  city: 'New York',
  country: 'United States',
  countryCode: 'US',
  currency: 'usd',
  name: 'American Friends of UHN',
  description:
    'American Friends of UHN, a New York State based 501(c)(3) registered charity',
  processingFee: PROCESSING_FEE_CHARITABLE,
  taxReceiptStatement:
    'I’d like to receive a tax receipt from American Friends of UHN, a New York State based 501(c)(3) registered charity',
}

export const pmcf: Foundation = {
  id: '653ffddb-15bd-4087-bc62-a1e25f89e342',
  city: 'Toronto',
  country: 'Canada',
  countryCode: 'CA',
  currency: 'cad',
  name: 'The Princess Margaret Cancer Foundation',
  description: 'Princess Margaret Cancer Foundation, a CRA registered charity',
  processingFee: PROCESSING_FEE_NON_CHARITABLE,
  taxReceiptStatement:
    'I’d like to receive a tax receipt from Princess Margaret Cancer Foundation, a CRA registered charity',
}

export const usc: Foundation = {
  id: '2b3334f6-40b1-49ef-a0fe-4520af48a48b',
  city: 'San Diego, California',
  country: 'United States',
  countryCode: 'US',
  currency: 'usd',
  name: 'ATRI at University of Southern California',
  description:
    'University of Southern California, a California State based 501(c)(3) registered charity',
  processingFee: PROCESSING_FEE_CHARITABLE,
  taxReceiptStatement:
    'I’d like to receive a tax receipt from University of Southern California, a California State based 501(c)(3) registered charity',
}
