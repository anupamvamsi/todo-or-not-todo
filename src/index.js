require('./styles/index.css');
require('./styles/todo-item.css');
require('./styles/todo-list.css');

import ToDoItem from './ToDo';
import Display from './Display';
import ToDoList from './ToDoList';
import App from './App';

function main() {
  const app = new App();
  const todoList1 = app.createToDoList('Home', 'A list of all your tasks');

  const todoItem1 = app.createToDoItem(
    'First',
    'blah ',
    '28 April',
    '1',
    'Home',
    true
  );
  Display.displayToDoItem(todoItem1);

  const todoItem2 = app.createToDoItem(
    'Second',
    'blah blah blah',
    '17 April',
    '2',
    'Chores',
    false
  );
  Display.displayToDoItem(todoItem2);

  Display.displayToDoList(todoList1);

  Display.displayAddToDoItem();
}

main();
