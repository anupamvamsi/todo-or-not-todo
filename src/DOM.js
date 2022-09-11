export default class DOM {
  constructor() {}

  static createElementAndAddTextContent(elementTag, textContent) {
    let element = document.createElement(elementTag);
    element.textContent = textContent;

    return element;
  }

  static addMultipleClasses(element, ...classes) {
    classes.forEach((c) => {
      element.classList.add(c);
    });

    return element;
  }

  static createEleAndAddClasses(elementTag, ...classes) {
    let element = document.createElement(elementTag);
    element = DOM.addMultipleClasses(element, ...classes);

    return element;
  }

  static createElementWTCAndClasses(elementTag, textContent, ...classes) {
    let element = DOM.createElementAndAddTextContent(elementTag, textContent);
    element = DOM.addMultipleClasses(element, ...classes);

    return element;
  }

  static createEleAndAddAttributes(elementTag, ...attrs) {
    let element = document.createElement(elementTag);
    attrs.forEach((attr) => {
      element[attr[0]] = attr[1];
    });

    return element;
  }

  static appendChildren(element, ...children) {
    children.forEach((child) => {
      element.appendChild(child);
    });
  }

  static setMultipleAttributes(element, attributes) {
    Object.keys(attributes).forEach((attr) => {
      element.setAttribute(attr, attributes[attr]);
    });
  }
}
