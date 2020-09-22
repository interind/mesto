'use strict';
import { initialCards } from '../utils/array.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { templateFormSelector } from '../utils/templateFormSelector.js';
import {
  popupProfile,
  popupCard,
  formProfile,
  inputName,
  inputJob,
  buttonSubmitProfile,
  formCard,
  inputPlace,
  inputCard,
  buttonSubmitCard,
  profileName,
  profileJob,
  buttonEdit,
  buttonAdd,
  containerCards,
} from '../utils/constants.js';

const formProfileValidation = new FormValidator(
  templateFormSelector,
  formProfile
);
formProfileValidation.enableValidation();

const formCardValidation = new FormValidator(templateFormSelector, formCard);
formCardValidation.enableValidation();

function showProfileForm() {
  // открытие формы
  formProfile.reset();
  //получение данных формы профиля
  inputName.placeholder = profileName.textContent;
  inputJob.placeholder = profileJob.textContent;
 
  setTimeout(() => {
    inputName.focus();
  }, 100); // фокус для проверки инпута

  openPopup(popupProfile);
}

function formRenderProfile() {
  // добавление данных
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  closePopup(popupProfile);
}

function showCardForm() {
  // открытие формы
  formCard.reset();
  //получение данных формы новых картинок
  inputPlace.value = '';
  inputCard.value = '';

  setTimeout(() => {
    inputPlace.focus();
  }, 100);

  openPopup(popupCard);
}

function formRenderCards() {
  addNewCard(inputPlace.value, inputCard.value);
  closePopup(popupCard);
}

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

function openPopup(popup) {
  popup.classList.add('popup_opened');

  popup.addEventListener('click', closeByPopupButton(popup));
  popup.addEventListener('mousedown', closeByOverlayClick(popup));
  window.addEventListener('keydown', closeByOverlayEsc(popup));
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  popup.removeEventListener('click', closeByPopupButton(popup));
  popup.removeEventListener('mousedown', closeByOverlayClick(popup));
  window.removeEventListener('keydown', closeByOverlayEsc(popup));
}

const addCard = (name, link) => {
  // Создадим экземпляр карточки
  const card = new Card(name, link, '#card', openPopup);
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
  const newCard = new Card(name, link, '#card', openPopup);
  const cardNewElement = newCard.generateCard();

  // Добавляем в DOM
  containerCards.prepend(cardNewElement);
};

buttonEdit.addEventListener('mousedown', showProfileForm);
buttonAdd.addEventListener('mousedown', showCardForm);
buttonSubmitProfile.addEventListener('click', formRenderProfile);
buttonSubmitCard.addEventListener('click', formRenderCards);