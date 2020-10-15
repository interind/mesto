import Popup from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, infoUser, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._popup = document.querySelector(this._popupSelector);
    this.form = this._popup.querySelector('.popup__container');
    this._inputList = Array.from(this.form.querySelectorAll('.popup__input'));
    this._infoList = Object.values(infoUser);
    this._submit = this._submit.bind(this);
    this.buttonSubmit = this.form.querySelector('.popup__button-submit');
    this.close = this.close.bind(this);
  }
  _setEventListeners() {
    super._setEventListeners();
    this.form.addEventListener('submit', this._submit);
  }

  close() {
    super.close();
    this.form.removeEventListener('submit', this._submit);
    this.form.reset();
  }

  _submit(evt) {
    evt.preventDefault();
    this._callbackSubmit(this._getInputValues());
  }

  _getInputValues() {
    // получение значений инпутов в объект
    let inputValues = {};
    this._inputList.forEach((input) => (inputValues[input.name] = input.value));
    return inputValues;
  }
}
