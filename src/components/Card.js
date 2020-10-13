export class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleDeleteCardClick,
    handleLikeCardClick,
    disLikesRequest,
    idMy
  ) {
    this._text = data.place || data.name;
    this._image = data.card || data.link;
    this.likes = data.likes;
    this._id = data._id;
    this._ownerID = data.owner;
    this._myId = idMy;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick.bind(this);
    this._handleLikeCardClick = handleLikeCardClick;
    this._disLikesRequest = disLikesRequest;
    this.remove = this.remove.bind(this);
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
    this._searchElement(this._element);
    this._setEventListeners();
    this._counterLike();
    return this._element;
  }

  _searchElement() {
    // поиск нескольких элементов.
    this._buttonTrash = this._element.querySelector('.element__button-trash');
    this._buttonLike = this._element.querySelector('.element__button-like');
    this._buttonLike.title = this._ownerID.name;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._setLike();
    });
    if (this._myId === this._ownerID._id) {
      // проверка есть ли мои лайки
      this._buttonTrash.classList.toggle('element__button-trash_hidden');
      this._buttonTrash.addEventListener('click', () => {
        this._handleDeleteCardClick(this._id, this._element);
      });
    }
    this._element.addEventListener('click', (evt) => {
      this._zoom(evt);
    });
  }
  _setLike() {
    // ставим лайки
    if (
      this.likes.find((key) => key._id === this._myId) ||
      this._buttonLike.classList.contains('element__button-like_color_black')
    ) {
      this._buttonLike.classList.remove('element__button-like_color_black');
      this.likes.pop(this._myId);
      this._disLikesRequest(this._id);
      this._counterLike();
    } else {
      this._buttonLike.classList.add('element__button-like_color_black');
      this.likes.push(this._myId);
      this._handleLikeCardClick(this._id);
      this._counterLike();
    }
  }

  _counterLike() {
    // собирает информацию по лайкам
    this._element.querySelector(
      '.element__counter-like'
    ).textContent = this.likes.length;
    if (this.likes.find((key) => key._id === this._myId)) {
      this._buttonLike.classList.add('element__button-like_color_black');
    }
  }

  _zoom(evt) {
    if (evt.target.classList.contains('element__pic')) {
      this._handleCardClick.open(this._text, this._image);
    }
  }

  remove() {
    this._element.remove();
    this._element = null;
  }
}
