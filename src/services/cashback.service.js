const calculate = value => {
  if (value <= 1_000)
    return { value: value * 0.1, percentage: 0.1 }
  if (value <= 1_500)
    return { value: value * 0.15, percentage: 0.15 }
  return { value: value * 0.2, percentage: 0.2 }
}

module.exports = {
  calculate
}
