export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    // возвращает какрту
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }
  _toggleLike() {
    this._cardSelector
      .querySelector('.element__button-like')
      .addEventListener('click', (evt) => {
        // ставим лайки
        const buttonLike = evt.target;

        buttonLike.classList.toggle('element__button-like_color_black');
      });
  }
  _removeCard() {
    this._cardSelector
      .querySelector('.element__button-trash')
      .addEventListener('click', (evt) => {
        // удаление карточек
        const blockCard = evt.target.closest('.element');

        blockCard.remove();
      });
  }
}
