export class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    trashFunction,
    likeFunction,
    idMy
  ) {
    this._text = data[0] || data.name;
    this._image = data[1] || data.link;
    this.likes = data.likes;
    this._id = data._id;
    this._ownerID = data.owner._id;
    this._myId = idMy;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._trashFunction = trashFunction;
    this._likeFunction = likeFunction;
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

    this._title = this._element.querySelector('.element__title');
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
        this._likeFunction(this._id);
      });
    if (this._myId === this._ownerID) {
      this._buttonTrash = this._element.querySelector('.element__button-trash');
      this._buttonTrash.classList.toggle('element__button-trash_hidden');
      this._buttonTrash.addEventListener('click', () => {
        this._remove();
      });
    }
    this._element.addEventListener('click', (evt) => {
      this._zoom(evt);
    });
  }
  _like() {
    // ставим лайки
    this._element
      .querySelector('.element__button-like')
      .classList.toggle('element__button-like_color_black');
  }

  _counterLike() {
    this._element.querySelector(
      '.element__counter-like'
    ).textContent = this.likes.length;
  }

  _zoom(evt) {
    if (evt.target.classList.contains('element__pic')) {
      this._handleCardClick.open(this._text, this._image);
    }
  }

  _remove() {
    if(this._trashFunction(this._id)) {
    // удаление карточек
    this._element.remove();
    this._element = null;
    }
  }
}
