import { tasks_v1 } from "googleapis"

declare global {
  const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 100

  type DaySelection = {
    selection: boolean[]
    meetsMinimumPercentageCondition: boolean
    totalDays: number
    totalMondays: number
    totalFridays: number
  }

  type BusinessDayArray = {
    businessDays: Date[]
    totalFridays: number
    totalMondays: number
    totalDays: number
  }

  type ExtendedTask = tasks_v1.Schema$Task & { taskList: tasks_v1.Schema$TaskList }

  function createAllDayEvent(calendarId: string, title: string, day: Date, description: string)

  function findBestBusinessDaySelectionUsingBacktracking(
    currentSelection: DaySelection,
    bestFoundSelection: DaySelection,
    currentDayIndex: number,
    businessDayArray: BusinessDayArray,
    minimumDayPercentage: number
  )

  function formatAsHtmlTable(tasks: ExtendedTask[]): string

  function generateBusinessDayArray(monthNumber: number, excludedDays: Date[]): BusinessDayArray

  function generateEmptyBusinessDaySelection(businessDayArray: BusinessDayArray): DaySelection

  function generateWorstBusinessDaySelection(businessDayArray: BusinessDayArray): DaySelection

  function isEqualByYearMonthDay(d1: Date, d2: Date): boolean

  function isFriday(date: Date): boolean

  function isMonday(date: Date): boolean

  /**
   * List all pending (uncompleted) tasks until now
   * @param taskList
   */
  function listPendingTasks(taskList: tasks_v1.Schema$TaskList): ExtendedTask[]

  /**
   * Returns the ids of all task list
   */
  function listTaskLists(): tasks_v1.Schema$TaskList[]

  function minusHours(date: Date, hours: number): Date

  function plusHours(date: Date, hours: number): Date

  function toLocalDateString(date: Date): string
}
