require('./styles/index.css');
// require('./styles/style.css');

import ToDo from './ToDo';
import Display from './Display';

const todoItem1 = new ToDo('First', 'blah blah blah', '28 April', '1');
Display.displayToDoItem(todoItem1);

const todoItem2 = new ToDo('Second', 'blah blah blah', '37 April', '2');
Display.displayToDoItem(todoItem2);
