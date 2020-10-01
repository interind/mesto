import Popup from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(this._popupSelector);
  }
  open(text, image) {
    super.open();
    this._popup.querySelector('.popup__pic').src = image;
    this._popup.querySelector('.popup__place-pic').textContent = text;
  }
  close() {
    super.close();
  }
}
