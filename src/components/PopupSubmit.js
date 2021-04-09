import Popup from './Popup.js';
export class PopupSubmit extends Popup {
  constructor(deleteCard, popupSelector) {
    super(popupSelector);
    this._form = document.forms.formTrash;
    this._deleteCard = deleteCard;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', this._deleteCard);
  }

  close() {
    super.close();
    this._form.removeEventListener('submit', this._deleteCard);
  }
}
