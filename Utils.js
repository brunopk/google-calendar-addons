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
