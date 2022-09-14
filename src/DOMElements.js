export default class DOMElements {
  static content = document.querySelector('#content');

  static getElementOfSelector(selector) {
    return document.querySelector(selector);
  }

  static getHomeNumItemsElement() {
    return DOMElements.getSidebarHomeList().firstElementChild;
  }

  static getNumItemsElement(todoList) {
    if (todoList.title === 'Home') {
      return DOMElements.getHomeNumItemsElement();
    }

    return DOMElements.getSidebarListElement(todoList).firstElementChild;
  }

  static getSidebarHomeList() {
    return document.querySelector('.sidebar-items>li>a');
  }

  static getSidebarListElements() {
    const todoListItems = document.querySelectorAll('.sidebar-todo-lists>li');

    return todoListItems;
  }

  static getSidebarListsContent() {
    const todoListItems = DOMElements.getSidebarListElements();
    const todoListContent = [];
    todoListItems.forEach((item) => todoListContent.push(item.textContent));

    return todoListContent;
  }

  static getSidebarListElement(todoList) {
    if (todoList.title === 'Home') {
      return this.getSidebarHomeList();
    }

    const todoListItems = DOMElements.getSidebarListElements();

    let retVal;
    todoListItems.forEach((item) => {
      if (item.firstChild.textContent === todoList.title) {
        retVal = item;
      }
    });

    return retVal;
  }
}
