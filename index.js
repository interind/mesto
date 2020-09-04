'use strict';

const popupProfile = document.querySelector('.popup_type_profile'); // попап
const popupCard = document.querySelector('.popup_type_card'); // попап
const popupZoom = document.querySelector('.popup_type_zoom'); // попап

const formProfile = document.forms.formProfile; //форма профиля
const inputName = formProfile.elements.name;
const inputJob = formProfile.elements.job;
const inputListProfile = Array.from(
  formProfile.querySelectorAll('.popup__input')
);
const buttonSubmitProfile = formProfile.querySelector('.popup__button-submit');


const formCard = document.forms.formCard; //форма новых картинок
const inputPlace = formCard.elements.place;
const inputCard = formCard.elements.card;
const inputListCard = Array.from(formCard.querySelectorAll('.popup__input'));
const buttonSubmitCard = formCard.querySelector('.popup__button-submit');

const profileBlock = document.querySelector('.profile'); //блок с кнопками открытия форм.
const profileName = profileBlock.querySelector('.profile__title'); // имя в профиле
const profileJob = profileBlock.querySelector('.profile__subtitle'); // данные профиля
const buttonEdit = profileBlock.querySelector('.profile__edit-button'); //кнопка редактировать
const buttonAdd = profileBlock.querySelector('.profile__add-button'); //кнопка добавить

const zoomCard = popupZoom.querySelector('.popup__zoom'); // блок показа картинки
const zoomPic = zoomCard.querySelector('.popup__pic');
const zoomPlacePic = zoomCard.querySelector('.popup__place-pic');

const containerCards = document.querySelector('.elements'); // контейнер для карточек
const templateContainer = document.querySelector('#cards').content;

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
});

const zoom = (evt) => {
  // функция для открытия картинок
  const cardImage = evt.target;
  if (cardImage.classList.contains('element__pic')) {
    zoomPlacePic.textContent = zoomPic.alt;
    zoomPic.src = cardImage.src;
    zoomPlacePic.textContent = cardImage.alt;
    openPopup(popupZoom);
  }
};

const createCard = (name, link) => {
  // создание новых карточек

  const containerCard = templateContainer.cloneNode(true);

  const imageCard = containerCard.querySelector('.element__pic');
  imageCard.src = link;
  imageCard.alt = name;
  containerCard.querySelector('.element__title').textContent = name;

  containerCard
    .querySelector('.element__button-like')
    .addEventListener('click', (evt) => {
      // ставим лайки
      const buttonLike = evt.target;

      buttonLike.classList.toggle('element__button-like_color_black');
    });

  containerCard
    .querySelector('.element__button-trash')
    .addEventListener('click', (evt) => {
      // удаление карточек
      const blockCard = evt.target.closest('.element');

      blockCard.remove();
    });

  containerCard.querySelector('.element__pic').addEventListener('click', zoom);

  return containerCard;
};

const addCard = (name, link) => {
  // добавление карточек
  containerCards.prepend(createCard(name, link));
};

const initialCardsRevers = initialCards.reverse(); // для добавления карточек по порядку
initialCardsRevers.forEach((card) => addCard(card.name, card.link));

const clearError = (popup) => {
  const error = popup.querySelectorAll('.popup__input-error');

  error.forEach((errorItem) => {
    errorItem.textContent = '';
  });
};

const showProfileForm = () => {
  formProfile.reset();

  const buttonElement = buttonSubmitProfile;
  const inputList = inputListProfile;
  const inactiveButtonClass = 'popup__button-submit_disabled';
  clearError(popupProfile);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  //получение данных формы профиля
  inputName.placeholder = profileName.textContent;
  inputJob.placeholder = profileJob.textContent;

  openPopup(popupProfile);
};

const formSubmitHandlerProfile = (evt) => {
  // submit для формы имя и работа
  evt.preventDefault();

  if (inputName.checkValidity() && inputJob.checkValidity()) {
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;

    closePopup(popupProfile);
  } else {
    alert('Для сохрания нужно заполнить все поля');
  }
};

const showCardForm = () => {
  formCard.reset();

  const buttonElement = buttonSubmitCard;
  const inputList = inputListCard;
  const inactiveButtonClass = 'popup__button-submit_disabled';

  clearError(popupCard);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  //получение данных формы новых картинок
  inputPlace.value = '';
  inputCard.value = '';

  openPopup(popupCard);
};

const formSubmitHandlerCards = (evt) => {
  // submit для формы с новой карточкой
  evt.preventDefault();

  if (inputPlace.checkValidity() && inputCard.checkValidity()) {
    addCard(inputPlace.value, inputCard.value);
    closePopup(popupCard);
  } else {
    alert('Для сохрания нужно заполнить все поля');
  }
};

const closeByOverlayEsc = (popup) => (evt) => {
  if (evt.key === 'Escape' && popup.classList.contains('popup_opened')) {
    closePopup(popup);
  }
};

const closeByOverlayClick = (popup) => (evt) => {
  if (evt.target === popup) {
    closePopup(popup);
  }
};

const closeByPopupButton = (popup) => (evt) => {
  if (evt.target.classList.contains('popup__button-close')) {
    closePopup(popup);
  }
};
const openPopup = (popup) => {
  popup.classList.add('popup_opened');

  popup.addEventListener('click', closeByPopupButton(popup));
  popup.addEventListener('mousedown', closeByOverlayClick(popup));
  window.addEventListener('keydown', closeByOverlayEsc(popup));
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');

  popup.removeEventListener('click', closeByPopupButton(popup));
  popup.removeEventListener('mousedown', closeByOverlayClick(popup));
  window.removeEventListener('keydown', closeByOverlayEsc(popup));
};

buttonEdit.addEventListener('mousedown', showProfileForm);
buttonAdd.addEventListener('mousedown', showCardForm);
formProfile.addEventListener('submit', formSubmitHandlerProfile);
formCard.addEventListener('submit', formSubmitHandlerCards);
