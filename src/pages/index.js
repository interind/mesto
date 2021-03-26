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
  profileAvatar,
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
const createCard = (...arg) => new Card(...arg);
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

const addCardLike = (...arg) => {
  api.addLike(...arg).catch((err) => console.log('Ошибка нового лайка', err));
};

const cardDeleteLike = (...arg) => {
  api
    .deleteLike(...arg)
    .catch((err) => console.log('Ошибка удаления лайка', err));
};

const addCardForRenderCard = (...arg) => formRenderCards(...arg);

function renderCards(item) {
  // запрос на новую карточку
  visualSubmit(buttonSubmitCard);
  toggleLoader(true);
  api.addCard(item)
    .then((res) => {
      addCardForRenderCard([res]);
      popupClassFormCard.close();
    })
    .catch((err) => console.log('Что то с добавлением карточки', err))
    .finally(() => {
      visualSubmit(buttonSubmitCard)
      toggleLoader(false);
    });
}
function setInfoAll(rendererUser, renderCards) {
  toggleLoader(true)
  Promise.all([api.getInfoUser(), api.getInfoCards()])
    .then(([users, cards]) => {
      rendererUser(users);
      renderCards(cards);
    })
    .catch((err) => console.log('Данные с ошибкой', err))
    .finally(() => toggleLoader(false));
}

setInfoAll(setUserInfo, formRenderCards); // получает ответ с сервера

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

const handleDeleteCardClick = (id, elementRemove) => {
  const removalCard = (evt) => {
    evt.preventDefault();
    api
      .deleteCard(id)
      .then(() => {
        elementRemove.style.display = 'none';
      })
      .catch((err) => console.log('Карточка осталась', err))
      .finally(() => popupSubmitDeleteCard.close());
  };
  // удаление карточки
  const popupSubmitDeleteCard = new PopupSubmit(
    removalCard,
    selectorPopupForm.trash
  );
  popupSubmitDeleteCard.open();
};

function formRenderCards(initialCardValues) {
  // функция получает данные с сервера
  const id = profileAvatar.id;
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
          id
        ).generateCard();
        section.addItem(cardElement, id);
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
buttonEdit.addEventListener('mousedown', editInfoUser);
buttonAdd.addEventListener('mousedown', addPlaceCard);
addAvatar.addEventListener('click', editAvatarLink);
