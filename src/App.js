import ToDoItem from './ToDo';
import ToDoList from './ToDoList';
import Display from './Display';
import DOMElements from './DOMElements';

export default class App {
  static todoItems = [];
  static todoLists = [];

  constructor() {}

  static updateStorage() {
    localStorage.setItem('todoItems', JSON.stringify(App.todoItems));
    localStorage.setItem('todoLists', JSON.stringify(App.todoLists));
  }

  static getFromStorage() {
    const items = JSON.parse(localStorage.getItem('todoItems'));
    const lists = JSON.parse(localStorage.getItem('todoLists'));

    lists.forEach((list) => {
      let l = list;
      l = App.createToDoList(l.title, l.description, l.children);
    });

    items.forEach((item) => {
      let i = item;
      i = App.createToDoItem(
        i.title,
        i.description,
        i.dueDate,
        i.priority,
        i.parentList,
        i.isDone
      );
    });
  }

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

    App.todoLists[idxToDoList].children.splice(idxToDoItem, 1);
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

  static addChildToList(todoListTitle, todoItem) {
    const todoList = App.getToDoList(todoListTitle);
    todoList.children.push(todoItem);
  }

  static addItemToParentList(todoItem) {
    // if parentList is NOT an existing ToDoList, create ToDoList:
    if (!App.isAListTitle(todoItem.parentList)) {
      App.createToDoList(todoItem.parentList, '');
    }

    App.addChildToList(todoItem.parentList, todoItem);
  }

  static createToDoItem(
    title,
    description,
    dueDate,
    priority,
    parentList,
    isDone
  ) {
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
    App.addItemToParentList(newItem);
    const todoList = App.getToDoList(newItem.parentList);
    Display.updateNumItemsOfListInSidebar(todoList, App.todoItems);

    return newItem;
  }

  static isAListTitle(title) {
    const listOfTitles = App.getToDoListTitles();

    if (listOfTitles.includes(title)) {
      return true;
    }

    // console.log(`${title} doesn't exist!`);
    return false;
  }

  static createToDoList(title, description) {
    let newList;
    if (!App.isAListTitle(title)) {
      // console.log(`Creating ${title} ToDoList...`);
      newList = new ToDoList(title, description);
      App.todoLists.push(newList);
      // console.log('Todo lists:', App.todoLists);

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
      // console.log(`${title} already exists`);
    }

    return newList;
  }
}
