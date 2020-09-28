export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._closeButton = this._popupSelector.querySelector('.popup__button-close');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handlePopupClose = this._handlePopupClose.bind(this);
  }
  open() {
    this._popupSelector.classList.add('popup_opened');
    this._setEventListeners();
  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose);
    this._popupSelector.removeEventListener('mousedown', this._handlePopupClose);
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  _handlePopupClose(evt) {
    if (evt.target === evt.currentTarget || evt.target === this._closeButton) {
      this.close();
    }
  }
  _setEventListeners() {
    this._popupSelector.addEventListener('mousedown', this._handlePopupClose);
    window.addEventListener('keydown', this._handleEscClose);
  }
}
