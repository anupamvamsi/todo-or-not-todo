import DOMElements from './DOMElements';
import DOM from './DOM';

export default class Display {
  static addToDoListToSidebar(todoList) {
    const todoListItems = document.querySelectorAll('.sidebar-todo-lists>li');
    const todoListContent = [];
    todoListItems.forEach((item) => todoListContent.push(item.textContent));

    let newToDoList;

    if (!todoListContent.includes(todoList.title) && todoList.title != 'Home') {
      const sidebarToDoLists = document.querySelector('.sidebar-todo-lists');
      newToDoList = DOM.createElementAndAddTextContent('li', todoList.title);

      sidebarToDoLists.appendChild(newToDoList);
    }

    return newToDoList;
  }

  static constructToDoItem(todoItem) {
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

    return todoItemContainer;
  }

  static constructAddToDoItem() {
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

    return addToDoItemContainer;
  }

  static constructToDoList(todoList) {
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

    let todoListCtnrExists = document.querySelector('.todo-list');

    if (todoListCtnrExists) {
      todoListCtnrExists.textContent = '';
    } else {
      todoListCtnrExists = DOM.createEleAndAddClasses('div', 'todo-list');
    }
    DOM.appendChildren(todoListCtnrExists, title, description);

    const todoItemsContainer = DOM.createEleAndAddClasses('div', 'todo-items');

    const todoItems = todoList.children;
    todoItems.forEach((item) => {
      todoItemsContainer.appendChild(Display.constructToDoItem(item));
    });

    todoListCtnrExists.appendChild(todoItemsContainer);
    todoListCtnrExists.appendChild(Display.constructAddToDoItem());

    return todoListCtnrExists;
  }

  static displayToDoList(todoList) {
    const todoListContainer = Display.constructToDoList(todoList);
    DOMElements.content.appendChild(todoListContainer);
  }
}
