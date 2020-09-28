import Popup from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._inputList = Array.from(
      this._popupSelector.querySelectorAll('.popup__input')
    );
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
    debugger;
    this._getInputValues();
  }
  close() {
    super.close();
  }
  _getInputValues() {
    this._inputList.forEach(input => {
    
    });
  }
  _handleEscClose(evt) {
    super._handleEscClose(evt);
  }
}
