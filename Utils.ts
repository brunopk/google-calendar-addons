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
  return tasks.reduce((previousValue, task) => {
    if (!task.due) {
      throw new Error(`Undefined due date for task "${task.title}"`)
    }
    const dueDate = new Date(task.due)
    return `${previousValue}
      <p>Task list: ${task.taskList.title}</p>
      <p>Task: ${task.title}</p>
      <p>Date: ${dueDate.toDateString()}</p>
      <br>`
  }, "")
}

function isEqualByYearMonthDay(d1: Date, d2: Date): boolean {
  return d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate()
}

function isMonday(date: Date): boolean {
  return date.getDay() == 1
}

function isFriday(date: Date): boolean {
  return date.getDay() == 5
}

export { isEqualByYearMonthDay, isFriday, isMonday }
