export class Card {
  constructor(data, cardSelector, handleCardClick) {
    
    this._text = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
  
    this._handleCardClick.open(evt);
  }

  _remove () {
    // удаление карточек
    this._element.remove();
    this._element = null;
  }
}
