export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._text = data[0] || data.name;
    this._image = data[1] || data.link;
    this.likes = data.likes;
    this._id = data._id;
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

    this._title = this._element.querySelector('.element__title')
    this._title.textContent = this._text;
    this._title.title = this._title.textContent;
    this._setEventListeners();
    this._counterLike();
    return this._element;
  }
  _setEventListeners() {
    this._element
      .querySelector('.element__button-like')
      .addEventListener('click', () => {
        this._like();
        this._counterLike();
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
  _like() {
    // ставим лайки
    this._element
      .querySelector('.element__button-like')
      .classList.toggle('element__button-like_color_black');
      if(this.likes.includes(this._id)) {
      this.likes.pop(this._id);
      }
      else {
      this.likes.push(this._id);
      }

  }

  _counterLike() {
    this._element.querySelector('.element__counter-like')
    .textContent = this.likes.length - 1;
  }

  _zoom(evt) {
    if (evt.target.classList.contains('element__pic')) {
      this._handleCardClick.open(this._text, this._image);
    }
  }

  _remove() {
    // удаление карточек
    this._element.remove();
    this._element = null;
  }
}
