export default class Popup {
 constructor(popupSelector) {
  this._popupSelector = popupSelector;
 }
 open() {
  this._popup = document.querySelector(this._popupSelector);
  this._popup.classList.add('popup_opened');
  this._setEventListeners();
 }
 close() {
  this._popup.classList.remove('popup_opened');
 }
 _handleEscClose(evt) {
  if (evt.key === 'Escape') {
   this.close();
 }
 }
 _setEventListeners() {
  this._popup.querySelector('.popup__button-close').addEventListener('click', (evt) => {
      this.close(evt);
  });
  this._popup.addEventListener('mousedown', (evt) => {
    if(evt.target === evt.currentTarget) {
    this.close();
    }
  });
  window.addEventListener('keydown', (evt) => {
     this._handleEscClose(evt);
  });
  }
}

class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
   this._popupSelector = popupSelector;
   this._callbackSubmit = callbackSubmit;
  }
  _getInputValues() {
 
  }
  _setEventListeners() {
 
  }
  close() {
 
  }
 }

 class PopupWithImage extends Popup {
  constructor({data}) {
  this._image = data.image;
  this._src = data.src;
  }
  open() {
  
    }
  }