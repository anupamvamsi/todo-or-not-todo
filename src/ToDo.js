export default class ToDoItem {
  constructor(
    title,
    description,
    dueDate,
    priority,
    parentList = 'Home',
    isDone = false
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.parentList = parentList;
    this.isDone = isDone;
  }

  changeItemStatus() {
    this.isDone = true;
  }

  changeItemPriority(priority) {
    this.priority = priority;
  }
}
