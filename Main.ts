import { listEvents } from "./Types"

const USER_PROPERTIES = {
  SYNC_TOKEN: 'syncToken'
}

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





function main() {
  let events = listEvents('primary', 30)
  console.log(events)
}
