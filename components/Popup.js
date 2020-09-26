export class Popup {
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
    this._popup.addEventListener('mousedown', (evt) => {
    if(evt.target === evt.currentTarget || evt.target.classList.contains('popup__button-close')) {
    this.close();
    }
  });
    window.addEventListener('keydown', (evt) => {
    this._handleEscClose(evt);
  });
  }
}

export class PopupWithFormProfile extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
  }
  _getInputValues() {
  this._popup = document.querySelector(this._popupSelector);
  this._form = document.querySelector('.popup__container_type_profile');
  this._inputName = document.querySelector('#input-name');
  this._inputJob = document.querySelector('#input-job');
  }
  _setEventListeners() {
    debugger;
    this._popup.addEventListener('submit', this._callbackSubmit);

  }
  close() {
  super.close();
  }
 }

 export class PopupWithFormCard extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
  }
  _getInputValues() {
  this._popup = document.querySelector(this._popupSelector);
  this._form = document.querySelector('.popup__container_type_card');
  this._inputPlace = document.querySelector('#input-place');
  this._inputCard = document.querySelector('#input-card');
  }
  _setEventListeners() {
    this._form.addEventListener('submit', this._callbackSubmit);

  }
  close() {
  super.close();
  this._form.reset();
  }
 }

 export class PopupWithImage extends Popup {
  constructor(popupSelector) {
  super(popupSelector);
  }
  open(evt) {
    const image = evt.target;
    if(image.getAttribute('src')) {
      this._renderZoomCard = document.querySelector(this._popupSelector);
      this._renderZoomCard.querySelector('.popup__pic').src = image.src;
      this._renderZoomCard.querySelector(
        '.popup__place-pic'
      ).textContent = image.alt;
      super.open();
    }
  }
  close() {
    super.close();
  }
}