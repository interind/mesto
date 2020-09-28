import Popup from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(text, image) {
    super.open();
      this._popupSelector.querySelector('.popup__pic').src = image;
      this._popupSelector.querySelector('.popup__place-pic').textContent =
        text;
  }
  close() {
    super.close();
  }
}
