import { isFriday, isMonday, isEqualByYearMonthDay } from "./Utils"

type BusinessDayArray = {
  businessDays: Date[]
  totalFridays: number
  totalMondays: number
  totalDays: number
}

type DaySelection = {
  array: boolean[]
  meetsMinimumPercentageCondition: boolean
  totalAssignedDays: number
  totalAssignedMondays: number
  totalAssignedFridays: number
}

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000

function copyDistribution(source: DaySelection, dest: DaySelection) {
  dest.array = source.array.slice(0)
  dest.meetsMinimumPercentageCondition = source.meetsMinimumPercentageCondition
  dest.totalAssignedDays = source.totalAssignedDays
  dest.totalAssignedFridays = source.totalAssignedFridays
  dest.totalAssignedMondays = source.totalAssignedMondays
}

function isBetterOrEqual(first: DaySelection, second: DaySelection, businessDayArray: BusinessDayArray): boolean {
  if (!second.meetsMinimumPercentageCondition) {
    return true
  }

  const firstDayPercentage = (first.totalAssignedDays * 100) / businessDayArray.totalDays
  const firstMondayPercentage = (first.totalAssignedMondays * 100) / businessDayArray.totalMondays
  const firstFridayPercentage = (first.totalAssignedFridays * 100) / businessDayArray.totalFridays

  const secondDayPercentage = (second.totalAssignedDays * 100) / businessDayArray.totalDays
  const secondMondayPercentage = (second.totalAssignedMondays * 100) / businessDayArray.totalMondays
  const secondFridayPercentage = (second.totalAssignedFridays * 100) / businessDayArray.totalFridays

  return (
    firstDayPercentage + firstMondayPercentage + firstFridayPercentage <=
    secondDayPercentage + secondMondayPercentage + secondFridayPercentage
  )
}

function addNewDate(currentDistribution: DaySelection, dayIndex: number, newDate: Date): void {
  currentDistribution.array[dayIndex] = true
  currentDistribution.totalAssignedDays++
  currentDistribution.totalAssignedFridays = isFriday(newDate)
    ? currentDistribution.totalAssignedFridays + 1
    : currentDistribution.totalAssignedFridays
  currentDistribution.totalAssignedMondays = isMonday(newDate)
    ? currentDistribution.totalAssignedMondays + 1
    : currentDistribution.totalAssignedMondays
}

function distributeOfficeDaysUsingBacktracking(
  currentDistribution: DaySelection,
  bestFoundDistribution: DaySelection,
  currentDayIndex: number,
  businessDayArray: BusinessDayArray,
  minimumOfficeDayPercentage: number
) {
  const percentageOfDistributedDays = (currentDistribution.totalAssignedDays * 100) / businessDayArray.totalDays
  currentDistribution.meetsMinimumPercentageCondition = percentageOfDistributedDays > minimumOfficeDayPercentage

  // Border case  (no days to distribute)

  if (currentDayIndex > businessDayArray.totalDays) {
    copyDistribution(currentDistribution, bestFoundDistribution,)
    return
  }

  // Recursive cases

  const leftBusinessDays = businessDayArray.totalDays - currentDayIndex
  const percentageOfAvailableDays = (leftBusinessDays * 100) / businessDayArray.totalDays

  // Prune predicate

  if (percentageOfDistributedDays + percentageOfAvailableDays > minimumOfficeDayPercentage) {
    // Checks if currentDistribution is the final answer

    if (percentageOfDistributedDays > minimumOfficeDayPercentage) {
      if (isBetterOrEqual(currentDistribution, bestFoundDistribution, businessDayArray)) {
        copyDistribution(currentDistribution, bestFoundDistribution)
      }

      // Otherwise ... continue
    } else {
      const currentDistributionCopy1 = generateBlankOfficeDayDistribution(businessDayArray)
      copyDistribution(currentDistribution, currentDistributionCopy1)
      distributeOfficeDaysUsingBacktracking(
        currentDistribution,
        bestFoundDistribution,
        currentDayIndex + 1,
        businessDayArray,
        minimumOfficeDayPercentage
      )

      const currentDistributionCopy2 = generateBlankOfficeDayDistribution(businessDayArray)
      copyDistribution(currentDistribution, currentDistributionCopy2)
      addNewDate(currentDistributionCopy2, currentDayIndex, businessDayArray.businessDays[currentDayIndex])
      distributeOfficeDaysUsingBacktracking(
        currentDistributionCopy2,
        bestFoundDistribution,
        currentDayIndex + 1,
        businessDayArray,
        minimumOfficeDayPercentage
      )
    }
  }
}

function generateBlankOfficeDayDistribution(businessDayArray: BusinessDayArray): DaySelection {
  const dayDistribution: boolean[] = []
  for (let i = 0; i < businessDayArray.totalDays; i++) {
    dayDistribution.push(false)
  }
  return {
    dayDistribution,
    meetsMinimumPercentageCondition: false,
    totalAssignedDays: 0,
    totalAssignedFridays: 0,
    totalAssignedMondays: 0
  }
}

function generateWorstOfficeDayDistribution(businessDayArray: BusinessDayArray): DaySelection {
  const dayDistribution: boolean[] = []
  for (let i = 0; i < businessDayArray.totalDays; i++) {
    dayDistribution.push(true)
  }
  return {
    array: dayDistribution,
    meetsMinimumPercentageCondition: true,
    totalAssignedDays: businessDayArray.totalDays,
    totalAssignedFridays: businessDayArray.totalFridays,
    totalAssignedMondays: businessDayArray.totalMondays
  }
}

function generateBusinessDayArray(monthNumber: number, excludedDays: Date[]): BusinessDayArray {
  const businessDayArray: BusinessDayArray = {
    businessDays: [],
    totalDays: 0,
    totalMondays: 0,
    totalFridays: 0
  }
  let itDate = new Date()

  itDate.setDate(1)
  itDate.setMonth(monthNumber)
  itDate.setHours(0)
  itDate.setMinutes(0)
  itDate.setMilliseconds(0)

  while (itDate.getMonth() < monthNumber + 1) {
    if (
      itDate.getDay() >= 1 &&
      itDate.getDay() <= 5 &&
      excludedDays.findIndex((excludedDay) => isEqualByYearMonthDay(itDate, excludedDay)) == -1
    ) {
      businessDayArray.businessDays.push(itDate)
      businessDayArray.totalDays++
      businessDayArray.totalMondays = isMonday(itDate)
        ? businessDayArray.totalMondays + 1
        : businessDayArray.totalMondays
      businessDayArray.totalFridays = isFriday(itDate)
        ? businessDayArray.totalFridays + 1
        : businessDayArray.totalFridays
    }
    itDate = new Date(itDate.getTime() + MILLISECONDS_PER_DAY)
  }

  return businessDayArray
}

function selectDays(monthNumber: number, excludedDays: Date[], minimumDayPercentage: number): Date[] {
  const selectedDays: Date[] = []
  const businessDayArray = generateBusinessDayArray(monthNumber, excludedDays)
  const currentDistribution = generateBlankOfficeDayDistribution(businessDayArray)
  const bestFoundDistribution = generateWorstOfficeDayDistribution(businessDayArray)

  distributeOfficeDaysUsingBacktracking(
    currentDistribution,
    bestFoundDistribution,
    0,
    businessDayArray,
    minimumDayPercentage
  )
  bestFoundDistribution.array.forEach((isDaySelected, dayIndex) => {
    if (isDaySelected) {
      selectedDays.push(businessDayArray.businessDays[dayIndex])
    }
  })

  return selectedDays
}

export { generateBusinessDayArray, selectDays }
