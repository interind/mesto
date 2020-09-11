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
    this._setListener();
    return this._element;
  }
  _setListener() {
    this._element
      .querySelector('.element__button-like')
      .addEventListener('click', this._like);
    this._element
      .querySelector('.element__button-trash')
      .addEventListener('click', 
        this._remove);
      this._element.addEventListener('click', this._popup);
  }
  _like = (evt) => {
    // ставим лайки
    evt.target.classList.toggle('element__button-like_color_black');
  }

  _remove = () => {
    // удаление карточек
    this._element.remove();
  }
}
