import { calendar_v3 } from "googleapis";

/**
 * Returns all events in an specific calendar (identified by its id) for a given period of time in the past
 * @param calendarId calendar id to search events
 * @param minutesInThePast start time of events should be no older than this number of minutes (and up to now)
 * @returns 
 */
declare function listEvents(calendarId: string, maxMinutesInThePast: number): calendar_v3.Schema$Event
