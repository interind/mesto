export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__button-close');
  }
  open() {
    this._popup.classList.add('popup_opened');
    this._setEventListeners();
  }
  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', () => {
      this.handleEscClose(); 
    });
    this._popup.removeEventListener('mousedown', () => {
      this._handlePopupClose();
    });
    this._buttonClose.removeEventListener('click',() => {
      this.close();
    });
  }
  handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  handlePopupClose(evt) {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__button-close')) {
      this.close();
    }
  }
  _setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      this.handlePopupClose(evt);
    });
    window.addEventListener('keydown', (evt) => {
      this.handleEscClose(evt); 
    });
    this._buttonClose.addEventListener('click',() => {
      this.close();
    });
  }
}
