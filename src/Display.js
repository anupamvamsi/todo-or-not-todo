import ToDoItem from './ToDo';
import DOMElements from './DOMElements';
import DOM from './DOM';

export default class Display {
  static displayToDoItem(todoItem) {
    const isDone = DOM.createEleAndAddAttributes(
      'input',
      ['class', 'todo-done'],
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
}
