import ToDoItem from './ToDo';
import ToDoList from './ToDoList';

export default class App {
  static todoItems = [];
  static todoLists = [];

  constructor() {}

  getToDoList(title) {
    let returnList;

    App.todoLists.forEach((list) => {
      if (list.title === title) {
        returnList = list;
      } else {
        returnList = undefined;
      }
    });

    return returnList;
  }

  getToDoListTitles() {
    let listOfTitles = [];

    App.todoLists.forEach((list) => {
      listOfTitles.push(list.title);
    });

    return listOfTitles;
  }

  addChildToList(todoListTitle, todoItem) {
    const todoList = this.getToDoList(todoListTitle);
    todoList.children.push(todoItem);
  }

  addItemToParentList(todoItem) {
    // if parentList is NOT an existing ToDoList, create ToDoList:
    if (!this.isAListTitle(todoItem.parentList)) {
      this.createToDoList(todoItem.parentList, '');
    }

    this.addChildToList(todoItem.parentList, todoItem);
  }

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

    // Add todoItem to todoList
    this.addItemToParentList(newItem);

    return newItem;
  }

  isAListTitle(title) {
    const listOfTitles = this.getToDoListTitles();

    if (listOfTitles.includes(title)) {
      return true;
    }

    console.log(`${title} doesn't exist!`);
    return false;
  }

  createToDoList(title, description) {
    let newList;
    if (!this.isAListTitle(title)) {
      console.log(`Creating ${title} ToDoList...`);
      newList = new ToDoList(title, description);
      App.todoLists.push(newList);
      console.log('Todo lists:', App.todoLists);
    } else {
      console.log(`${title} already exists`);
    }

    return newList;
  }
}
