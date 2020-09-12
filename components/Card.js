export class Card {
  constructor(text, image, cardSelector, popup) {
    this._text = text;
    this._image = image;
    this._cardSelector = cardSelector;
    this._popup = popup;
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
    const imageCard = this._element.querySelector('.element__pic');
    imageCard.src = this._image;
    imageCard.alt = this._text;
    this._element.querySelector('.element__title').textContent = this._text;
    this._setEventListeners();
    return this._element;
  }
  _setEventListeners() {
    this._element
      .querySelector('.element__button-like')
      .addEventListener('click', this._like);
    this._element
      .querySelector('.element__button-trash')
      .addEventListener('click', this._remove);
    this._element.addEventListener('click', this._zoom);
  }
  _like = (evt) => {
    // ставим лайки
    const like = evt.target;
    if (like.classList.contains('element__button-like')) {
      like.classList.toggle('element__button-like_color_black');
    }
  };
  _openZoom = () => {
    this._popup.classList.add('popup_opened');
  };

  _closeZoom = () => {
    this._popup.classList.remove('popup_opened');
  };

  _zoom = (evt) => {
    const imageZoomCard = this._element.querySelector('.element__pic');
    if (evt.target === imageZoomCard) {
      this._popup.querySelector('.popup__pic').src = imageZoomCard.src;
      this._popup.querySelector('.popup__place-pic').textContent =
        imageZoomCard.alt;
      this._popup
        .querySelector('.popup__button-close')
        .addEventListener('click', this._closeZoom);
      this._openZoom();
    }
  };

  _remove = () => {
    // удаление карточек
    this._element.remove();
  };
}
