import DOMElements from './DOMElements';
import DOM from './DOM';
import App from './App';
import Form from './Form';

export default class Display {
  // Event listeners
  static attachEventListenerSidebarList(
    todoListElement,
    todoList,
    allToDoItems
  ) {
    todoListElement.addEventListener('click', function caller() {
      Display.displayToDoList(todoList, allToDoItems);
    });
  }

  static attachEventListenerToDoItem(
    todoItem,
    isDone,
    title,
    dueDate,
    priority,
    rmv
  ) {
    isDone.addEventListener('change', function toggleDone() {
      todoItem.changeItemStatus();
    });

    dueDate.addEventListener('change', function dateChanger() {
      todoItem.dueDate = dueDate.value;
    });

    priority.addEventListener('change', function priorityChanger() {
      const oldVal = 'p' + todoItem.priority;
      priority.classList.remove(oldVal);
      todoItem.changeItemPriority(priority.value);
      priority.classList.add('p' + priority.value);
    });

    rmv.addEventListener('click', function remover() {
      // removeFromDOM
      rmv.parentNode.parentNode.remove();

      App.removeToDoItem(todoItem);
      App.removeToDoItemFromToDoList(todoItem);

      Display.updateNumItemsOfListInSidebar(
        App.getToDoList(todoItem.parentList),
        App.todoItems
      );
    });
  }

  static removeEventListenerAddToDo(addToDoCntr) {
    addToDoCntr.removeEventListener('click', Display.addNewToDo);
  }

  static submitAddToDoForm(e) {
    e.preventDefault();

    const tdTitle = DOMElements.getElementOfSelector('#add-title').value;
    const tdDesc = DOMElements.getElementOfSelector('#add-desc').value;
    const tdDate = DOMElements.getElementOfSelector('#add-date').value;
    const tdPriority = DOMElements.getElementOfSelector('#add-priority').value;
    const tdList = DOMElements.getElementOfSelector('#add-list').value;
    const tdDone = DOMElements.getElementOfSelector('#add-done').value;

    App.createToDoItem(tdTitle, tdDesc, tdDate, tdPriority, tdList, tdDone);
  }

  static addNewToDo(e) {
    const addToDoCntr = DOMElements.getElementOfSelector('.add-todo-container');

    addToDoCntr.textContent = '';

    const formCntr = Form.createAddToDoForm();
    addToDoCntr.appendChild(formCntr);

    // after creating todo-item, add a "+ add item" and also remove the event listener
    addToDoCntr.classList.remove('add-todo-container');
    addToDoCntr.classList.add('add-todo-form-container');
    Display.removeEventListenerAddToDo(addToDoCntr);

    addToDoCntr.scrollIntoView();

    const submitBtn = DOMElements.getElementOfSelector('.form-submit');
    submitBtn.addEventListener('click', Display.submitAddToDoForm);
    // const addToDoItem = Display.constructAddToDoItem();
    // addToDoCntr.parentNode.appendChild(addToDoItem);
  }

  static attachEventListenerAddToDo(addToDoCntr) {
    addToDoCntr.addEventListener('click', Display.addNewToDo);
  }

  static updateNumItemsOfListInSidebar(todoList, allToDoItems) {
    const sidebarHomeListElement = DOMElements.getSidebarHomeList('Home');
    const sidebarListElement = DOMElements.getSidebarListElement(todoList);

    let numItemsElement = DOMElements.getNumItemsElement(todoList);
    let homeNumItemsElement = DOMElements.getHomeNumItemsElement();

    const numItems = todoList.children.length;
    const numItemsHome = allToDoItems.length;

    if (!homeNumItemsElement) {
      homeNumItemsElement = DOM.createElementAndAddTextContent(
        'span',
        numItemsHome
      );
      homeNumItemsElement.classList.add('num-todo-items');

      sidebarHomeListElement.appendChild(homeNumItemsElement);
    }

    if (!numItemsElement && todoList.title !== 'Home') {
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

    let todoListElement;

    if (!todoListContent.includes(todoList.title) && todoList.title != 'Home') {
      const sidebarToDoLists = document.querySelector('.sidebar-todo-lists');
      todoListElement = DOM.createElementAndAddTextContent(
        'li',
        todoList.title
      );

      sidebarToDoLists.appendChild(todoListElement);
      Display.updateNumItemsOfListInSidebar(todoList, allToDoItems);
    }

    Display.attachEventListenerSidebarList(
      todoListElement,
      todoList,
      allToDoItems
    );

    return todoListElement;
  }

  static constructPriorityElement(todoItem) {
    const priority = DOM.createEleAndAddAttributes(
      'select',
      ['title', 'Priority'],
      ['required', true]
    );
    for (let i = 1; i < 5; i++) {
      let option = DOM.createEleAndAddAttributes('option', ['value', i]);
      option.textContent = i;
      if (i === Number(todoItem.priority)) {
        option.selected = true;
      }
      priority.appendChild(option);
    }
    priority.classList.add('todo-priority');
    priority.classList.add('p' + priority.value);

    return priority;
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

    const desc = DOM.createElementWTCAndClasses(
      'p',
      todoItem.description,
      'todo-desc'
    );

    const dueDate = DOM.createEleAndAddAttributes(
      'input',
      ['type', 'date'],
      ['value', todoItem.dueDate]
    );
    dueDate.classList.add('todo-due');

    const priority = Display.constructPriorityElement(todoItem);

    const infoContainer = DOM.createEleAndAddClasses('div', 'todo-info');
    DOM.appendChildren(infoContainer, isDone, title, desc);

    const edit = DOM.createElementWTCAndClasses('span', 'Edit', 'todo-edit');
    const remove = DOM.createElementWTCAndClasses(
      'span',
      'Remove',
      'todo-remove'
    );

    const manipContainer = DOM.createEleAndAddClasses('div', 'todo-manip');
    DOM.appendChildren(manipContainer, dueDate, priority, edit, remove);

    const todoItemContainer = DOM.createEleAndAddClasses('div', 'todo-item');
    DOM.appendChildren(todoItemContainer, infoContainer, manipContainer);

    Display.attachEventListenerToDoItem(
      todoItem,
      isDone,
      title,
      dueDate,
      priority,
      remove
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
      // 'todo-item',
      'add-todo-container'
    );

    DOM.appendChildren(addToDoItemContainer, plus, addItem);

    Display.attachEventListenerAddToDo(addToDoItemContainer);

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

    const titleAndDescCntr = DOM.createEleAndAddClasses(
      'div',
      '.todo-list-title-container'
    );

    DOM.appendChildren(titleAndDescCntr, title, description);

    let todoListCtnrExists = document.querySelector('.todo-list');

    if (todoListCtnrExists) {
      todoListCtnrExists.textContent = '';
    } else {
      todoListCtnrExists = DOM.createEleAndAddClasses('div', 'todo-list');
    }
    DOM.appendChildren(todoListCtnrExists, titleAndDescCntr);

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
    todoItemsContainer.appendChild(Display.constructAddToDoItem());

    todoListCtnrExists.appendChild(todoItemsContainer);

    return todoListCtnrExists;
  }

  static displayToDoList(todoList, allToDoItems) {
    const todoListContainer = Display.constructToDoList(todoList, allToDoItems);
    DOMElements.content.appendChild(todoListContainer);
  }
}
