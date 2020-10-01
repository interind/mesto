export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._closeButton = this._popup.querySelector('.popup__button-close');
  }
  open() {
    this._popup.classList.add('popup_opened');
    this._setEventListeners();
  }
  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._handlePopupClose);
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
    this._popup.addEventListener('mousedown', this._handlePopupClose);
    window.addEventListener('keydown', this._handleEscClose);
  }
}
