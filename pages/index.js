'use strict';
import { initialCards } from '../utils/array.js';
import { Card } from '../components/Card.js';
// import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { templateFormSelector } from '../utils/templateFormSelector.js';
import {
  formProfile,
  inputName,
  inputJob,
  buttonSubmitProfile,
  formCard,
  inputPlace,
  inputCard,
  buttonSubmitCard,
  buttonEdit,
  buttonAdd,
  containerCards
 } from '../utils/constants.js';
import Section from '../components/Section.js';
import { PopupWithImage, PopupWithFormProfile, PopupWithFormCard } from '../components/Popup.js';
import { UserInfo } from '../components/UserInfo.js';

 const popupProfile  = new PopupWithFormProfile('.popup_type_profile', formRenderProfile);
 const popupCard = new PopupWithFormCard('.popup_type_card', formRenderCards);
 const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const formProfileValidation = new FormValidator(
  templateFormSelector,
  formProfile
);
formProfileValidation.enableValidation();

const formCardValidation = new FormValidator(templateFormSelector, formCard);
formCardValidation.enableValidation();


const showProfileForm = (evt) => {
  evt.preventDefault();
  // открытие формы
  //получение данных формы профиля
  userInfo.getUserInfo(inputName, inputJob);

  setTimeout(() => {
    inputName.focus();
  }, 100); // фокус для проверки инпута

  popupProfile.open();
};

function formRenderProfile () {
  // добавление данных
  userInfo.setUserInfo(inputName, inputJob);

  popupProfile.close();
}




const showCardForm = () => {
  // открытие формы
  formCard.reset();
  //получение данных формы новых картинок
  inputPlace.value = '';
  inputCard.value = '';

  setTimeout(() => {
    inputPlace.focus();
  }, 100);

  popupCard.open();
};

const section = new Section({data: initialCards, renderer: item => {
  const popupWithImage = new PopupWithImage('.popup_type_zoom');
  const card = new Card(item, '#card', popupWithImage);
  const cardElement = card.generateCard();
  section.addItems(cardElement);
}}, containerCards);

section.renderItems();


// const addNewCard = (
//   // для новых карточек.
//   name,
//   link,
// ) => {
//   // для новых карточек
//   const newCard = new Card({}, '#card', popupWithImage);
//   const cardNewElement = newCard.generateCard();

//   // Добавляем в DOM
//   containerCards.prepend(cardNewElement);
// };

function formRenderCards () {

section.addNewCard(inputPlace.value, inputCard.value);
  
  popupCard.close();
}

buttonEdit.addEventListener('mousedown', showProfileForm);
buttonAdd.addEventListener('mousedown', showCardForm);
// buttonSubmitProfile.addEventListener('click', formRenderProfile);
// buttonSubmitCard.addEventListener('click', formRenderCards);


// const showProfileForm = () => {
//   // открытие формы
//   formProfile.reset();
//   //получение данных формы профиля
//   inputName.placeholder = profileName.textContent;
//   inputJob.placeholder = profileJob.textContent;

//   setTimeout(() => {
//     inputName.focus();
//   }, 100); // фокус для проверки инпута

//   openPopup(popupProfile);
// };

// const formRenderProfile = () => {
//   // добавление данных
//   profileName.textContent = inputName.value;
//   profileJob.textContent = inputJob.value;

//   closePopup(popupProfile);
// };
// const closeByOverlayEsc = (popup) => (evt) => {
  //   if (evt.key === 'Escape' && popup.classList.contains('popup_opened')) {
  //     closePopup(popup);
  //   }
  // };
  
  // const closeByOverlayClick = (popup) => (evt) => {
  //   if (evt.target === popup) {
  //     closePopup(popup);
  //   }
  // };
  
  // const closeByPopupButton = (popup) => (evt) => {
  //   if (evt.target.classList.contains('popup__button-close')) {
  //     closePopup(popup);
  //   }
  // };
  
  // const openPopup = (popup) => {
  //   popup.classList.add('popup_opened');
  
  //   popup.addEventListener('click', closeByPopupButton(popup));
  //   popup.addEventListener('mousedown', closeByOverlayClick(popup));
  //   window.addEventListener('keydown', closeByOverlayEsc(popup));
  // };
  
  // const closePopup = (popup) => {
  //   popup.classList.remove('popup_opened');
  
  //   popup.removeEventListener('click', closeByPopupButton(popup));
  //   popup.removeEventListener('mousedown', closeByOverlayClick(popup));
  //   window.removeEventListener('keydown', closeByOverlayEsc(popup));
  // };