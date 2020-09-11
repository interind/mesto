'use strict';
import { initialCards } from '../utils/array.js';
import { Card } from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
(function () {
  const popup = document.querySelectorAll('.popup');
  const popupProfile = document.querySelector('.popup_type_profile'); // попап
  const popupCard = document.querySelector('.popup_type_card'); // попап
  const popupZoom = document.querySelector('.popup_type_zoom'); // попап

  const formProfile = document.forms.formProfile; //форма профиля
  const inputName = formProfile.elements.name;
  const inputJob = formProfile.elements.job;


  const formCard = document.forms.formCard; //форма новых картинок
  const inputPlace = formCard.elements.place;
  const inputCard = formCard.elements.card;


  const profileBlock = document.querySelector('.profile'); //блок с кнопками открытия форм.
  const profileName = profileBlock.querySelector('.profile__title'); // имя в профиле
  const profileJob = profileBlock.querySelector('.profile__subtitle'); // данные профиля
  const buttonEdit = profileBlock.querySelector('.profile__edit-button'); //кнопка редактировать
  const buttonAdd = profileBlock.querySelector('.profile__add-button'); //кнопка добавить

  const zoomCard = popupZoom.querySelector('.popup__zoom'); // блок показа картинки
  const zoomPic = zoomCard.querySelector('.popup__pic');
  const zoomPlacePic = zoomCard.querySelector('.popup__place-pic');

  const containerCards = document.querySelector('.elements'); // контейнер для карточек

  const formProfileValidation = new FormValidator(
      {
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button-submit',
      inactiveButtonClass: 'popup__button-submit_disabled',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__input-error_active'}
  );
  formProfileValidation.enableValidation(formProfile);
  const formCardValidation = new FormValidator(
    {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'}
);
formCardValidation.enableValidation(formCard);
  
 
  

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

  const addCard = (name, link) => {
    // Создадим экземпляр карточки
    const card = new Card(name, link, '#card', zoom);
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();

    // Добавляем в DOM
    containerCards.prepend(cardElement);
  };

  const initialCardsRevers = initialCards.reverse(); // для добавления карточек по порядку

  initialCardsRevers.forEach((card) => addCard(card.name, card.link));

  const showProfileForm = () => {
    formProfile.reset();
    clearError(formProfile);
    //получение данных формы профиля
    inputName.placeholder = profileName.textContent;
    inputJob.placeholder = profileJob.textContent;
    setTimeout(() => {
      inputName.focus();
    }, 100); // фокус для проверки инпута
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
    clearError(formCard);
    //получение данных формы новых картинок
    inputPlace.value = '';
    inputCard.value = '';
    setTimeout(() => {
      inputPlace.focus();
    }, 100);
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
  const clearError = (form) => {
    // очистка ошибок
    const error = form.querySelectorAll('.popup__input-error');
  
    error.forEach((errorItem) => {
      errorItem.textContent = '';
    });
  };

  buttonEdit.addEventListener('mousedown', showProfileForm);
  buttonAdd.addEventListener('mousedown', showCardForm);
  formProfile.addEventListener('submit', formSubmitHandlerProfile);
  formCard.addEventListener('submit', formSubmitHandlerCards);
})();
