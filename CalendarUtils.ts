function createAllDayEvent(calendarId: string, title: string, day: Date, description: string) {
  return Calendar.Events?.insert(
    { summary: title, description, start: { date: toLocalDateString(day) }, end: { date: toLocalDateString(day) } },
    calendarId
  )
}
