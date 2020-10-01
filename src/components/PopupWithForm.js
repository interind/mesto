import Popup from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, infoUser, callbackSubmit) {
    super(popupSelector);
    this._infoUser = infoUser.user;
    this._infoJob = infoUser.job;
    this._infoPlace = infoUser.link;
    this._infoName = infoUser.name;
    this._callbackSubmit = callbackSubmit;
    this._popup = document.querySelector(this._popupSelector);
    this.form = this._popup.querySelector('.popup__container');
    this._inputUser = this.form.elements.name;
    this._inputJob = this.form.elements.job;
    this._inputPlace = this.form.elements.place;
    this._inputCard = this.form.elements.card;
    this.buttonClose = this.form.querySelector('.popup__button-close');
    this.close = this.close.bind(this);
  }
  _setEventListeners() {
    super._setEventListeners();
    this.form.addEventListener('submit', () => {
      this._callbackSubmit(this._getInputValues());
      this.close();
    });

    this.buttonClose.addEventListener('click', this.close);
  }
  open() {
    super.open();
    this.render();
  }
  close() {
    super.close();
    this.form.reset();
    this.buttonClose.removeEventListener('click', this.close);
  }

  _getInputValues() {
    if (this.form.classList.contains('popup__container_type_profile')) {
      return {
        user: this._inputUser.value,
        job: this._inputJob.value,
      };
    } else if (this.form.classList.contains('popup__container_type_card')) {
      return [
        {
          name: this._inputPlace.value,
          link: this._inputCard.value,
        },
      ];
    }
  }

  render() {
    setTimeout(() => (this._inputUser || this._inputPlace).focus(), 100);
    if (this.form.classList.contains('popup__container_type_profile')) {
      this._inputUser.value = this._infoUser.textContent;
      this._inputJob.value = this._infoJob.textContent;
    } else if (this.form.classList.contains('popup__container_type_card')) {
      this._inputPlace.value = this._infoPlace.textContent;
      this._inputCard.value = this._infoName.textContent;
    }
  }

  _handleEscClose(evt) {
    super._handleEscClose(evt);
  }
}
