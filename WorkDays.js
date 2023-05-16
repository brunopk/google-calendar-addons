const MILLIS_PER_DAY = 24 * 60 * 60 * 1000

const TASK_LIST_ID = 'MDgxOTY1NjgyMzU1ODA5MzUwMzY6MDow'

const FIRST_DAY_OF_MONTH = new Date("2023-06-01T00:00:00.000Z")

// free days per month
const NUMBER_OF_FREE_DAYS = 0

// min percentage of work days for current month
const MIN_PERCENTAGE_OF_WORK_DAYS = 60

const TASK_TITLE = "Día presencial"

const TASK_DESCRIPTION_TEMPLATE = "Dia presencial D de T"


function isWorkDay(date) {
  const dayOfWeek = date.getDay()
  return dayOfWeek >= 1 && dayOfWeek <= 5
}

function totalWorkDays() {
  const nextMont = FIRST_DAY_OF_MONTH.getMonth() + 2;
  let currentDate = new Date(FIRST_DAY_OF_MONTH.getTime())
  let result = 0;

  while (currentDate.getMonth() < nextMont) {
    result = isWorkDay(currentDate) ? result + 1 : result
    currentDate = new Date(currentDate.getTime() + MILLIS_PER_DAY)
  }

  return result
}

function generateWorkDays() {
  let currentDate = new Date(FIRST_DAY_OF_MONTH.getTime())
  let nextMonth = currentDate.getMonth() + 2
  let workDays = 0
  let minimumWorkDays = Math.ceil((( totalWorkDays() - NUMBER_OF_FREE_DAYS ) / 100 ) * MIN_PERCENTAGE_OF_WORK_DAYS)
  
  while(currentDate.getMonth() < nextMonth) {
    if (isWorkDay(currentDate) && workDays < minimumWorkDays) {
      console.log(currentDate.toISOString())
      Tasks.Tasks.insert({
        due: currentDate.toISOString(),
        title: TASK_TITLE,
        description: TASK_DESCRIPTION_TEMPLATE.replace("D", workDays + 1).replace("T", minimumWorkDays)
      }, TASK_LIST_ID)
      workDays++
    }
    currentDate = new Date(currentDate.getTime() + MILLIS_PER_DAY)
  }
}


