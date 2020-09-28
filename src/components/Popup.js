export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }
  open() {
    this._popupSelector.classList.add('popup_opened');
    this._setEventListeners();
  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  _handlePopupClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
  _setEventListeners() {
    this._popupSelector
      .querySelector('.popup__button-close')
      .addEventListener('click', () => {
        this.close();
      });
    this._popupSelector.addEventListener('mousedown', (evt) => {
      this._handlePopupClose(evt);
    });
    window.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }
}
