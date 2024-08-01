import { FOUND_BEST_OFFICE_DAY_SELECTION, PROPERTY_KEYS } from "./Constants"
import {
  generateBusinessDayArray,
  generateEmptyBusinessDaySelection,
  generateWorstBusinessDaySelection,
  findBestBusinessDaySelectionUsingBacktracking
} from "./WorkPlanning"

function sendMailForPendingTasks() {
  const MAIL_RECIPIENT = PropertiesService.getScriptProperties().getProperty(PROPERTY_KEYS.MAIL_RECIPIENT)
  const MAIL_SUBJECT = PropertiesService.getScriptProperties().getProperty(PROPERTY_KEYS.MAIL_SUBJECT)

  if (MAIL_RECIPIENT == null) {
    throw new Error(`User property "${PROPERTY_KEYS.MAIL_RECIPIENT}" not defined, see https://developers.google.com/apps-script/reference/properties?hl=en`)
  }
  if (MAIL_SUBJECT == null) {
    throw new Error(`User property "${PROPERTY_KEYS.MAIL_SUBJECT}" not defined, see https://developers.google.com/apps-script/reference/properties?hl=en`)
  }

  const taskLists = listTaskLists()
  const tasks = taskLists
    .map((taskList) => listPendingTasks(taskList))
    .reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])

  if (tasks.length > 0) {
    const htmlBody = formatAsHtml(tasks)
    MailApp.sendEmail(MAIL_RECIPIENT, MAIL_SUBJECT, "", { htmlBody })
  }
}

function foundBestOfficeDaySelection() {
  const businessDayArray = generateBusinessDayArray(
    FOUND_BEST_OFFICE_DAY_SELECTION.MONTH_NUMBER,
    FOUND_BEST_OFFICE_DAY_SELECTION.EXCLUDED_DAYS
  )
  const currentSelection = generateEmptyBusinessDaySelection(businessDayArray)
  const bestFoundSelection = generateWorstBusinessDaySelection(businessDayArray)

  findBestBusinessDaySelectionUsingBacktracking(
    currentSelection,
    bestFoundSelection,
    0,
    businessDayArray,
    FOUND_BEST_OFFICE_DAY_SELECTION.MINIMUM_DAY_PERCENTAGE
  )

  let selectedDayIndex = 0
  const calendarId = FOUND_BEST_OFFICE_DAY_SELECTION.CALENDAR_ID
  const eventTitle = FOUND_BEST_OFFICE_DAY_SELECTION.CALENDAR_EVENT_TITLE
  bestFoundSelection.selection.forEach((isDaySelected, dayIndex) => {
    if (isDaySelected) {
      selectedDayIndex++
      const eventDescriptionTemplate = FOUND_BEST_OFFICE_DAY_SELECTION.CALENDAR_EVENT_DESCRIPTION_TEMPLATE
      const eventDate = businessDayArray.businessDays[dayIndex]
      const eventDescription = eventDescriptionTemplate
        .replace("%s1", selectedDayIndex.toString())
        .replace("%s2", bestFoundSelection.totalDays.toString())
        .replace("%s3", Math.ceil((selectedDayIndex * 100) / businessDayArray.totalDays).toString())
      createAllDayEvent(calendarId, eventTitle, eventDate, eventDescription)
    }
  })
}

export { foundBestOfficeDaySelection }
