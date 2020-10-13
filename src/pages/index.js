'use strict';
import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { templateFormSelector } from '../utils/templateFormSelector.js';
import { visualSubmit } from '../utils/utils.js';
import {
  configApi,
  userMe,
  newCards,
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

const api = new Api(configApi, userMe, newCards);

const popupWithImage = new PopupWithImage(selectorPopupForm.zoom);

const createCard = (...arg) => new Card(...arg);

const userInfo = new UserInfo(selectorUser);

const setUserInfo = (...arg) => userInfo.setUserInfo(...arg);

function formRenderAvatar(item) {
  // запрос на изменение аватара
  visualSubmit(buttonSubmitAvatar);
  api
    .updateUserAvatar(item)
    .then((response) => response.json())
    .then((res) => JSON.parse(JSON.stringify(res)))
    .then((info) => {
      userInfo.setUserInfo(info);
      popupClassFormAvatar.close();
    })
    .finally(() => visualSubmit(buttonSubmitAvatar))
    .catch((err) => console.log('Ошибка в данных профиля', err));
}

function formRenderProfile(item) {
  // запрос на изменение профиля
  visualSubmit(buttonSubmitProfile);
  api
    .updateUserInfo(item)
    .then((response) => response.json())
    .then((res) => JSON.parse(JSON.stringify(res)))
    .then((res) => {
      userInfo.setUserInfo(res);
      popupClassFormProfile.close();
    })
    .finally(() => visualSubmit(buttonSubmitProfile))
    .catch((err) => console.log('Ошибка в данных профиля', err));
}

const addCardLike = (...arg) => {
  api.addLike(...arg).catch((err) => console.log('Ошибка нового лайка', err));
};

const cardDeleteLike = (...arg) => {
  api
    .deleteLike(...arg)
    .catch((err) => console.log('Ошибка удаления лайка', err));
};

function setCards(renderer) {
  // запрос на все карточки
  api
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
  api
    .addCard(item)
    .then((response) => response.json())
    .then((res) => JSON.parse(JSON.stringify([res])))
    .then((res) => {
      addCardForRenderCard(res);
      popupClassFormCard.close();
    })
    .finally(() => visualSubmit(buttonSubmitCard))
    .catch((err) => console.log('Что то с добавлением карточки', err));
}

function setProfile(rendererInfo) {
  // получает ответ с сервера
  api
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

const handleDeleteCardClick = (id, elementRemove) => {
  // удаление карточки
  const popupSubmitDeleteCard = new PopupSubmit(
    api,
    selectorPopupForm.trash,
    id,
    elementRemove
  );
  popupSubmitDeleteCard.open();
};

function formRenderCards(initialCardValues) {
  // функция получает данные с сервера

  const section = new Section(
    {
      renderer: (item) => {
        const cardElement = createCard(
          item,
          idTemplateCard,
          popupWithImage,
          handleDeleteCardClick,
          addCardLike,
          cardDeleteLike,
          configApi.myID
        ).generateCard();
        section.addItem(cardElement);
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
