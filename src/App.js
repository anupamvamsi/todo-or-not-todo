import ToDoItem from './ToDo';
import ToDoList from './ToDoList';
import Display from './Display';
import DOMElements from './DOMElements';

export default class App {
  static todoItems = [];
  static todoLists = [];

  constructor() {}

  static getToDoItemIdx(todoItem) {
    return App.todoItems.indexOf(todoItem);
  }

  static getToDoListIdx(todoList) {
    return App.todoLists.indexOf(todoList);
  }

  static removeToDoItem(todoItem) {
    const idx = App.getToDoItemIdx(todoItem);
    App.todoItems.splice(idx, 1);
  }

  static removeToDoItemFromToDoList(todoItem) {
    const todoList = App.getToDoList(todoItem.parentList);
    const idxToDoList = App.getToDoListIdx(todoList);
    const idxToDoItem = App.todoLists[idxToDoList].children.indexOf(todoItem);

    console.log(App.todoLists[idxToDoList].children[idxToDoItem]);
    App.todoLists[idxToDoList].children.splice(idxToDoItem, 1);
    console.log(App.todoLists[idxToDoList].children[idxToDoItem]);
  }

  static getToDoList(title) {
    let returnList = undefined;

    if (App.getToDoListTitles().includes(title)) {
      let foundTitle = App.todoLists.filter((list) => list.title === title);
      returnList = foundTitle[0];
    }

    return returnList;
  }

  static getToDoListTitles() {
    let listOfTitles = [];

    App.todoLists.forEach((list) => {
      listOfTitles.push(list.title);
    });

    return listOfTitles;
  }

  addChildToList(todoListTitle, todoItem) {
    const todoList = App.getToDoList(todoListTitle);
    todoList.children.push(todoItem);
  }

  addItemToParentList(todoItem) {
    // if parentList is NOT an existing ToDoList, create ToDoList:
    if (!this.isAListTitle(todoItem.parentList)) {
      this.createToDoList(todoItem.parentList, '');
    }

    this.addChildToList(todoItem.parentList, todoItem);
  }

  createToDoItem(title, description, dueDate, priority, parentList, isDone) {
    const newItem = new ToDoItem(
      title,
      description,
      dueDate,
      priority,
      parentList,
      isDone
    );

    App.todoItems.push(newItem);

    // Add todoItem to todoList
    this.addItemToParentList(newItem);
    const todoList = App.getToDoList(newItem.parentList);
    Display.updateNumItemsOfListInSidebar(todoList, App.todoItems);

    return newItem;
  }

  isAListTitle(title) {
    const listOfTitles = App.getToDoListTitles();

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

      if (title === 'Home') {
        DOMElements.getSidebarHomeList().addEventListener(
          'click',
          function caller() {
            Display.displayToDoList(newList, App.todoItems);
          }
        );
      } else {
        Display.addToDoListToSidebar(newList, App.todoItems);
      }
    }

    // else
    else {
      console.log(`${title} already exists`);
    }

    return newList;
  }
}
