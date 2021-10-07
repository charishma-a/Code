export const calculatePercentage = (moneyRaised, goal) => {
  return Math.round((moneyRaised / goal) * 100)
}

export const convertToDollorSigned = (amount) => {
  return '$' + amount.toLocaleString()
}
