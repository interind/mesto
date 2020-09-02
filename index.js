'use strict';

const popupProfile = document.querySelector('.popup_type_profile'); // попап
const popupCard = document.querySelector('.popup_type_card'); // попап
const popupZoom = document.querySelector('.popup_type_zoom'); // попап

const profileForm = document.forms.formProfile; //форма профиля
const inputName = profileForm.elements.name;
const inputJob = profileForm.elements.job;
const buttonSubmit = formProfile.querySelector('.popup__button-submit');

const cardForm = document.forms.formCard; //форма новых картинок
const inputPlace = cardForm.elements.place;
const inputCard = cardForm.elements.card;
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

const clearError = (popup) => {
  const error = popup.querySelectorAll('.popup__input-error');
  
  error.forEach((errorItem) => {
    errorItem.textContent = '';
  });
};

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
    .querySelector('.element__button-like_color_white')
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


const inProfileForm = () => {
  //получение данных формы профиля

  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;

  openPopup(popupProfile);
  
};

const formSubmitHandlerProfile = (evt) => {
  // submit для формы имя и работа
  evt.preventDefault();
  if (inputName.value && inputJob.value) {
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;

    closePopup(popupProfile);
  } else {
    alert('Для сохрания нужно заполнить все поля');
  }
};

const inCardForm = () => {
  //получение данных формы новых картинок

  inputPlace.value = '';
  inputCard.value = '';
  openPopup(popupCard);
  
};

const formSubmitHandlerCards = (evt) => {
  // submit для формы с новой карточкой
  evt.preventDefault();
  if (inputPlace.value && inputCard.value) {
    addCard(inputPlace.value, inputCard.value);
    closePopup(popupCard);
  } else {
    alert('Для сохрания нужно заполнить все поля');
  }
};


function openPopup(popup) {
  if (popup.classList.contains('popup')) {
    popup.classList.add('popup_opened');
    popup.addEventListener('mousedown', closePopup(popup));
    window.addEventListener('keydown', closePopup(popup));
  }
}

const closePopup = (popup) => (evt) => {
  if (
    evt.target.classList.contains('popup__button-close') ||
    evt.target === popup ||
    (evt.key === 'Escape' && popup.classList.contains('popup_opened'))
   || evt.target.classList.contains('popup__button-submit')) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('mousedown', closePopup(popup));
    window.removeEventListener('keydown', closePopup(popup));
    clearError(popup);
  }
};


buttonEdit.addEventListener('mousedown', inProfileForm);
buttonAdd.addEventListener('mousedown', inCardForm);
formProfile.addEventListener('submit', formSubmitHandlerProfile);
formCard.addEventListener('submit', formSubmitHandlerCards);
