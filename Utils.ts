import { calendar_v3, GoogleApis } from "googleapis";

function getTaskLists() {
  var taskLists = Tasks.Tasklists.list().getItems();
  var res = taskLists.map(function(list) {
    return {
      taskListId: list.getId(),
      listName: list.getTitle(),
    };
  });
  console.log(res)
}

/**
 * Perform a full sync to list all calendars
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
