import Popup from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, getInputValues, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._getInputValues = getInputValues;
  }
  _setEventListeners() {
    super._setEventListeners();
    this._popupSelector
      .querySelector('.popup__container')
      .addEventListener('submit', () => {
        this._callbackSubmit();
        this.close();
      });
  }
  open() {
    super.open();
    this._getInputValues();
  }
  close() {
    super.close();
  }
  _handleEscClose(evt) {
    super._handleEscClose(evt);
  }
}
