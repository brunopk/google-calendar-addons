const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000

const MILLISECONDS_PER_HOUR = 60 * 60 * 1000

const FOUND_BEST_OFFICE_DAY_SELECTION = {
  CALENDAR_ID: "",
  EXCLUDED_DAYS: [new Date("2023-01-04")],
  MINIMUM_DAY_PERCENTAGE: 60,
  MONTH_NUMBER: 1,
  CALENDAR_EVENT_TITLE: "Día presencial",
  CALENDAR_EVENT_DESCRIPTION_TEMPLATE: "Día %s1 de %s2 (%s3%)"
}

const PROPERTY_KEYS = {
  MAIL_RECIPIENT: "MAIL_RECIPIENT",
  MAIL_SUBJECT: "MAIL_SUBJECT"
}

export { MILLISECONDS_PER_DAY, FOUND_BEST_OFFICE_DAY_SELECTION }
