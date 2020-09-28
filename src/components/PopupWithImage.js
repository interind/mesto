import Popup from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(evt) {
    const image = evt.target;
    if (image.getAttribute('src')) {
      this._popupSelector.querySelector('.popup__pic').src = image.src;
      this._popupSelector.querySelector('.popup__place-pic').textContent =
        image.alt;
      super.open();
    }
  }
  close() {
    super.close();
  }
}
