import { tasks_v1 } from "googleapis"

declare type ExtendedTask = tasks_v1.Schema$Task & {
  taskList: tasks_v1.Schema$TaskList
}

declare function isEqualYearMonthDay(d1: Date, d2: Date)


declare function calculateBusinessDays(monthNumber: number): Date[][] 


declare function minusHours(date: Date, hours: number): Date 

/**
 * Returns the ids of all task list
 */
declare function listTaskLists() : tasks_v1.Schema$TaskList[]

/**
 * List all pending (uncompleted) tasks until now
 * @param taskListId 
 */
declare function listPendingTasks(taskList: tasks_v1.Schema$TaskList) : ExtendedTask[]


declare function formatAsHtmlTable(tasks : ExtendedTask[]): string