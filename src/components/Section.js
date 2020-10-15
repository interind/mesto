export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addItem(element, myId) {
    if(element.id === myId){
      this._container.prepend(element);
    }
    else{
      this._container.append(element);
    }
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
}