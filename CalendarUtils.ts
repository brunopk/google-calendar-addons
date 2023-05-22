import {calendar_v3} from 'googleapis'
/**
 * Perform a full sync to list all calendars and logs the result
 */
function listCalendars() {
  let pageToken: string | null | undefined = null
  let calendars: calendar_v3.Schema$CalendarList | undefined

  do {
    calendars = Calendar.CalendarList?.list({pageToken})
    for(let i in calendars?.items) {
      let item : calendar_v3.Schema$CalendarListEntry = calendars?.items[i]
      console.log(`summary: ${item.summary}, id: ${item.id}`)
    }
    pageToken = calendars?.nextPageToken
  } while (pageToken != null)
}

/**
 * Returns all events in an specific calendar (identified by its id) for a given period of time in the past
 * @param calendarId calendar id to search events
 * @param minutesInThePast start time of events should be no older than this number of minutes (and up to now)
 * @returns 
 */
function listEvents(calendarId: string, maxHoursInThePast: number) {
  
  let nextPageToken: string | undefined ;
  let now = new Date();
  let result : calendar_v3.Schema$Event[] = []
  
  do{
    let page = Calendar.Events?.list(
      calendarId,
      {
        timeMin: minusHours(now, maxHoursInThePast).toISOString(),
        timeMax: now.toISOString(),
    });
    
    if(page?.items && page.items.length > 0){
      for(var i = 0; i< page.items.length ; i++){
        result.push(page?.items[i] as calendar_v3.Schema$Event)
      }
    }
    
    nextPageToken = page?.nextPageToken;
  }while(nextPageToken)

  return result
}
