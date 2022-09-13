import Display from './Display';

export default class MyEvent {
  constructor() {}

  addEvtListenerToSbrLstItem(sidebarListItem, todoList) {
    sidebarListItem.addEventListener('click', function caller() {
      Display.displayToDoList(todoList);
    });
  }
}
