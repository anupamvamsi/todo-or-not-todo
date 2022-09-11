export default class DOMElements {
  static content = document.querySelector('#content');

  static getElementOfSelector(selector) {
    return document.querySelector(selector);
  }
}
