const MONTH_NUMBER = 0

const EXCLUDED_DAYS = [new Date("2023-01-01")]

const MINIMUM_OFFICE_DAY_PERCENTAGE = 60

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
  const tasks = taskLists.map((taskList) => listPendingTasks(taskList))
    .reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])
  const htmlBody = formatAsHtmlTable(tasks)
  MailApp.sendEmail(MAIL_RECIPIENT, MAIL_SUBJECT, "", { htmlBody })
}

function distributeOfficeDays() {
  const businessDayArray = generateBusinessDayArray(MONTH_NUMBER, EXCLUDED_DAYS)
  const officeDayDistribution = generateOfficeDayArray(businessDayArray, MINIMUM_OFFICE_DAY_PERCENTAGE)
}
