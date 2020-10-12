'use strict';
// import './index.css';
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

const setUserAvatar = (...arg) => userInfo.setUserAvatar(...arg);

function formRenderAvatar(item) {
  // запрос на изменение аватара
  visualSubmit(buttonSubmitAvatar);
  apiProfile.updateUserAvatar(item).then((info) => {
    userInfo.setUserAvatar({ avatar: info[0].avatar });
    visualSubmit(buttonSubmitAvatar);
  });
}

function formRenderProfile(item) {
  // запрос на изменение профиля
  visualSubmit(buttonSubmitProfile);
  apiProfile.updateUserInfo(item).then((res) => {
    userInfo.setUserInfo(res);
    visualSubmit(buttonSubmitProfile);
  });
}

const addCardLike = (...arg) => apiCards.addLike(...arg);

const cardDeleteLike = (...arg) => apiCards.deleteLike(...arg);

const deleteCard = (...arg) => apiCards.deleteCard(...arg);

function setCards(renderer) {
  // запрос на все карточки
  apiCards.getInfoCards().then((res) => {
    renderer(res[0]);
    console.log(res[0]);
  });
}

function renderCards(item) {
  // запрос на новую карточку
  visualSubmit(buttonSubmitCard);
  apiCards.addCard(item).then((res) => {
    formRenderCards(res);
    visualSubmit(buttonSubmitCard);
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
      inputName.placeholder = info[0].name;
      inputJob.placeholder = info[0].about; 
      return info;
    })
    .catch((err) => console.log('Информация о Профиле', err));
  // нужно перенести
  apiProfile
    .getInfoUser()
    .then((info) => {
      renderAvatar({ avatar: info[0].avatar });
    })
    .catch((err) => console.log('Информация о Аватаре', err));
}

setProfile(setUserInfo, setUserAvatar); // получает ответ с сервера

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
  setTimeout( () => inputName.focus(), 100)
});
buttonAdd.addEventListener('mousedown', () => {
  popupClassFormCard.open();
  setTimeout( () => inputPlace.focus(), 100)
});
profileBlock
  .querySelector(selectorUser.avatar)
  .addEventListener('click', () => {
    // открытие попапа с аватаром
    popupClassFormAvatar.open();
    setTimeout( () => inputAvatar.focus(), 100);
  });
