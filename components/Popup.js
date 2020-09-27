class Popup {
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
 _setEventListeners() {
   this._popupSelector.querySelector('.popup__button-close').addEventListener('click', () => {
   this.close();
   });
    this._popupSelector.addEventListener('mousedown', (evt) => {
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
  constructor(popupSelector, getInputValues, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._getInputValues = getInputValues;
  }
  _setEventListeners() {
    super._setEventListeners();
      this._popupSelector.querySelector('.popup__container_type_profile').addEventListener('submit', () => {
      this._callbackSubmit();
      this.close();
    });
  }
  open() {
  super.open();
  this._getInputValues();
  }
  close() {
  super.close();
  }
  _handleEscClose(evt) {
    super._handleEscClose(evt);
  }
 }

 export class PopupWithFormCard extends Popup {
  constructor(popupSelector, getInputValues, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._getInputValues = getInputValues;
  }
  _setEventListeners() {
    super._setEventListeners();
    this._popupSelector.querySelector('.popup__container_type_card').addEventListener('submit', () => {
      this._callbackSubmit();
      this.close();
    });
  }
  open() {
  super.open();
  this._getInputValues();
  }
  close() {
  super.close();
  }
  _handleEscClose(evt) {
    super._handleEscClose(evt);
  }
 }

 export class PopupWithImage extends Popup {
  constructor(popupSelector) {
  super(popupSelector);
  }
  open(evt) {
    const image = evt.target;
    if(image.getAttribute('src')) {
      this._popupSelector.querySelector('.popup__pic').src = image.src;
      this._popupSelector.querySelector(
        '.popup__place-pic'
      ).textContent = image.alt;
      super.open();
    }
  }
  close() {
    super.close();
  }
}