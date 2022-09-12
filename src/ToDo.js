export default class ToDoItem {
  constructor(
    title,
    description,
    dueDate,
    priority,
    isDone = false,
    parentList = 'Home'
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isDone = isDone;
    this.parentList = parentList;
  }

  changeItemStatus() {
    this.isDone = true;
  }

  changeItemPriority(priority) {
    this.priority = priority;
  }
}
