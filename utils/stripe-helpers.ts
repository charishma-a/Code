import {
  DEFAULT_CURRENCY,
  PROCESSING_ACH_FEE_PERCENT,
  PROCESSING_BASE_FEE,
} from '../constants/config'

export function roundTwoDecimal({ num }: { num: number }): number {
  return Math.round((num + Number.EPSILON) * 100) / 100
}

export function calculateAmountFromPercent({
  amount,
  percent,
}: {
  amount: number
  percent: number
}): number {
  return amount * (percent / 100)
}

export function calculateProcessingFee({
  donationAmount,
  processingFeePercent,
  shouldRoundTwoDecimal = true,
}: {
  donationAmount: number
  processingFeePercent: number
  shouldRoundTwoDecimal?: boolean
}): number {
  let processingFee =
    calculateAmountFromPercent({
      amount: donationAmount,
      percent: processingFeePercent,
    }) + PROCESSING_BASE_FEE

  if (shouldRoundTwoDecimal) {
    processingFee = roundTwoDecimal({ num: processingFee })
  }

  return processingFee
}

export function calculateACHProcessingFee({
  amount,
  shouldRoundTwoDecimal = true,
}: {
  amount: number
  shouldRoundTwoDecimal?: boolean
}): number {
  let processingFee = 0

  processingFee = calculateAmountFromPercent({
    amount,
    percent: PROCESSING_ACH_FEE_PERCENT,
  })

  if (processingFee > 5) {
    processingFee = 5
  } else if (shouldRoundTwoDecimal) {
    processingFee = roundTwoDecimal({ num: processingFee })
  }

  return processingFee
}

export function calculateTip({
  donationAmount,
  shouldRoundTwoDecimal = true,
  tipPercent,
}: {
  donationAmount: number
  shouldRoundTwoDecimal?: boolean
  tipPercent: number
}): number {
  let tip = calculateAmountFromPercent({
    amount: donationAmount,
    percent: tipPercent,
  })

  if (shouldRoundTwoDecimal) {
    tip = roundTwoDecimal({ num: tip })
  }

  return tip
}

export function calculateTotal(
  donationAmount: number,
  processingFee?: number,
  tip?: number
): number {
  let sum = donationAmount
  if (tip) {
    sum += tip
  }
  if (processingFee) {
    sum += processingFee
  }

  return sum
}

export function formatAmountForDisplay({
  amount,
  currency = DEFAULT_CURRENCY,
  removeLeadingZeros = true,
  round = false,
}: {
  amount: number
  currency?: string
  removeLeadingZeros?: boolean
  round?: boolean
}): string {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  })

  let updatedAmount = amount

  if (round) {
    updatedAmount = Math.round(amount)
  }

  if (removeLeadingZeros) {
    return numberFormat.format(updatedAmount).replace('.00', '')
  }

  return numberFormat.format(updatedAmount)
}

export function formatAmountForStripe(
  amount: number,
  currency: string
): number {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  })
  const parts = numberFormat.formatToParts(amount)
  let zeroDecimalCurrency = true
  for (const part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100)
}

// https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
export function nFormatter({
  digits,
  num,
}: {
  digits: number
  num: number
}): string {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0'
}
