import { imagesCheck } from '../utils/utils';

export class Card {
  constructor(
    data,
    idTemplateCard,
    handleCardClick,
    {
      handleDeleteCardClick,
      handleLikeCardClick,
    },
    idMy
  ) {
    this._cardElement = document.querySelector(idTemplateCard).content;
    this._text = data.name;
    this._image = data.link;
    this.likes = data.likes;
    this._id = data._id;
    this._ownerID = data.owner;
    this._myId = idMy;
    this._handleCardClick = handleCardClick;
    this.handleDeleteCardClick = handleDeleteCardClick.bind(this);
    this.handleLikeCardClick = handleLikeCardClick.bind(this);
    this.remove = this.remove.bind(this);
    this._element = this._cardElement.querySelector('.element').cloneNode(true);
    this._imageCard = this._element.querySelector('.element__pic');
    this._title = this._element.querySelector('.element__title');
    this._buttonTrash = this._element.querySelector('.element__button-trash');
    this._buttonLike = this._element.querySelector('.element__button-like');
    this._counter = this._element.querySelector('.element__counter-like');
    this.isLiked = this.isLiked.bind(this);
  }

  generateCard() {
    this._element.id = this._ownerID._id;
    this._element.cardId = this._id;
    imagesCheck(this._image)
      .then((link) => this._imageCard.src = link)
      .catch((err) => this._imageCard.src = err);
    this._imageCard.alt = this._text;
    this._imageCard.title = this._ownerID.name;
    this._title.textContent = this._text;
    this._title.title = this._title.textContent;
    this._setEventListeners();
    this.updateLikes();
    return this._element;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', this.handleLikeCardClick);

    if (this._myId === this._ownerID._id) {
      // проверка есть ли мои лайки
      this._buttonTrash.classList.toggle('element__button-trash_hidden');
      this._buttonTrash.addEventListener('click', this.handleDeleteCardClick);
    }
    this._element.addEventListener('click', (evt) => {
      this._zoom(evt);
    });
  }
  setLike(data) {
    this.likes = data.likes;
    this.updateLikes();
  }

  isLiked() {
    return !!this.likes.find((key) => key._id === this._myId)
  }

  updateLikes() {
    this._counterLike();
    if (this.isLiked()) {
      this._buttonLike.classList.add('element__button-like_color_black');
    } else {
      this._buttonLike.classList.remove('element__button-like_color_black');
    }

  }

  _counterLike() {
    // собирает информацию по лайкам
    this._counter.title = this.likes.map((like) => like.name);
    this._counter.textContent = this.likes.length;
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
