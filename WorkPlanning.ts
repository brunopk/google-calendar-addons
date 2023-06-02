import { isFriday, isMonday, isEqualByYearMonthDay } from "./Utils"

type BusinessDayArray = {
  businessDays: Date[]
  totalFridays: number
  totalMondays: number
  totalDays: number
}

type DaySelection = {
  selection: boolean[]
  meetsMinimumPercentageCondition: boolean
  selectedDays: number
  selectedMondays: number
  selectedFridays: number
}

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000

function copyDaySelection(source: DaySelection, dest: DaySelection) {
  dest.selection = source.selection.slice(0)
  dest.meetsMinimumPercentageCondition = source.meetsMinimumPercentageCondition
  dest.selectedDays = source.selectedDays
  dest.selectedMondays = source.selectedMondays
  dest.selectedFridays = source.selectedFridays
}

function isBetterOrEqual(first: DaySelection, second: DaySelection, businessDayArray: BusinessDayArray): boolean {
  if (!second.meetsMinimumPercentageCondition) {
    return true
  }

  const firstDayPercentage = (first.selectedDays * 100) / businessDayArray.totalDays
  const firstMondayPercentage = (first.selectedMondays * 100) / businessDayArray.totalMondays
  const firstFridayPercentage = (first.selectedFridays * 100) / businessDayArray.totalFridays

  const secondDayPercentage = (second.selectedDays * 100) / businessDayArray.totalDays
  const secondMondayPercentage = (second.selectedMondays * 100) / businessDayArray.totalMondays
  const secondFridayPercentage = (second.selectedFridays * 100) / businessDayArray.totalFridays

  return (
    firstDayPercentage + firstMondayPercentage + firstFridayPercentage <=
    secondDayPercentage + secondMondayPercentage + secondFridayPercentage
  )
}

function addNewDate(currentSelection: DaySelection, dayIndex: number, newDate: Date): void {
  currentSelection.selection[dayIndex] = true
  currentSelection.selectedDays++
  currentSelection.selectedFridays = isFriday(newDate)
    ? currentSelection.selectedFridays + 1
    : currentSelection.selectedFridays
  currentSelection.selectedMondays = isMonday(newDate)
    ? currentSelection.selectedMondays + 1
    : currentSelection.selectedMondays
}

function findBestBusinessDaySelectionUsingBacktracking(
  currentSelection: DaySelection,
  bestFoundSelection: DaySelection,
  currentDayIndex: number,
  businessDayArray: BusinessDayArray,
  minimumDayPercentage: number
) {
  const dayPercentage = (currentSelection.selectedDays * 100) / businessDayArray.totalDays
  currentSelection.meetsMinimumPercentageCondition = dayPercentage > minimumDayPercentage

  // Border case  (no days to distribute)

  if (currentDayIndex > businessDayArray.totalDays) {
    copyDaySelection(currentSelection, bestFoundSelection)
    return
  }

  // Recursive cases

  const leftBusinessDays = businessDayArray.totalDays - currentDayIndex
  const percentageOfAvailableDays = (leftBusinessDays * 100) / businessDayArray.totalDays

  // Prune predicate

  if (dayPercentage + percentageOfAvailableDays > minimumDayPercentage) {
    // Checks if currentDistribution is the final answer

    if (dayPercentage > minimumDayPercentage) {
      if (isBetterOrEqual(currentSelection, bestFoundSelection, businessDayArray)) {
        copyDaySelection(currentSelection, bestFoundSelection)
      }

      // Otherwise ... continue
    } else {
      const currentSelectionCopy1 = generateEmptyBusinessDaySelection(businessDayArray)
      copyDaySelection(currentSelection, currentSelectionCopy1)
      findBestBusinessDaySelectionUsingBacktracking(
        currentSelectionCopy1,
        bestFoundSelection,
        currentDayIndex + 1,
        businessDayArray,
        minimumDayPercentage
      )

      const currentSelectionCopy2 = generateEmptyBusinessDaySelection(businessDayArray)
      copyDaySelection(currentSelection, currentSelectionCopy2)
      addNewDate(currentSelectionCopy2, currentDayIndex, businessDayArray.businessDays[currentDayIndex])
      findBestBusinessDaySelectionUsingBacktracking(
        currentSelectionCopy2,
        bestFoundSelection,
        currentDayIndex + 1,
        businessDayArray,
        minimumDayPercentage
      )
    }
  }
}

function generateEmptyBusinessDaySelection(businessDayArray: BusinessDayArray): DaySelection {
  const daySelection: boolean[] = []
  for (let i = 0; i < businessDayArray.totalDays; i++) {
    daySelection.push(false)
  }
  return {
    selection: daySelection,
    meetsMinimumPercentageCondition: false,
    selectedDays: 0,
    selectedMondays: 0,
    selectedFridays: 0
  }
}

function generateWorstBusinessDaySelection(businessDayArray: BusinessDayArray): DaySelection {
  const daySelection: boolean[] = []
  for (let i = 0; i < businessDayArray.totalDays; i++) {
    daySelection.push(true)
  }
  return {
    selection: daySelection,
    meetsMinimumPercentageCondition: true,
    selectedDays: businessDayArray.totalDays,
    selectedMondays: businessDayArray.totalMondays,
    selectedFridays: businessDayArray.totalFridays
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
  const currentSelection = generateEmptyBusinessDaySelection(businessDayArray)
  const bestFoundSelection = generateWorstBusinessDaySelection(businessDayArray)

  findBestBusinessDaySelectionUsingBacktracking(
    currentSelection,
    bestFoundSelection,
    0,
    businessDayArray,
    minimumDayPercentage
  )
  bestFoundSelection.selection.forEach((isDaySelected, dayIndex) => {
    if (isDaySelected) {
      selectedDays.push(businessDayArray.businessDays[dayIndex])
    }
  })

  return selectedDays
}

export { generateBusinessDayArray, selectDays }
