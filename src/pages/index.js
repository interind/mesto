'use strict';
import Section from '../components/Section.js';
import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { UserInfo } from '../components/UserInfo.js';
import { visualSubmit } from '../utils/utils.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupSubmit } from '../components/PopupSubmit.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { templateFormSelector } from '../utils/templateFormSelector.js';
import {
  userMe,
  loader,
  newCards,
  formCard,
  inputJob,
  configApi,
  addAvatar,
  buttonAdd,
  inputName,
  formAvatar,
  inputPlace,
  buttonEdit,
  formProfile,
  inputAvatar,
  selectorUser,
  containerCards,
  idTemplateCard,
  buttonSubmitCard,
  selectorPopupForm,
  buttonSubmitAvatar,
  buttonSubmitProfile,
} from '../utils/constants.js';
import './index.css';

const api = new Api(configApi, userMe, newCards);
const popupWithImage = new PopupWithImage(selectorPopupForm.zoom);
const userInfo = new UserInfo(selectorUser);
const setUserInfo = (...arg) => userInfo.setUserInfo(...arg);

function toggleLoader(bool) {
  bool ? loader.classList.remove('loader_hidden') : loader.classList.add('loader_hidden');
}
function formRenderAvatar(item) {
  // запрос на изменение аватара
  visualSubmit(buttonSubmitAvatar);
  api
    .updateUserAvatar(item)
    .then((info) => {
      userInfo.setUserInfo(info);
      popupClassFormAvatar.close();
    })
    .catch((err) => console.log('Ошибка в данных профиля', err))
    .finally(() => visualSubmit(buttonSubmitAvatar));
}

function formRenderProfile(item) {
  // запрос на изменение профиля
  visualSubmit(buttonSubmitProfile);
  api
    .updateUserInfo(item)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupClassFormProfile.close();
    })
    .catch((err) => console.log('Ошибка в данных профиля', err))
    .finally(() => visualSubmit(buttonSubmitProfile));
}

const showProfileForm = userInfo.getUserInfo(); // получение данных профиля со страницы


const popupClassFormProfile = new PopupWithForm( // форма новых данных
  selectorPopupForm.profile,
  formRenderProfile
);
const popupClassFormCard = new PopupWithForm( // форма новой карточки
  selectorPopupForm.card,
  renderCards
);

const popupClassFormAvatar = new PopupWithForm( // форма аватарки
  selectorPopupForm.avatar,
  formRenderAvatar
);

const myId = null;
const createSection = new Section({renderer: (data) => createSection.addItem(createCards(data), false)}, containerCards);

const handleDeleteCardClick = (card) => {
  const removalCard = (evt) => {
    evt.preventDefault();
    api
      .deleteCard(card.cardId)
      .then(() => {
        card.remove();
      })
      .catch((err) => console.log('Карточка осталась', err))
      .finally(() => popupSubmitDeleteCard.close());
  };
  const popupSubmitDeleteCard = new PopupSubmit(
    removalCard,
    selectorPopupForm.trash
  );
  popupSubmitDeleteCard.open();
};

function createCards(item) {
  const card = new Card(
    item,
    idTemplateCard,
    popupWithImage,
    {
      handleDeleteCardClick: () => handleDeleteCardClick(card.generateCard()),
      handleLikeCardClick: () => {
        api.handleLikeCardClick(card._id, card.isLiked())
          .then((data) => card.setLike(data))
          .catch((err) => console.log(err));
      },
      myId: userInfo.getID,
    },
  );
  return card.generateCard();
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

function editInfoUser() {
  inputName.value = showProfileForm.name.textContent;
  inputJob.value = showProfileForm.about.textContent;
  setTimeout(() => inputName.focus(), 100);
  popupClassFormProfile.open();
}
function addPlaceCard() {
  setTimeout(() => inputPlace.focus(), 100);
  popupClassFormCard.open();
}

function editAvatarLink() {
  setTimeout(() => inputAvatar.focus(), 100);
  popupClassFormAvatar.open();
}

function renderCards(item) {
  // запрос на новую карточку
  visualSubmit(buttonSubmitCard);
  toggleLoader(true);
  api.addCard(item)
    .then((res) => {
      createSection.addItem(createCards(res), true);
      popupClassFormCard.close();
    })
    .catch((err) => console.log('Что то с добавлением карточки', err))
    .finally(() => {
      visualSubmit(buttonSubmitCard)
      toggleLoader(false);
    });
}
function setInfoAll() {
  toggleLoader(true)
  Promise.all([api.getInfoUser(), api.getInfoCards()])
    .then(([users, cards]) => {
      setUserInfo(users);
      createSection.renderItems(cards);
    })
    .catch((err) => console.log('Данные с ошибкой', err))
    .finally(() => toggleLoader(false));
}

setInfoAll(); // получает ответ с сервера

buttonEdit.addEventListener('mousedown', editInfoUser);
buttonAdd.addEventListener('mousedown', addPlaceCard);
addAvatar.addEventListener('click', editAvatarLink);
