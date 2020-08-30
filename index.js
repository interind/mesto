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

const zoom = (evt) => {
  // функция для открытия картинок
  const cardImage = evt.target;
  if (cardImage.classList.contains('element__pic')) {
    zoomPlacePic.textContent = zoomPic.alt;
    zoomPic.src = cardImage.src;
    zoomPlacePic.textContent = cardImage.alt;
    togglePopup(popupZoom);
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




const togglePopup = (popupItem) => {
  // закрытие и открытие попапа и блока какой попадет
  if (popupItem === popupZoom) {
    popupItem.classList.toggle('popup_opened');
    closePopup(popupItem);
    popupItem.style.backgroundColor = 'rgba(0, 0, 0, .9)';
    popupItem.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
        evt.target.classList.remove('popup_opened');
        evt.target.removeEventListener('mousedown', evt);
      }
    });

    popupItem
      .querySelector('.popup__button-close')
      .addEventListener('click', (evt) => {
        evt.target.parentNode.closest('.popup_opened');
        popupItem.style.backgroundColor = 'rgba(0, 0, 0, .6)';

        popupItem.classList.remove('popup_opened');
        popupItem.removeEventListener('click', evt);
      });
  } else {
    popupItem.classList.toggle('popup_opened');
 
    closePopup(popupItem);
    popupItem.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
        evt.target.classList.remove('popup_opened');
        evt.target.removeEventListener('mousedown', evt);
        // formItem.removeEventListener('submit', formSubmit);
        clearError();
      }
    });

    popupItem
      .querySelector('.popup__button-close')
      .addEventListener('click', (evt) => {
        evt.target.parentNode.closest('.popup_opened');

        popupItem.classList.remove('popup_opened');
        popupItem.removeEventListener('click', evt);
        // formItem.removeEventListener('submit', formSubmit);
        clearError();
      });
  }
};

const windowEsc = (popupItem) => (evt) => {
  if (evt.key === 'Escape' && popupItem.classList.contains('popup_opened')) {
    popupItem.classList.remove('popup_opened');

    window.removeEventListener('keydown', windowEsc);
  }
};
const closePopup = (popupItem) => {
  window.addEventListener('keydown', windowEsc(popupItem));
  clearError();
};

const clearError = () => {
  // чистка старых данных и ошибочных аттрибутов

  if (buttonSubmit.classList.contains('popup__button-submit_disabled')) {
    buttonSubmit.classList.remove('popup__button-submit_disabled');
    buttonSubmit.removeAttribute('disabled');
  } else if (
    !buttonSubmitCard.classList.contains('popup__button-submit_disabled')
  ) {
    buttonSubmitCard.classList.add('popup__button-submit_disabled');
    buttonSubmitCard.setAttribute('disabled', true);
  }
  const error = Array.from(document.querySelectorAll('.popup__input-error'));
  error.forEach((errorItem) => {
    errorItem.textContent = '';
  });
};

const inProfileForm = () => {
  //получение данных формы профиля
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;

  togglePopup(popupProfile);
};

const formSubmitHandlerProfile = (evt) => {
  // submit для формы имя и работа
  evt.preventDefault();
  if (inputName.value && inputJob.value) {
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    togglePopup(popupProfile);
  } else {
    alert('Для сохрания нужно заполнить все поля');
  }
};

const inCardForm = () => {
  //получение данных формы новых картинок
  inputPlace.value = '';
  inputCard.value = '';
  togglePopup(popupCard);
  
};

const formSubmitHandlerCards = (evt) => {
  // submit для формы с новой карточкой
  evt.preventDefault();
  if (inputPlace.value && inputCard.value) {
    addCard(inputPlace.value, inputCard.value);
    togglePopup(popupCard);
  } else {
    alert('Для сохрания нужно заполнить все поля');
  }
};

buttonEdit.addEventListener('mousedown', inProfileForm);
buttonAdd.addEventListener('mousedown', inCardForm);
formProfile.addEventListener('submit', formSubmitHandlerProfile);
formCard.addEventListener('submit', formSubmitHandlerCards);
