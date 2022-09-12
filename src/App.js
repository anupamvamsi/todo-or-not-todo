import ToDoItem from './ToDo';
import ToDoList from './ToDoList';

export default class App {
  static todoItems = [];
  static todoLists = [];

  constructor() {}

  createToDoItem(title, description, dueDate, priority, isDone, parentList) {
    const newItem = new ToDoItem(
      title,
      description,
      dueDate,
      priority,
      isDone,
      parentList
    );

    App.todoItems.push(newItem);
    // console.log('Todo items:', App.todoItems);
    // console.log('Todo lists:', App.todoLists);

    return newItem;
  }

  isUniqueListTitle(title) {
    App.todoLists.forEach((list) => {
      if (list.title === title) {
        return false;
      }
    });

    return true;
  }

  createToDoList(title, description) {
    let newList;
    if (this.isUniqueListTitle(title)) {
      newList = new ToDoList(title, description);
    }

    App.todoLists.push(newList);
    // console.log('Todo lists:', App.todoLists);

    return newList;
  }
}
