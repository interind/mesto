import { selectorUser } from '../utils/constants.js';
import { PopupWithForm } from './PopupWithForm.js';
export class PopupSubmit extends PopupWithForm {
  constructor(popupSelector, infoUser, callbackSubmit, elementRemove) {
    super(popupSelector, infoUser, callbackSubmit);
    this._popup = document.querySelector(this._popupSelector);
    this.form = this._popup.querySelector('.popup__container');
    this._input = this.form.querySelector('.popup__input');
    this._callbackSubmit = callbackSubmit.bind(this);
    this.elementRemove = elementRemove;
    this._infoList = infoUser;
  }

  _setEventListeners() {
    super._setEventListeners();
    this.form.addEventListener('submit', this._submit);
  }

  _submit(evt) {
    evt.preventDefault();
    this._callbackSubmit(this._getInputValues());
    this.close();
    this.elementRemove.style.display = 'none';
  }

  close() {
    super.close();
    this.form.removeEventListener('submit', this._submit);
  }

  _getInputValues() {
    return this._input.value;
  }
}
