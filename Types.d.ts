import { tasks_v1 } from "googleapis"

declare global {
  type BusinessDayArray = {
    businessDays: Date[]
    totalFridays: number
    totalMondays: number
    totalDays: number
  }

  type ExtendedTask = tasks_v1.Schema$Task & { taskList: tasks_v1.Schema$TaskList }

  type OfficeDayArray = {
    dayDistribution: boolean[]
    meetsMinimumPercentageCondition: boolean
    totalAssignedDays: number
    totalAssignedMondays: number
    totalAssignedFridays: number
  }

  function formatAsHtmlTable(tasks: ExtendedTask[]): string

  function generateBusinessDayArray(monthNumber: number, excludedDays: Date[]): BusinessDayArray

  /**
   * Determines which of all days in `businessDayArray` will be selected as office days
   * @param businessDayArray all available business days
   * @param minimumOfficeDayPercentage minimum office day percentage (0 to 100)
   */
  function generateOfficeDayArray(
    businessDayArray: BusinessDayArray,
    minimumOfficeDayPercentage: number
  ): OfficeDayArray

  function isMonday(date: Date): boolean

  function isFriday(date: Date): boolean
}

declare function isEqualYearMonthDay(d1: Date, d2: Date): boolean


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