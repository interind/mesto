export class Card {
  constructor(text, image, cardSelector, popup) {
    
    this._text = text;
    this._image = image;
    this._cardSelector = cardSelector;
    this._popupFunction = popup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._imageCard = this._element.querySelector('.element__pic');
    this._imageCard.src = this._image;
    this._imageCard.alt = this._text;

    this._element.querySelector('.element__title').textContent = this._text;
    this._setEventListeners();
    return this._element;
  }
  _setEventListeners() {
    this._element
      .querySelector('.element__button-like')
      .addEventListener('click', () => {
      this._like();
    });
    this._element
      .querySelector('.element__button-trash')
      .addEventListener('click', () => {
        this._remove();
      });
    this._element.addEventListener('click', (evt) => {
       this._zoom(evt);
    });
  }
  _like () {
    // ставим лайки
    this._element
      .querySelector('.element__button-like')
      .classList.toggle('element__button-like_color_black');
  }

  _zoom  (evt) {
    if(evt.target === this._imageCard) {
    this._renderZoomCard = document.querySelector('.popup_type_zoom');
    this._renderZoomCard.querySelector('.popup__pic').src = this._imageCard.src;
    this._renderZoomCard.querySelector(
      '.popup__place-pic'
    ).textContent = this._imageCard.alt;

    this._popupFunction(this._renderZoomCard);
    }
  }

  _remove () {
    // удаление карточек
    this._element.remove();
    this._element = null;
  }
}
