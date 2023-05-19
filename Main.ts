import { calendar_v3 } from "googleapis";

/**
 * Returns all events in an specific calendar (identified by its id) for a given period of time in the past
 * @param calendarId calendar id to search events
 * @param minutesInThePast start time of events should be no older than this number of minutes (and up to now)
 * @returns 
 */
declare function listEvents(calendarId: string, maxMinutesInThePast: number): calendar_v3.Schema$Event[]



/**
 * Useful links about Google Calendar:
 * 
 *  - Google Calendar API overview: https://developers.google.com/calendar/api/guides/overview
 *  - Synchronize resources efficiently: https://developers.google.com/calendar/api/guides/sync
 *  - Playing with Google Calendar and Apps Script: https://gist.github.com/brunopk/84340d51387a04ade57d484fc0b7e886
 *  - React on Google Calendar change with Apps Script and EventUpdated trigger: https://medium.com/@stephane.giron/react-on-google-calendar-change-with-apps-script-and-eventupdated-trigger-2d092547ab17 
 * 
 *  Useful links about Google Tasks:
 * 
 *  - Google Tasks API: https://developers.google.com/tasks/reference/rest
 * 
 */





function postponePendingTasks() {
   
  let pendingTasks = listEvents(TASK_CALENDAR_ID, 24)
    .filter(event => event.summary?.startsWith(PENDING_TASK_PREFIX))

  for(let i in pendingTasks) {
    console.log(pendingTasks[i].start?.dateTime)
    console.log(pendingTasks[i].end?.dateTime)
  }
  
}
