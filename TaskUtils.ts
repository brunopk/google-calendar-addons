import { tasks_v1 } from "googleapis"

/**
 * Returns the ids of all task list
 */
function listTaskLists(): tasks_v1.Schema$TaskList[] {
  let pageToken: string | null | undefined = null
  let taskLists: tasks_v1.Schema$TaskLists | undefined
  let allTaskListIds: tasks_v1.Schema$TaskList[] = []

  // Full sync 

  do {
    taskLists = Tasks.Tasklists?.list({ pageToken })
    allTaskListIds = taskLists?.items ? allTaskListIds.concat(taskLists.items) : allTaskListIds
    pageToken = taskLists?.nextPageToken
  } while (pageToken)

  return allTaskListIds
}

// TODO: ver porque entra en loop

/**
 * List all pending (uncompleted) tasks until now
 * @param taskList
 */
function listPendingTasks(taskList: tasks_v1.Schema$TaskList): ExtendedTask[] {
  const now = new Date().toISOString()
  const allTasks: ExtendedTask[] = []
  let pageToken: string | null | undefined = null
  let tasks: tasks_v1.Schema$Tasks | undefined

  // Full sync

  do {
    if (!taskList.id) {
      throw new Error("Undefined task list id")
    }

    tasks = Tasks.Tasks?.list(taskList.id, { dueMax: now, showCompleted: true })
    tasks?.items?.forEach((task) => {
      const extendedTask = task as ExtendedTask
      extendedTask.taskList = taskList
      allTasks.push(extendedTask)
    })

    pageToken = tasks?.nextPageToken
  } while (pageToken)

  return allTasks
}
