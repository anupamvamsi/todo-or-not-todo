import DOM from './DOM';
import DOMElements from './DOMElements';

export default class Form {
  static createFormHead(formCntr) {
    const formHead = DOM.createElementWTCAndClasses(
      'h3',
      'Add new todo',
      'form-head'
    );

    formCntr.appendChild(formHead);
  }

  static createFormTitle(formCntr) {
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

  static createFormDesc(formCntr) {
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

  static createParentListField(formCntr) {
    const label = DOM.createElementWTCAndClasses(
      'label',
      'Add to list',
      'form-list-label'
    );
    label.setAttribute('for', 'add-list');

    const inp = DOM.createEleAndAddClasses('input', 'form-list-inp');
    inp.id = 'add-list';
    inp.value =
      DOMElements.getElementOfSelector('.todo-list-title').textContent;
    inp.maxlength = 15;
    inp.title = 'Parent Todo List';

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
    inp.required = true;
    inp.title = 'Due date';

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
      ['id', 'add-priority'],
      ['title', 'Priority'],
      ['required', true]
    );

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

  static createDoneCheckbox() {
    const label = DOM.createElementWTCAndClasses(
      'label',
      'Done?',
      'form-done-label'
    );
    label.setAttribute('for', 'add-done');

    const inp = DOM.createEleAndAddAttributes(
      'input',
      ['id', 'add-done'],
      ['type', 'checkbox'],
      ['name', 'isDone'],
      ['title', 'To do item done?']
    );

    const doneCntr = DOM.createEleAndAddClasses('div', 'form-done-container');
    DOM.appendChildren(doneCntr, label, inp);

    return doneCntr;
  }

  static createFormSubmit() {
    const submitBtn = DOM.createElementWTCAndClasses(
      'button',
      'Create',
      'form-submit'
    );

    return submitBtn;
  }

  static createFormCancel() {
    const cancelBtn = DOM.createElementWTCAndClasses(
      'button',
      'Cancel',
      'form-cancel'
    );
    cancelBtn.type = 'button';

    return cancelBtn;
  }

  static createAddToDoForm() {
    const formCntr = DOM.createEleAndAddClasses('form', 'form-todo-add');
    formCntr.action = '';
    formCntr.method = '';
    Form.createFormHead(formCntr);
    Form.createFormTitle(formCntr);
    // Form.createFormDesc(formCntr);
    Form.createParentListField(formCntr);
    const dateCntr = Form.createDatePicker();
    const priority = Form.createPriorityPicker();
    const doneCntr = Form.createDoneCheckbox();

    const dateAndPriorityCntr = DOM.createEleAndAddClasses(
      'div',
      'form-date-and-priority'
    );
    DOM.appendChildren(dateAndPriorityCntr, dateCntr, priority, doneCntr);

    formCntr.appendChild(dateAndPriorityCntr);

    const submitBtn = Form.createFormSubmit(formCntr);
    const cancelBtn = Form.createFormCancel(formCntr);
    const buttonsCntr = DOM.createEleAndAddClasses('div', 'form-buttons');
    DOM.appendChildren(buttonsCntr, submitBtn, cancelBtn);

    formCntr.appendChild(buttonsCntr);

    return formCntr;
  }
}
