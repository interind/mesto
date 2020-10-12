'use strict';
// import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { templateFormSelector } from '../utils/templateFormSelector.js';
import {
  configApi,
  idTemplateCard,
  selectorPopupForm,
  profileBlock,
  formAvatar,
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
import { PopupSubmit } from '../components/PopupSubmit.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

// const url = 'https://mesto.nomoreparties.co/v1/cohort-16/';
// const token = 'bba27b67-a97d-4fd9-b42d-01c5b1258337';
// const userMe = 'users/me';
// const newCards = 'cards';
// const myID = '066c34d31720ba2fb9acb601';

const apiCards = new Api(configApi);

const apiProfile = new Api(configApi);

const popupWithImage = new PopupWithImage(selectorPopupForm.zoom);

const card = (...arg) => new Card(...arg);

const userInfo = new UserInfo(infoUser);

const profileServer = (...arg) => userInfo.setUserInfo(...arg);

const avatarServer = (...arg) => userInfo.setUserAvatar(...arg);

function formRenderAvatar(item) {
  // запрос на изменение аватара
  apiProfile.pathAvatarServer(item).then((info) => {
    userInfo.setUserAvatar({ avatar: info[0].avatar });
  });
}

function formRenderProfile(item) {
  // запрос на изменение профиля
  apiProfile.pathProfileServer(item).then((res) => {
    userInfo.setUserInfo(res);
  });
}

const cardLikeServer = (...arg) => apiCards.putLikeServer(...arg);

const cardDeleteLikeServer = (...arg) => apiCards.deleteLikeServer(...arg);

const connectDeleteServer = (...arg) => apiCards.deleteCardServer(...arg);

function setCards(renderer) {
  // запрос на все карточки
  apiCards.getInfoCards()
  .then((res) => {
    renderer(res[0]);
  });
}

function renderCards(item) {
  // запрос на новую карточку
  apiCards.postNewCardServer(item).then((res) => {
    formRenderNewCards(res[0]);
  });
}

function setProfile(rendererInfo, renderAvatar) {
  // получает ответ с сервера
  apiProfile
    .getInfoUser()
    .then((info) => {
      rendererInfo(
        info.map((item) => ({ name: item.name, about: item.about }))
      );
      return info;
    })
    .catch((err) => console.log('Информация о Профиле', err))
    .then((info) => {
      renderAvatar({ avatar: info[0].avatar });
    })
    .catch((err) => console.log('Информация о Аватаре', err));
}

setProfile(profileServer, avatarServer); // получает ответ с сервера

setCards(formRenderCards); // получает ответ с сервера

const showProfileForm = userInfo.getUserInfo(); // получение данных профиля со страницы

const showCardForm = {
  name: inputPlace,
  link: inputCard,
}; // начальный объект для новых карточек

const popupClassFormProfile = new PopupWithForm( // форма новых данных
  selectorPopupForm.profile,
  showProfileForm,
  formRenderProfile
);
const popupClassFormCard = new PopupWithForm( // форма новой карточки
  selectorPopupForm.card,
  showCardForm,
  renderCards
);

const popupClassFormAvatar = new PopupWithForm( // форма аватарки
  selectorPopupForm.avatar,
  inputAvatar,
  formRenderAvatar
);

function trashCard(id, functionRemove) {
  // удаление карточки
  inputId.value = id;
  const popupTrashCard = new PopupSubmit(
    selectorPopupForm.trash,
    inputId,
    connectDeleteServer,
    functionRemove
  );
  popupTrashCard.open();
}

function formRenderCards(initialCardValues) {
  // функция получает данные с сервера

  const section = new Section(
    {
      data: initialCardValues,
      renderer: (item) => {
        const cardElement = card(
          item,
          idTemplateCard,
          popupWithImage,
          trashCard,
          cardLikeServer,
          cardDeleteLikeServer,
          configApi.myID
        ).generateCard();
        section.addItems(cardElement);
      },
    },
    containerCards
  );

  section.renderItems();
}

function formRenderNewCards(initialCard) {
  // добавление новых карточек
  initialCard = new Array(initialCard);
  const section = new Section(
    {
      data: initialCard,
      renderer: (item) => {
        const cardElement = card(
          item,
          idTemplateCard,
          popupWithImage,
          trashCard,
          cardLikeServer,
          cardDeleteLikeServer,
          configApi.myID
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

const formAvatarValidation = new FormValidator( // включение валидации для Аватарки
  templateFormSelector,
  formAvatar
);
formAvatarValidation.enableValidation();

const formCardValidation = new FormValidator(templateFormSelector, formCard);
formCardValidation.enableValidation(); // включение валидации для карточек

buttonEdit.addEventListener('mousedown', () => {
  popupClassFormProfile.open();
});
buttonAdd.addEventListener('mousedown', () => {
  popupClassFormCard.open();
});
profileBlock.querySelector('.profile__avatar').addEventListener('click', () => {
  // открытие попапа с аватаром
  popupClassFormAvatar.open();
});
