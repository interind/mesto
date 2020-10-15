import Popup from './Popup.js';
export class PopupSubmit extends Popup {
  constructor(deleteCard, popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(this._popupSelector);
    this._buttonSubmit = this._popup.querySelector('.popup__button-submit');
    this._deleteCard = deleteCard;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._buttonSubmit.addEventListener('click', this._deleteCard);
  }

  close() {
    super.close();
    this._buttonSubmit.removeEventListener('click', this._deleteCard);
  }
}
