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
    this.parentList = parentList || 'Home';
    this.isDone = isDone;
  }

  changeItemStatus() {
    this.isDone = !this.isDone;
  }

  changeItemPriority(priority) {
    this.priority = priority;
  }
}
