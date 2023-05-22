import { tasks_v1 } from "googleapis"

declare const MILLISECONDS_PER_HOUR : number


declare type ExtendedTask = tasks_v1.Schema$Task & {
  taskList: tasks_v1.Schema$TaskList
}

/**
 * Calculates the resulting date of performing `date - minutes`
 */
function minusHours(date: Date, hours: number): Date {
  return new Date(date.getTime() - hours * MILLISECONDS_PER_HOUR)
}

function formatAsHtmlTable(tasks : ExtendedTask[]): string {
  let tableHeader = 
  "<tr> " +
    "<td style=\"border: 1px solid black; font-weight: bold; padding: 1em;\">Lista de tareas</td>" +
    "<td style=\"border: 1px solid black; font-weight: bold; padding: 1em;\">Título</td>" + 
    "<td style=\"border: 1px solid black; font-weight: bold; padding: 1em;\">Fecha</td>" + 
  "</tr>"
  let rows = tasks.reduce((previousValue, task) => { 
    if (!task.due) {
      throw new Error(`Undefined due date for task "${task.title}"`)
    }
    let dueDate = new Date(task.due)
    return `${previousValue}
      <tr>
        <td style="border: 1px solid black; padding: 1em;">${task.taskList.title}</td>
        <td style="border: 1px solid black; padding: 1em;">${task.title}</td>
        <td style="border: 1px solid black; padding: 1em;">${dueDate.toLocaleString()}</td>
      </tr>` 
  }, "")

  return `<table">${tableHeader}${rows}</table>`
}


function isEqualYearMonthDay(d1: Date, d2: Date): boolean {
  return d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDay() == d2.getDay()
}


/**
 * Generate and returns a matrix where each row represents a week and each column a business day of the week
 * @param monthNumber month of the year (0 to 11)
 * @returns 
 */
function calculateBusinessDays(monthNumber: number): Date[][] {
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