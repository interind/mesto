export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data || {place: data, card: data};
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addItems(element) {
    this._container.append(element);
  }

  addNewItems(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
