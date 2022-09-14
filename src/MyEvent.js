import Display from './Display';

export default class MyEvent {
  constructor() {}

  addEvtListenerToSbrLstItem(sidebarListItem, todoList, allToDoItems) {
    sidebarListItem.addEventListener('click', function caller() {
      Display.displayToDoList(todoList, allToDoItems);
    });
  }
}
