export class Card {
  constructor(text, image, cardSelector) {
    this._text = text;
    this._image = image;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }
  generateCard(zoom) {
    this._element = this._getTemplate();
    const imageCard = this._element.querySelector('.element__pic');
    imageCard.src = this._image;
    imageCard.atl = this._text;
    this._element.querySelector('.element__title').textContent = this._text;

    this._element
      .querySelector('.element__button-like')
      .addEventListener('click', (evt) => {
        // ставим лайки
        const buttonLike = evt.target;

        buttonLike.classList.toggle('element__button-like_color_black');
      });

    imageCard
      .addEventListener('click', zoom);

    this._element
      .querySelector('.element__button-trash')
      .addEventListener('click', (evt) => {
        // удаление карточек
        const blockCard = evt.target.closest('.element');

        blockCard.remove();
      });

    return this._element;
  }
}
