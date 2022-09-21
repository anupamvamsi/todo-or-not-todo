require('./styles/index.css');
require('./styles/todo-item.css');
require('./styles/todo-form.css');
require('./styles/todo-list.css');
require('./styles/sidebar.css');

import Display from './Display';
import App from './App';

function main() {
  App.createToDoList('Home', 'A list of all your tasks');
  App.createToDoList('Chores', 'A list of all your tasks');
  App.createToDoList('Scooby', 'A list of all your tasks');
  App.createToDoList('Main', 'A list of all your tasks');
  App.createToDoList('Flutes', 'A list of all your tasks');

  App.createToDoItem('First', 'blah ', '2020-04-12', '1', '', true);
  App.createToDoItem('Premier', 'blah ', '2020-04-18', '2', 'Scooby', false);

  App.createToDoItem('Second', 'blah blah', '2020-04-23', '4', 'Chores', false);
  App.createToDoItem('Deuxieme', 'blah ', '2020-04-29', '3', 'Home', true);

  Display.displayToDoList(App.getToDoList('Home'), App.todoItems);

  Display.constructAddToDoItem();
}

main();
