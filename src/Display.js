import ToDo from './ToDo';
import DOMElements from './DOMElements';
import DOM from './DOM';

export default class Display {
  static displayToDoItem(todoItem) {
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

    const todoItemContainer = document.createElement('div');
    DOM.appendChildren(
      todoItemContainer,
      title,
      description,
      dueDate,
      priority
    );

    DOMElements.content.appendChild(todoItemContainer);
  }
}
