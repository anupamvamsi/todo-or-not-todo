require('./styles/index.css');
require('./styles/todo-item.css');
require('./styles/todo-list.css');

import ToDoItem from './ToDo';
import Display from './Display';
import ToDoList from './ToDoList';

function createDefaultToDo() {
  const todoList1 = new ToDoList('Home', 'A list of all your tasks.');

  const todoItem1 = new ToDoItem('First', 'blah ', '28 April', '1', true);
  Display.displayToDoItem(todoItem1);

  const todoItem2 = new ToDoItem('Second', 'blah blah blah', '17 April', '2');
  Display.displayToDoItem(todoItem2);

  Display.displayToDoList(todoList1, document.querySelectorAll('.todo-item'));

  Display.addToDoItem();
}

createDefaultToDo();
