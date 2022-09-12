require('./styles/index.css');
require('./styles/todo-item.css');
require('./styles/todo-list.css');

import Display from './Display';
import App from './App';

function main() {
  const app = new App();
  const todoList1 = app.createToDoList('Home', 'A list of all your tasks');
  const todoList2 = app.createToDoList('Chores', 'A list of all your tasks');
  const todoList3 = app.createToDoList('Scooby', 'A list of all your tasks');
  const todoList4 = app.createToDoList('Main', 'A list of all your tasks');
  const todoList5 = app.createToDoList('Flutes', 'A list of all your tasks');

  app.createToDoItem('First', 'blah ', '28 April', '1', 'Home', true);
  app.createToDoItem('Premier', 'blah ', '18 April', '2', '', false);

  app.createToDoItem('Second', 'blah blah', '17 April', '2', 'Chores', false);
  app.createToDoItem('Deuxieme', 'blah ', '08 April', '2', 'Chores', true);

  Display.displayToDoList(todoList1);

  Display.constructAddToDoItem();
}

main();
