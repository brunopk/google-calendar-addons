function createAllDayEvent(calendarId: string, title: string, date: Date, description: string) {
  const endDate = plusHours(date, 24)

  console.info(`Adding all day event on ${date}`)

  return Calendar.Events?.insert(
    {
      summary: title,
      description,
      start: { date: toLocalDateString(date) },
      end: { date: toLocalDateString(endDate) }
    },
    calendarId
  )
}
