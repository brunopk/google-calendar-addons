import { calendar_v3, tasks_v1 } from "googleapis"

/**
 * Returns the ids of all task list
 */
function listTaskLists() : string[] {

  let pageToken: string | null | undefined = null
  let taskLists: tasks_v1.Schema$TaskLists | undefined
  let taskListIds : string[] = []

  // Full sync 

  do {
    taskLists = Tasks.Tasklists?.list({pageToken})
    
    taskLists?.items?.forEach(taskList => {
      if (taskList.id) {
        taskListIds.push(taskList.id)
      }
    })

    pageToken = taskLists?.nextPageToken
  } while (pageToken && pageToken != null)

  return taskListIds
}


function listUncompletedTasks(taskListId: string) : tasks_v1.Schema$Task[] {
  // TODO:
}
