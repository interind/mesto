'use strict';
// import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { templateFormSelector } from '../utils/templateFormSelector.js';
import {
  profileBlock,
  inputAvatar,
  formProfile,
  formCard,
  inputPlace,
  inputCard,
  buttonEdit,
  buttonAdd,
  containerCards,
  infoUser,
  inputId,
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
const myID = '066c34d31720ba2fb9acb601';

const apiCards = new Api(url, token, newCards);

const apiProfile = new Api(url, token, userMe);

const popupWithImage = new PopupWithImage('.popup_type_zoom');
const card = (...arg) => new Card(...arg);

const userInfo = new UserInfo(infoUser);

const profileServer = (...arg) => userInfo.setUserInfo(...arg);

const avatarServer = (...arg) => userInfo.setUserAvatar(...arg);

async function formRenderAvatar(item) {
  await apiProfile.pathAvatarServer(item)
  .then((info) => {
    userInfo.setUserAvatar(info[0].avatar);
  });
}

async function formRenderProfile(item) {
  await apiProfile.pathProfileServer(item)
  .then((res) => {
    userInfo.setUserInfo(res);
  });
}

const cardLikeServer = (...arg) => apiCards.putLikeServer(...arg);

const cardDeleteLikeServer = (...arg) => apiCards.deleteLikeServer(...arg);

async function connectDeleteServer(item){ // ответ про удаление
  await apiCards.deleteCardServer(item)
    .then((res) => {
    trashCard(res[0].message);
    });
}

async function setCards(renderer) {
  await apiCards.getInfoServer().then((res) => {
    renderer(res[0]);
  });
}

async function renderCards(item) {
  await apiCards.postNewCardServer(item)
  .then((res) => {
    formRenderNewCards(res[0]);
  });
}

function setUser(renderer) {
  apiProfile.getInfoServer().then((res) => {
    renderer(res.map((item) => ({ name: item.name, about: item.about })));
  });
}
function setAvatar(renderer) {
  apiProfile.getInfoServer().then((info) => {
    renderer(info[0].avatar);
  });
}

setUser(profileServer);

setAvatar(avatarServer);

setCards(formRenderCards);

const showProfileForm = userInfo.getUserInfo(); // получение данных профиля со страницы

// получение данных профиля на страницу

const showCardForm = {
  name: inputPlace,
  link: inputCard,
}; // начальный объект для новых карточек

const popupClassFormProfile = new PopupWithForm(
  '.popup_type_profile',
  showProfileForm,
  formRenderProfile
);
const popupClassFormCard = new PopupWithForm(
  '.popup_type_card',
  showCardForm,
  renderCards
);

const popupClassFormAvatar = new PopupWithForm(
  '.popup_type_avatar',
  inputAvatar,
  formRenderAvatar
);

const popupTrashCard = new PopupWithForm(
  '.popup_type_trash',
  inputId,
  connectDeleteServer
);

function trashCard(id) {
  if(id !== 'Пост удалён'){
  popupTrashCard.open();
  inputId.value = id;
  }
  else{
  window.location.reload();
  }
}

function formRenderCards(initialCardValues) {
  // функция получает данные с сервера
  // функция для новых карточек
  // Добавление новых карточек
  const section = new Section(
    {
      data: initialCardValues,
      renderer: (item) => {
        const cardElement = card(
          item,
          '#card',
          popupWithImage,
          trashCard,
          cardLikeServer,
          cardDeleteLikeServer,
          myID
        ).generateCard();
        section.addItems(cardElement);
      },
    },
    containerCards
  );

  section.renderItems();
}

function formRenderNewCards(initialCard) {
  
  initialCard = new Array(initialCard);
  const section = new Section(
    {
      data: initialCard,
      renderer: (item) => {
        const cardElement = card(
          item,
          '#card',
          popupWithImage,
          trashCard,
          cardLikeServer,
          cardDeleteLikeServer,
          myID
        ).generateCard();
        section.addNewItems(cardElement);
      },
    },
    containerCards
  );
  section.renderItems();
}

const formProfileValidation = new FormValidator(
  templateFormSelector,
  formProfile
);
formProfileValidation.enableValidation(); // включение валидации для профиля

const formCardValidation = new FormValidator(templateFormSelector, formCard);
formCardValidation.enableValidation(); // включение валидации для карточек

buttonEdit.addEventListener('mousedown', () => {
  popupClassFormProfile.open();
});
buttonAdd.addEventListener('mousedown', () => {
  popupClassFormCard.open();
});
profileBlock.querySelector('.profile__avatar').addEventListener('click', () => {
  popupClassFormAvatar.open();
});