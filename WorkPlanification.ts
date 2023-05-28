// import {isFriday, isMonday} from './Utils'

const TASK_LIST_ID = 'MDgxOTY1NjgyMzU1ODA5MzUwMzY6MDow'



const FIRST_DAY_OF_MONTH = new Date("2023-06-01T00:00:00.000Z")


// free days per month
const NUMBER_OF_FREE_DAYS = 0


// min percentage of work days for current month
const MIN_PERCENTAGE_OF_WORK_DAYS = 60



const TASK_TITLE = "Día presencial"



const TASK_DESCRIPTION_TEMPLATE = "Dia presencial D de T"



function copyDistribution(source: OfficeDayArray, dest: OfficeDayArray) {
  dest.dayDistribution = source.dayDistribution.slice(0)
  dest.meetsMinimumPercentageCondition = source.meetsMinimumPercentageCondition
  dest.totalAssignedDays = source.totalAssignedDays
  dest.totalAssignedFridays = source.totalAssignedFridays
  dest.totalAssignedMondays = source.totalAssignedMondays
}


function isBetterOrEqual(first: OfficeDayArray, second: OfficeDayArray, businessDayArray: BusinessDayArray): boolean {

  if (!second.meetsMinimumPercentageCondition) {
    return true
  }
  
  const firstDayPercentage = (first.totalAssignedDays * 100) / businessDayArray.totalDays
  const firstMondayPercentage = (first.totalAssignedMondays * 100) / businessDayArray.totalMondays
  const firstFridayPercentage = (first.totalAssignedFridays * 100) / businessDayArray.totalFridays

  const secondDayPercentage = (second.totalAssignedDays * 100) / businessDayArray.totalDays
  const secondMondayPercentage = (second.totalAssignedMondays * 100) / businessDayArray.totalMondays
  const secondFridayPercentage = (second.totalAssignedFridays * 100) / businessDayArray.totalFridays

  return firstDayPercentage + firstMondayPercentage + firstFridayPercentage 
    <= secondDayPercentage + secondMondayPercentage + secondFridayPercentage
}


function addNewDate(currentDistribution: OfficeDayArray, dayIndex: number, newDate: Date): void {

  currentDistribution.dayDistribution[dayIndex] = true
  currentDistribution.totalAssignedDays++
  currentDistribution.totalAssignedFridays = 
    isFriday(newDate) ? currentDistribution.totalAssignedFridays + 1: currentDistribution.totalAssignedFridays
  currentDistribution.totalAssignedMondays = 
    isMonday(newDate) ? currentDistribution.totalAssignedMondays + 1: currentDistribution.totalAssignedMondays
}

function distributeOfficeDaysWithBacktracking(
  currentDistribution: OfficeDayDistribution,
  bestFoundDistribution: OfficeDayDistribution,
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
      distributeOfficeDaysWithBacktracking(
        currentDistribution,
        bestFoundDistribution,
        currentDayIndex + 1,
        businessDayArray,
        minimumOfficeDayPercentage
      )

      const currentDistributionCopy2 = generateBlankOfficeDayDistribution(businessDayArray)
      copyDistribution(currentDistribution, currentDistributionCopy2)
      addNewDate(currentDistributionCopy2, currentDayIndex, businessDayArray.businessDays[currentDayIndex])
      distributeOfficeDaysWithBacktracking(
        currentDistributionCopy2,
        bestFoundDistribution,
        currentDayIndex + 1,
        businessDayArray,
        minimumOfficeDayPercentage
      )
    }
  }
}

function generateBlankOfficeDayDistribution(businessDayArray: BusinessDayArray): OfficeDayArray {
  let dayDistribution: boolean[] = []
  for(let i = 0; i < businessDayArray.totalDays; i++) {
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

function generateWorstOfficeDayDistribution(businessDayArray: BusinessDayArray): OfficeDayArray {
  let dayDistribution: boolean[] = []
  for(let i = 0; i < businessDayArray.totalDays; i++) {
    dayDistribution.push(true)
  }
  return {
    dayDistribution,
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
      excludedDays.findIndex((excludedDay) => isEqualYearMonthDay(itDate, excludedDay)) == -1
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

function generateOfficeDayArray(
  businessDayArray: BusinessDayArray,
  minimumOfficeDayPercentage: number
): OfficeDayArray {
  const currentDistribution = generateBlankOfficeDayDistribution(businessDayArray)
  const bestFoundDistribution = generateWorstOfficeDayDistribution(businessDayArray)

  distributeOfficeDaysWithBacktracking(
    currentDistribution,
    bestFoundDistribution,
    0,
    businessDayArray,
    minimumOfficeDayPercentage
  )

  return bestFoundDistribution
}

export { generateOfficeDayArray }
