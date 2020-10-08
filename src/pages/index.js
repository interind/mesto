'use strict';
// import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { templateFormSelector } from '../utils/templateFormSelector.js';
import {
  formProfile,
  formCard,
  inputPlace,
  inputCard,
  buttonEdit,
  buttonAdd,
  containerCards,
  infoUser,
} from '../utils/constants.js';
import Section from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

const url = 'https://mesto.nomoreparties.co/v1/cohort-16/';
const token = 'bba27b67-a97d-4fd9-b42d-01c5b1258337';
const userMe = 'users/me';
const newCards = 'cards';

const api = new Api(url, token);

const formProfileValidation = new FormValidator(
  templateFormSelector,
  formProfile
);
formProfileValidation.enableValidation();

const formCardValidation = new FormValidator(templateFormSelector, formCard);
formCardValidation.enableValidation();

const popupWithImage = new PopupWithImage('.popup_type_zoom');
const card = (...arg) => new Card(...arg);

const userInfo = new UserInfo(infoUser);

const formRenderProfile = (...arg) => userInfo.setUserInfo(...arg);

function setInfoCards(items, renderer) {
  api.getParse(items).then((res) => {
    renderer(res[0]);
  });
}

function setInfoUser(items, renderer) {
  api.getParse(items).then((res) => {
    renderer(res);
  });
}
setInfoUser(userMe, formRenderProfile); // проблема прихода массива


setInfoCards(newCards, formRenderCards);

const showProfileForm = userInfo.getUserInfo(); // получение данных профиля со страницы

// получение данных профиля на страницу

const showCardForm = {
  name: inputPlace,
  link: inputCard,
}; // начальный объект для новых карточек

const popupClassProfile = new PopupWithForm(
  '.popup_type_profile',
  showProfileForm,
  formRenderProfile
);
const popupClassCard = new PopupWithForm(
  '.popup_type_card',
  showCardForm,
  formRenderCards
);

function formRenderCards(initialCardValues) {
  // функция для новых карточек
  // Добавление новых карточек
  const section = new Section(
    {
      data: initialCardValues,
      renderer: (item) => {
        const cardElement = card(item, '#card', popupWithImage).generateCard();
        section.addItems(cardElement);
      },
    },
    containerCards
  );

  section.renderItems();
}

function formRenderNewCards(newCardValues) {
  // функция для новых карточек
  // Добавление новых карточек
  const section = new Section(
    {
      data: newCardValues,
      renderer: (item) => {
        const cardElement = card(item, '#card', popupWithImage).generateCard();
        section.addNewItems(cardElement);
      },
    },
    containerCards
  );

  section.renderItems();
}

buttonEdit.addEventListener('mousedown', () => {
  popupClassProfile.open();
});
buttonAdd.addEventListener('mousedown', () => {
  popupClassCard.open();
});
