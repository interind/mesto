import { infoUser } from '../utils/constants.js';
import { PopupWithForm } from './PopupWithForm.js';
export class PopupSubmit extends PopupWithForm {
  constructor(popupSelector, infoUser, callbackSubmit, functionRemove) {
    super(popupSelector, infoUser, callbackSubmit);
    this._popup = document.querySelector(this._popupSelector);
    this.form = this._popup.querySelector('.popup__container');
    this._input = this.form.querySelector('.popup__input');
    this._callbackSubmit = callbackSubmit.bind(this);
    this.functionRemove = functionRemove;
    this._infoList = infoUser;
  }

  _setEventListeners() {
    super._setEventListeners();
  }

  _submit(evt) {
    evt.preventDefault();
    this._callbackSubmit(this._getInputValues());
    this.close();
    this.functionRemove.style.display = 'none';
  }

  open() {
    super.open();
  }

  close() {
    super.close();
    this.form.removeEventListener('submit', this._submit);
  }

  _getInputValues() {
    return this._input.value;
  }

  render() {
    console.log(infoUser);
  }
}
