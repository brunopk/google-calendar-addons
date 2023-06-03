/**
 * Calculates the resulting date of performing `date - minutes`
 */
function minusHours(date: Date, hours: number): Date {
  return new Date(date.getTime() - hours * MILLISECONDS_PER_HOUR)
}

/**
 * Calculates the resulting date of performing `date + minutes`
 */
function plusHours(date: Date, hours: number): Date {
  return new Date(date.getTime() + hours * MILLISECONDS_PER_HOUR)
}

/**
 * Format date as YYYY-MM-DD (using local time zone)
 * @param date date to be formatted
 */
function toLocalDateString(date: Date): string {
  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  return `${year}-${month}-${day}`
}

function formatAsHtmlTable(tasks: ExtendedTask[]): string {
  const tableHeader =
    "<tr> " +
    '<td style="border: 1px solid black; font-weight: bold; padding: 1em;">Lista de tareas</td>' +
    '<td style="border: 1px solid black; font-weight: bold; padding: 1em;">Título</td>' +
    '<td style="border: 1px solid black; font-weight: bold; padding: 1em;">Fecha</td>' +
    "</tr>"
  const rows = tasks.reduce((previousValue, task) => {
    if (!task.due) {
      throw new Error(`Undefined due date for task "${task.title}"`)
    }
    const dueDate = new Date(task.due)
    return `${previousValue}
      <tr>
        <td style="border: 1px solid black; padding: 1em;">${task.taskList.title}</td>
        <td style="border: 1px solid black; padding: 1em;">${task.title}</td>
        <td style="border: 1px solid black; padding: 1em;">${dueDate.toDateString()}</td>
      </tr>`
  }, "")

  return `<table">${tableHeader}${rows}</table>`
}

function isEqualByYearMonthDay(d1: Date, d2: Date): boolean {
  return d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDay() == d2.getDay()
}

function isMonday(date: Date): boolean {
  return date.getDay() == 1
}

function isFriday(date: Date): boolean {
  return date.getDay() == 5
}

export { isEqualByYearMonthDay, isFriday, isMonday }
