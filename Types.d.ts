import { tasks_v1 } from "googleapis"

declare global {
  const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 100

  type ExtendedTask = tasks_v1.Schema$Task & { taskList: tasks_v1.Schema$TaskList }

  function formatAsHtmlTable(tasks: ExtendedTask[]): string

  function generateBusinessDayArray(monthNumber: number, excludedDays: Date[]): BusinessDayArray

  function isEqualByYearMonthDay(d1: Date, d2: Date): boolean

  function isFriday(date: Date): boolean

  function isMonday(date: Date): boolean
}

declare function minusHours(date: Date, hours: number): Date 

/**
 * Returns the ids of all task list
 */
declare function listTaskLists(): tasks_v1.Schema$TaskList[]

/**
 * List all pending (uncompleted) tasks until now
 * @param taskListId 
 */
declare function listPendingTasks(taskList: tasks_v1.Schema$TaskList) : ExtendedTask[]