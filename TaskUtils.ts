import { tasks_v1 } from "googleapis"
import { ExtendedTask } from "./Types"

/**
 * Returns the ids of all task list
 */
function listTaskLists() : tasks_v1.Schema$TaskList[] {

  let pageToken: string | null | undefined = null
  let taskLists: tasks_v1.Schema$TaskLists | undefined
  let allTaskListIds : tasks_v1.Schema$TaskList[] = []

  // Full sync 

  do {
    taskLists = Tasks.Tasklists?.list({pageToken})
    allTaskListIds = taskLists?.items ? allTaskListIds.concat(taskLists.items) : allTaskListIds
    pageToken = taskLists?.nextPageToken
  } while (pageToken)

  return allTaskListIds
}


/**
 * List all pending (uncompleted) tasks until now
 * @param taskList
 */
function listPendingTasks(taskList: tasks_v1.Schema$TaskList) : ExtendedTask[] {
  
  let now = new Date().toISOString()
  let pageToken: string | null | undefined = null
  let tasks: tasks_v1.Schema$Tasks | undefined
  let allTasks : ExtendedTask[] = []

  // Full sync 

  do {
    if (!taskList.id) {
      throw new Error("Undefined task list id")
    }

    tasks = Tasks.Tasks?.list(taskList.id, {dueMax: now, showCompleted: true})
    tasks?.items?.forEach((task) => {
      (task as ExtendedTask).taskList = taskList
      allTasks.push(task as ExtendedTask)
    })
    
    pageToken = tasks?.nextPageToken
  } while (pageToken)

  return allTasks
}
