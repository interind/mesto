'use strict';
import './pages/index.css';
import { initialCards } from './utils/array.js';
import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import { templateFormSelector } from './utils/templateFormSelector.js';
import {
  popupProfile,
  popupCard,
  popupZoom,
  formProfile,
  inputName,
  inputJob,
  formCard,
  inputPlace,
  inputCard,
  buttonEdit,
  buttonAdd,
  containerCards,
} from './utils/constants.js';
import Section from './components/Section.js';
import {
  PopupWithImage,
} from './components/PopupWithImage.js';
import {
  PopupWithFormCard,
} from './components/PopupWithFormCard.js';
import {
  PopupWithFormProfile,
} from './components/PopupWithFormProfile.js';
import { UserInfo } from './components/UserInfo.js';

const section = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const popupWithImage = new PopupWithImage(popupZoom);
      const card = new Card(item, '#card', popupWithImage);
      const cardElement = card.generateCard();
      section.addItems(cardElement);
    },
  },
  containerCards
);

section.renderItems(); // отображение массива карточек 

const popupClassProfile = new PopupWithFormProfile(
  popupProfile,
  showProfileForm,
  formRenderProfile
);
const popupClassCard = new PopupWithFormCard(
  popupCard,
  showCardForm,
  formRenderCards
);
const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const formProfileValidation = new FormValidator(
  templateFormSelector,
  formProfile
);
formProfileValidation.enableValidation();

const formCardValidation = new FormValidator(templateFormSelector, formCard);
formCardValidation.enableValidation();

function showProfileForm() {
  // открытие формы
  //получение данных формы профиля
  userInfo.getUserInfo(inputName, inputJob);

  setTimeout(() => {
    inputName.focus();
  }, 100); // фокус для проверки инпута
}

function formRenderProfile() {
  // добавление данных
  userInfo.setUserInfo(inputName, inputJob);
}

function formRenderCards() { // Добавление новых карточек
  const newCardValues = [
    {
      name: `${inputPlace.value}`,
      link: `${inputCard.value}`,
    },
  ];
  const section = new Section(
    {
      data: newCardValues,
      renderer: item => {
        const popupWithImage = new PopupWithImage(popupZoom);
        const card = new Card(item, '#card', popupWithImage);
        const cardElement = card.generateCard();
        section.addNewItems(cardElement);
      },
    },
    containerCards
  );

  section.renderItems();
}

function showCardForm() {
  // открытие формы
  //получение данных формы новых картинок
  inputPlace.value = '';
  inputCard.value = '';

  setTimeout(() => {
    inputPlace.focus();
  }, 100);
}



buttonEdit.addEventListener('mousedown', () => {
  popupClassProfile.open();
});
buttonAdd.addEventListener('mousedown', () => {
  popupClassCard.open();
});
