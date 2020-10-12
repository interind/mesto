'use strict';
import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { templateFormSelector } from '../utils/templateFormSelector.js';
import { visualSubmit } from '../utils/utils.js';
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
  selectorUser,
  inputId,
  buttonSubmitProfile,
  buttonSubmitCard,
  buttonSubmitAvatar,
  inputName,
  inputJob,
} from '../utils/constants.js';
import Section from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupSubmit } from '../components/PopupSubmit.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

const apiCards = new Api(configApi);

const apiProfile = new Api(configApi);

const popupWithImage = new PopupWithImage(selectorPopupForm.zoom);

const createCard = (...arg) => new Card(...arg);

const userInfo = new UserInfo(selectorUser);

const setUserInfo = (...arg) => userInfo.setUserInfo(...arg);

function formRenderAvatar(item) {
  // запрос на изменение аватара
  visualSubmit(buttonSubmitAvatar);
  apiProfile
    .updateUserAvatar(item)
    .then((response) => response.json())
    .then((res) => JSON.parse(JSON.stringify(res)))
    .then((info) => {
      userInfo.setUserInfo(info);
    })
    .finally(() => visualSubmit(buttonSubmitAvatar))
    .catch((err) => console.log('Ошибка в данных профиля', err));
}

function formRenderProfile(item) {
  // запрос на изменение профиля
  visualSubmit(buttonSubmitProfile);
  apiProfile
    .updateUserInfo(item)
    .then((response) => response.json())
    .then((res) => JSON.parse(JSON.stringify(res)))
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .finally(() => visualSubmit(buttonSubmitProfile))
    .catch((err) => console.log('Ошибка в данных профиля', err));
}

const addCardLike = (...arg) => {
  apiCards
    .addLike(...arg)
    .catch((err) => console.log('Ошибка нового лайка', err));
};

const cardDeleteLike = (...arg) => {
  apiCards
    .deleteLike(...arg)
    .catch((err) => console.log('Ошибка удаления лайка', err));
};

const deleteCard = (...arg) => {
  apiCards
    .deleteCard(...arg)
    .catch((err) => console.log('Карточка осталась', err));
};

function setCards(renderer) {
  // запрос на все карточки
  apiCards
    .getInfoCards()
    .then((response) => response.json())
    .then((res) => JSON.parse(JSON.stringify([res])))
    .then((res) => {
      renderer(res[0]);
      console.log(res[0]);
    })
    .catch((err) => console.log('Что то с загрузкой карточек', err));
}

const addCardForRenderCard = (...arg) => formRenderCards(...arg);

function renderCards(item) {
  // запрос на новую карточку
  visualSubmit(buttonSubmitCard);
  apiCards
    .addCard(item)
    .then((response) => response.json())
    .then((res) => JSON.parse(JSON.stringify([res])))
    .then((res) => {
      addCardForRenderCard(res);
    })
    .finally(() => visualSubmit(buttonSubmitCard))
    .catch((err) => console.log('Что то с добавлением карточки', err));
}

function setProfile(rendererInfo) {
  // получает ответ с сервера
  apiProfile
    .getInfoUser()
    .then((response) => response.json())
    .then((res) => JSON.parse(JSON.stringify(res)))
    .then((info) => {
      rendererInfo(info);
      inputName.placeholder = info.name;
      inputJob.placeholder = info.about;
    })
    .catch((err) => console.log('Информация пользователя с ошибкой', err));
}

setProfile(setUserInfo); // получает ответ с сервера

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

function trashCard(id, elementRemove) {
  // удаление карточки
  inputId.value = id;
  const popupTrashCard = new PopupSubmit(
    selectorPopupForm.trash,
    inputId,
    deleteCard,
    elementRemove
  );
  popupTrashCard.open();
}

function formRenderCards(initialCardValues) {
  // функция получает данные с сервера

  const section = new Section(
    {
      renderer: (item) => {
        const cardElement = createCard(
          item,
          idTemplateCard,
          popupWithImage,
          trashCard,
          addCardLike,
          cardDeleteLike,
          configApi.myID
        ).generateCard();
        section.addItems(cardElement);
      },
    },
    containerCards
  );

  section.renderItems(initialCardValues);
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
  setTimeout(() => inputName.focus(), 100);
});
buttonAdd.addEventListener('mousedown', () => {
  popupClassFormCard.open();
  setTimeout(() => inputPlace.focus(), 100);
});
profileBlock
  .querySelector(selectorUser.avatar)
  .addEventListener('click', () => {
    // открытие попапа с аватаром
    popupClassFormAvatar.open();
    setTimeout(() => inputAvatar.focus(), 100);
  });
