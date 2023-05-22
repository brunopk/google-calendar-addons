type BusinessDayMatrix = Date[][]

const MILLIS_PER_DAY = 24 * 60 * 60 * 1000

const TASK_LIST_ID = 'MDgxOTY1NjgyMzU1ODA5MzUwMzY6MDow'

const FIRST_DAY_OF_MONTH = new Date("2023-06-01T00:00:00.000Z")

// free days per month
const NUMBER_OF_FREE_DAYS = 0

// min percentage of work days for current month
const MIN_PERCENTAGE_OF_WORK_DAYS = 60

const TASK_TITLE = "Día presencial"

const TASK_DESCRIPTION_TEMPLATE = "Dia presencial D de T"


/**
 * Generate and returns a matrix where each row represents a week and each column a business day of the week
 * @param monthNumber month of the year (0 to 11)
 * @returns 
 */
 function calculateBusinessDays(monthNumber: number): BusinessDayMatrix {
  let businessDayMatrix: Date[][] = []
  let itDate = new Date()
  let itWeek = 0

  itDate.setDate(1)
  itDate.setMonth(monthNumber)
  itDate.setHours(0)
  itDate.setMinutes(0)
  itDate.setMilliseconds(0)

  while (itDate.getMonth() < monthNumber + 1) {
    if (itDate.getDay() >= 1 && itDate.getDay() <= 5) {
      let currentWeek = businessDayMatrix[itWeek] ? businessDayMatrix[itWeek] : []
      currentWeek.push(itDate)
      businessDayMatrix[itWeek] = currentWeek
    }

    itWeek = itDate.getDay() == 0 ? itWeek + 1 : itWeek
    itDate = new Date(itDate.getTime() + MILLISECONDS_PER_DAY)
  }
 
  return businessDayMatrix
}


