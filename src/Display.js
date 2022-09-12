import ToDoItem from './ToDo';
import DOMElements from './DOMElements';
import DOM from './DOM';

export default class Display {
  static displayToDoItem(todoItem) {
    const isDone = DOM.createEleAndAddAttributes(
      'input',
      ['type', 'checkbox'],
      ['name', 'isDone'],
      ['title', 'To do item done?']
    );

    if (todoItem.isDone) {
      isDone.setAttribute('checked', true);
    }

    const title = DOM.createElementWTCAndClasses(
      'h3',
      todoItem.title,
      'todo-title'
    );
    const description = DOM.createElementWTCAndClasses(
      'p',
      todoItem.description,
      'todo-desc'
    );
    const dueDate = DOM.createElementWTCAndClasses(
      'p',
      todoItem.dueDate,
      'todo-due'
    );
    const priority = DOM.createElementWTCAndClasses(
      'p',
      todoItem.priority,
      'todo-priority'
    );

    const todoItemContainer = DOM.createEleAndAddClasses('div', 'todo-item');
    DOM.appendChildren(
      todoItemContainer,
      isDone,
      title,
      description,
      dueDate,
      priority
    );

    DOMElements.content.appendChild(todoItemContainer);
  }

  static checkAndAddToDoList(todoList) {
    const todoListItems = document.querySelectorAll('.sidebar-todo-lists>li');
    const todoListContent = [];
    todoListItems.forEach((item) => todoListContent.push(item.textContent));

    if (!todoListContent.includes(todoList.title) && todoList.title != 'Home') {
      const sidebarToDoLists = document.querySelector('.sidebar-todo-lists');
      const newToDoList = DOM.createElementAndAddTextContent(
        'li',
        todoList.title
      );

      sidebarToDoLists.appendChild(newToDoList);
    }
  }

  static displayToDoList(todoList) {
    Display.checkAndAddToDoList(todoList);

    const title = DOM.createElementWTCAndClasses(
      'h2',
      todoList.title,
      'todo-list-title'
    );

    const description = DOM.createElementWTCAndClasses(
      'p',
      todoList.description,
      'todo-list-desc'
    );

    const todoListContainer = DOM.createEleAndAddClasses('div', 'todo-list');
    DOM.appendChildren(todoListContainer, title, description);

    const todoItemsContainer = DOM.createEleAndAddClasses('div', 'todo-items');
    // console.log(todoItems);
    // todoItems.forEach((item) => {
    // console.log(item);
    // todoItemsContainer.appendChild(item);
    // console.log(todoItemsContainer);
    // });

    todoListContainer.appendChild(todoItemsContainer);
    DOMElements.content.appendChild(todoListContainer);
  }

  static displayAddToDoItem() {
    const plus = DOM.createElementWTCAndClasses('p', '+', 'add-todo-plus');
    const addItem = DOM.createElementWTCAndClasses(
      'h3',
      'Add item',
      'add-todo-txt'
    );

    const addToDoItemContainer = DOM.createEleAndAddClasses(
      'div',
      'todo-item',
      'add-todo-container'
    );

    DOM.appendChildren(addToDoItemContainer, plus, addItem);
    DOMElements.getElementOfSelector('.todo-items').appendChild(
      addToDoItemContainer
    );
  }
}
