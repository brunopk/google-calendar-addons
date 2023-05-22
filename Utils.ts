import { tasks_v1 } from "googleapis"

declare const MILLISECONDS_PER_HOUR : number

declare type ExtendedTask = tasks_v1.Schema$Task & {
  taskList: tasks_v1.Schema$TaskList
}

/**
 * Calculates the resulting date of performing `date - minutes`
 */
function minusHours(date: Date, hours: number): Date{
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
