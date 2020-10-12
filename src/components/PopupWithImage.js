import Popup from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(this._popupSelector);
    this._image = this._popup.querySelector('.popup__pic');
    this._place = this._popup.querySelector('.popup__place-pic');
  }
  open(text, image) {
    super.open();
    this._image.src = image;
    this._image.alt = text;
    this._place.textContent = text;
  }
}
