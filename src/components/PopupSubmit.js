import Popup from './Popup.js';
export class PopupSubmit extends Popup {
  constructor(api, popupSelector, id, elementRemove) {
    super(popupSelector);
    this._popup = document.querySelector(this._popupSelector);
    this._buttonSubmit = this._popup.querySelector('.popup__button-submit');
    this._id = id;
    this._api = api;
    this.elementRemove = elementRemove;
    this._submit = this._submit.bind(this);
  }

  _setEventListeners() {
    super._setEventListeners();
    this._buttonSubmit.addEventListener('click', this._submit);
  }

  _submit() {
    this._api
      .deleteCard(this._id)
      .then(() => {
        this.close();
        this.elementRemove.style.display = 'none';
      })
      .catch((err) => console.log('Карточка осталась', err));
  }

  close() {
    super.close();
    this._buttonSubmit.removeEventListener('click', this._submit);
  }
}
