import Popup from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, infoUser, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._popup = document.querySelector(this._popupSelector);
    this.form = this._popup.querySelector('.popup__container');
    this._inputList= Array.from(this.form.querySelectorAll('.popup__input'));
    this._infoList = Object.values(infoUser);
    this._submit = this._submit.bind(this);
  }
  _setEventListeners() {
    super._setEventListeners();
    this.form.addEventListener('submit', this._submit);
  }
  open() {
    super.open();
    this.render();
  }
  close() {
    super.close();
    this.form.removeEventListener('submit', this._submit);
    this.form.reset(); // сброс формы
    
  }

  _submit(evt) {
    evt.preventDefault();
    this._callbackSubmit(this._getInputValues());
    this.close();
  }

  _getInputValues() { // получение значений инпутов в объект
    const inputValues = Object.values(this._inputList);
    return [{0: inputValues[0].value, 1: inputValues[1].value}];
  }

  render() { // функция для отображения данных при открытии формы
      this._inputList[0].value = this._infoList[0].textContent;
      this._inputList[1].value = this._infoList[1].textContent;
      setTimeout(() => this._inputList[0].focus(), 100);
  }
}