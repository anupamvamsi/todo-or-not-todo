import DOMElements from './DOMElements';
import DOM from './DOM';

export default class Display {
  static updateNumItemsOfListInSidebar(todoList, allToDoItems) {
    const sidebarListElement = DOMElements.getSidebarListElement(todoList);

    let numItemsElement = DOMElements.getNumItemsElement(todoList);
    let homeNumItemsElement = DOMElements.getHomeNumItemsElement();

    const numItems = todoList.children.length;
    const numItemsHome = allToDoItems.length;

    if (!numItemsElement) {
      numItemsElement = DOM.createElementAndAddTextContent('span', numItems);
      numItemsElement.classList.add('num-todo-items');

      sidebarListElement.appendChild(numItemsElement);
    } else {
      numItemsElement.textContent = numItems;
      homeNumItemsElement.textContent = numItemsHome;
    }
  }

  static addToDoListToSidebar(todoList, allToDoItems) {
    const todoListContent = DOMElements.getSidebarListsContent();

    let newToDoList;

    if (!todoListContent.includes(todoList.title) && todoList.title != 'Home') {
      const sidebarToDoLists = document.querySelector('.sidebar-todo-lists');
      newToDoList = DOM.createElementAndAddTextContent('li', todoList.title);

      sidebarToDoLists.appendChild(newToDoList);
      Display.updateNumItemsOfListInSidebar(todoList, allToDoItems);
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

    const infoContainer = DOM.createEleAndAddClasses('div', 'todo-info');
    DOM.appendChildren(
      infoContainer,
      isDone,
      title,
      description,
      dueDate,
      priority
    );

    const edit = DOM.createElementWTCAndClasses('span', 'Edit', 'todo-edit');
    const remove = DOM.createElementWTCAndClasses(
      'span',
      'Remove',
      'todo-remove'
    );

    const manipContainer = DOM.createEleAndAddClasses('div', 'todo-manip');
    DOM.appendChildren(manipContainer, edit, remove);

    const todoItemContainer = DOM.createEleAndAddClasses('div', 'todo-item');
    DOM.appendChildren(todoItemContainer, infoContainer, manipContainer);

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
      // 'todo-item',
      'add-todo-container'
    );

    DOM.appendChildren(addToDoItemContainer, plus, addItem);

    return addToDoItemContainer;
  }

  static constructToDoList(todoList, allToDoItems) {
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

    let todoItems;
    if (todoList.title === 'Home') {
      todoItems = allToDoItems;
    } else {
      todoItems = todoList.children;
    }

    todoItems.forEach((item) => {
      todoItemsContainer.appendChild(Display.constructToDoItem(item));
    });

    todoListCtnrExists.appendChild(todoItemsContainer);
    todoListCtnrExists.appendChild(Display.constructAddToDoItem());

    return todoListCtnrExists;
  }

  static displayToDoList(todoList, allToDoItems) {
    const todoListContainer = Display.constructToDoList(todoList, allToDoItems);
    DOMElements.content.appendChild(todoListContainer);
  }
}
