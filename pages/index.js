'use strict';
import { initialCards } from '../utils/array.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { templateFormSelector } from '../utils/templateFormSelector.js';

const popupProfile = document.querySelector('.popup_type_profile'); // попап
const popupCard = document.querySelector('.popup_type_card'); // попап
const popupZoom = document.querySelector('.popup_type_zoom'); // попап

const formProfile = document.forms.formProfile; //форма профиля
const inputName = formProfile.elements.name;
const inputJob = formProfile.elements.job;
const buttonSubmitProfile = formProfile.querySelector('.popup__button-submit');

const formCard = document.forms.formCard; //форма новых картинок
const inputPlace = formCard.elements.place;
const inputCard = formCard.elements.card;
const buttonSubmitCard = formCard.querySelector('.popup__button-submit');

const profileBlock = document.querySelector('.profile'); //блок с кнопками открытия форм.
const profileName = profileBlock.querySelector('.profile__title'); // имя в профиле
const profileJob = profileBlock.querySelector('.profile__subtitle'); // данные профиля
const buttonEdit = profileBlock.querySelector('.profile__edit-button'); //кнопка редактировать
const buttonAdd = profileBlock.querySelector('.profile__add-button'); //кнопка добавить

const containerCards = document.querySelector('.elements'); // контейнер для карточек

const formProfileValidation = new FormValidator(
  templateFormSelector,
  formProfile
);
formProfileValidation.enableValidation();

const formCardValidation = new FormValidator(templateFormSelector, formCard);
formCardValidation.enableValidation();

const addCard = (name, link) => {
  // Создадим экземпляр карточки
  const card = new Card(name, link, '#card', popupZoom);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // Добавляем в DOM
  containerCards.append(cardElement);
};

initialCards.forEach((card) => addCard(card.name, card.link));

const addNewCard = (
  // для новых карточек.
  name,
  link
) => {
  // для новых карточек
  const newCard = new Card(name, link, '#card', popupZoom);
  const cardNewElement = newCard.generateCard();

  // Добавляем в DOM
  containerCards.prepend(cardNewElement);
};

const showProfileForm = () => {
  // открытие формы
  formProfile.reset();
  //получение данных формы профиля
  inputName.placeholder = profileName.textContent;
  inputJob.placeholder = profileJob.textContent;

  setTimeout(() => {
    inputName.focus();
  }, 100); // фокус для проверки инпута

  openPopup(popupProfile);
};

const formRenderProfile = () => {
  // добавление данных
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  closePopup(popupProfile);
};

const showCardForm = () => {
  // открытие формы
  formCard.reset();
  //получение данных формы новых картинок
  inputPlace.value = '';
  inputCard.value = '';

  setTimeout(() => {
    inputPlace.focus();
  }, 100);

  openPopup(popupCard);
};

const formRenderCards = () => {
  addNewCard(inputPlace.value, inputCard.value);
  closePopup(popupCard);
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

export const openPopup = (popup) => {
  popup.classList.add('popup_opened');

  popup.addEventListener('click', closeByPopupButton(popup));
  popup.addEventListener('mousedown', closeByOverlayClick(popup));
  window.addEventListener('keydown', closeByOverlayEsc(popup));
};

export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');

  popup.removeEventListener('click', closeByPopupButton(popup));
  popup.removeEventListener('mousedown', closeByOverlayClick(popup));
  window.removeEventListener('keydown', closeByOverlayEsc(popup));
};

buttonEdit.addEventListener('mousedown', showProfileForm);
buttonAdd.addEventListener('mousedown', showCardForm);
buttonSubmitProfile.addEventListener('click', formRenderProfile);
buttonSubmitCard.addEventListener('click', formRenderCards);
