require('./styles/index.css');
require('./styles/todo-item.css');

import ToDoItem from './ToDo';
import Display from './Display';

const todoItem1 = new ToDoItem('First', 'blah ', '28 April', '1', true);
Display.displayToDoItem(todoItem1);

const todoItem2 = new ToDoItem('Second', 'blah blah blah', '37 April', '2');
Display.displayToDoItem(todoItem2);
