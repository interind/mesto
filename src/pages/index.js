'use strict';
import './index.css';
import { initialCards } from '../utils/array.js';
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

const formProfileValidation = new FormValidator(
  templateFormSelector,
  formProfile
);
formProfileValidation.enableValidation();

const formCardValidation = new FormValidator(templateFormSelector, formCard);
formCardValidation.enableValidation();

const popupWithImage = new PopupWithImage('.popup_type_zoom');
const card = (...arg) => new Card(...arg);

const section = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const cardElement = card(item, '#card', popupWithImage).generateCard();
      section.addItems(cardElement);
    },
  },
  containerCards
);

section.renderItems(); // отображение массива карточек

const userInfo = new UserInfo(infoUser);

const showProfileForm = userInfo.getUserInfo();

const formRenderProfile = (...arg) => userInfo.setUserInfo(...arg);

const showCardForm = {
  name: inputPlace,
  link: inputCard,
};

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

function formRenderCards(newCardValues) {
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
