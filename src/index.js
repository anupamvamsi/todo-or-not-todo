require('./styles/index.css');
require('./styles/todo-item.css');
require('./styles/todo-list.css');
require('./styles/sidebar.css');

import Display from './Display';
import App from './App';

function main() {
  const app = new App();
  app.createToDoList('Home', 'A list of all your tasks');
  app.createToDoList('Chores', 'A list of all your tasks');
  app.createToDoList('Scooby', 'A list of all your tasks');
  app.createToDoList('Main', 'A list of all your tasks');
  app.createToDoList('Flutes', 'A list of all your tasks');

  app.createToDoItem('First', 'blah ', '28 April', '1', 'Chores', true);
  app.createToDoItem('Premier', 'blah ', '18 April', '2', 'Scooby', false);

  app.createToDoItem('Second', 'blah blah', '17 April', '2', 'Chores', false);
  app.createToDoItem('Deuxieme', 'blah ', '08 April', '2', 'Chores', true);

  Display.displayToDoList(app.getToDoList('Home'), App.todoItems);

  Display.constructAddToDoItem();
}

main();
