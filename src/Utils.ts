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

function formatAsHtml(tasks: ExtendedTask[]): string {
  if (tasks.length == 1) {
    if (!tasks[0].due) {
      throw new Error(`Undefined due date for task "${tasks[0].title}"`);
    }
    const dueDate = new Date(tasks[0].due)
    return `
      <span>Task list: ${tasks[0].taskList.title}</span><br>
      <span>Task: ${tasks[0].title}</span><br>
      <span>Date: ${dueDate.toDateString()}</span><br>`
  }

  let dueDate = new Date(tasks[0].due)
  let result = `
    <span>Task list: ${tasks[0].taskList.title}</span><br>
    <span>Task: ${tasks[0].title}</span><br>
    <span>Date: ${dueDate.toDateString()}</span><br>`
  for (let i = 1; i < tasks.length; i++) {
    dueDate = new Date(tasks[i].due)
    result += `
      <span>-------------------------------------</span><br>
      <span>Task list: ${tasks[i].taskList.title}</span><br>
      <span>Task: ${tasks[i].title}</span><br>
      <span>Date: ${dueDate.toDateString()}</span><br>`
  }

  return result
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
