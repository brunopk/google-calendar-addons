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

function listTasks() {
  let now = new Date()
  let tasks = Tasks.Tasks.list(TASK_LIST_ID, {})
  
  for(var i=0; i<tasks.items.length; i++) {
    console.log(tasks.items[i])
    // let task = Tasks.Tasks.get(TASK_LIST_ID, tasks.items[i].id)
    // Tasks.Tasks.patch({ due: new Date(now.getTime() + MILLIS_PER_DAY).toISOString()}, TASK_LIST_ID, task.id)
  }

}

function initialSync() {
  let syncToken ; 
  let nextPageToken ;
  let now = new Date();
  
  do{
    var page = Calendar.Events.list(
      'primary',
      {
        timeMin: new Date(now.getTime() - MILLIS_PER_DAY ).toISOString(),
        timeMax: now.toISOString(),
      }) ;
    
    if(page.items && page.items.length > 0){
      syncToken= page.nextSyncToken;
      for(var i = 0; i< page.items.length ; i++){
        var item = page.items[i]
        console.log(item)
      }
    }
    
    nextPageToken = page.nextPageToken;
  }while(nextPageToken)

  PropertiesService.getUserProperties().setProperties({[USER_PROPERTIES.SYNC_TOKEN]: syncToken})
}