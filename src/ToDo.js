export default class ToDoItem {
  constructor(title, description, dueDate, priority, isDone = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isDone = isDone;
  }

  changeItemStatus() {
    this.isDone = true;
  }

  changeItemPriority(priority) {
    this.priority = priority;
  }
}
