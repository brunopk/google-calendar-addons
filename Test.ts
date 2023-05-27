function generateOfficeDayDistribution(): OfficeDayDistribution {
  // 4 just for testing
  const businessDayArray = generateBusinessDayArray(4)
  let currentDistribution = generateBlankOfficeDayDistribution(businessDayArray)
  let bestFoundDistribution = generateWorstOfficeDayDistribution(businessDayArray)

  // 60 just for testing
  distributeOfficeDays(currentDistribution, bestFoundDistribution, 0, businessDayArray, 60)

  return bestFoundDistribution
}

console.log(generateOfficeDayDistribution())
