import DOM from './DOM';

export default class Form {
  static createAddToDoFormHead(formCntr) {
    const formHead = DOM.createElementWTCAndClasses(
      'h3',
      'Add new todo',
      'form-head'
    );

    formCntr.appendChild(formHead);
  }

  static createAddToDoFormTitle(formCntr) {
    const label = DOM.createElementWTCAndClasses(
      'label',
      'Title',
      'form-title-label'
    );
    label.setAttribute('for', 'add-title');
    const inp = DOM.createEleAndAddClasses('input', 'form-title-inp');
    inp.id = 'add-title';
    inp.maxlength = 30;
    inp.required = true;
    inp.title = 'Todo title';

    DOM.appendChildren(formCntr, label, inp);
  }

  static createAddToDoFormDesc(formCntr) {
    const label = DOM.createElementWTCAndClasses(
      'label',
      'Description (Optional)',
      'form-desc-label'
    );
    label.setAttribute('for', 'add-desc');
    const inp = DOM.createEleAndAddClasses('textarea', 'form-desc-inp');
    inp.id = 'add-desc';
    inp.rows = 8;
    inp.cols = 25;
    inp.maxlength = 200;
    inp.title = 'To do description (optional)';

    DOM.appendChildren(formCntr, label, inp);
  }

  static createDatePicker() {
    const label = DOM.createElementWTCAndClasses(
      'label',
      'Due date',
      'form-date-label'
    );
    label.setAttribute('for', 'add-date');
    const inp = DOM.createEleAndAddClasses('input', 'form-date-inp');
    inp.id = 'add-date';
    inp.type = 'date';
    inp.title = 'Due date';
    inp.required = true;

    const cntr = DOM.createEleAndAddClasses('div', 'form-date-container');

    DOM.appendChildren(cntr, label, inp);

    return cntr;
  }

  static createPriorityPicker() {
    const label = DOM.createElementWTCAndClasses(
      'label',
      'Priority',
      'form-priority-label'
    );
    label.setAttribute('for', 'add-priority');
    const inp = DOM.createEleAndAddAttributes(
      'select',
      // ['id', 'add-priority'],
      ['title', 'Priority'],
      ['required', true]
    );
    inp.id = 'add-priority';

    for (let i = 1; i < 5; i++) {
      let option = DOM.createEleAndAddAttributes('option', ['value', i]);
      option.textContent = i;
      inp.appendChild(option);
    }
    inp.classList.add('todo-priority');
    inp.classList.add('p' + inp.value);

    let oldVal = 'p' + inp.value;
    inp.addEventListener('change', function priorityColorChanger() {
      inp.classList.remove(oldVal);

      inp.classList.add('p' + inp.value);
      oldVal = 'p' + inp.value;
    });

    const priorityCntr = DOM.createEleAndAddClasses(
      'div',
      'form-priority-container'
    );
    DOM.appendChildren(priorityCntr, label, inp);

    return priorityCntr;
  }

  static createAddToDoForm() {
    const formCntr = DOM.createEleAndAddClasses('form', 'form-todo-add');
    Form.createAddToDoFormHead(formCntr);
    Form.createAddToDoFormTitle(formCntr);
    Form.createAddToDoFormDesc(formCntr);
    const dateCntr = Form.createDatePicker();
    const priority = Form.createPriorityPicker();

    const dateAndPriorityCntr = DOM.createEleAndAddClasses(
      'div',
      'form-date-and-priority'
    );
    DOM.appendChildren(dateAndPriorityCntr, dateCntr, priority);

    formCntr.appendChild(dateAndPriorityCntr);
    return formCntr;
  }
}
