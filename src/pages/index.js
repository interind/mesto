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
  profileAvatar,
  selectorPopupForm,
  profileBlock,
  formAvatar,
  inputAvatar,
  formProfile,
  formCard,
  inputPlace,
  buttonEdit,
  buttonAdd,
  containerCards,
  selectorUser,
  buttonSubmitProfile,
  buttonSubmitCard,
  buttonSubmitAvatar,
  idTemplateCard,
  inputName,
  inputJob,
  loader,
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

function toggleLoader(bool) {
  bool ? loader.classList.remove('loader_hidden') : loader.classList.add('loader_hidden');
}
function formRenderAvatar(item) {
  // запрос на изменение аватара
  visualSubmit(buttonSubmitAvatar);
  api
    .updateUserAvatar(item)
    .then((info) => {
      userInfo.setUserInfo({avatar: info.avatar, _id: info._id});
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
      userInfo.setUserInfo({name: res.name, about: res.about});
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

function setCards(renderer) {
  toggleLoader(true)
  api.getInfoCards()
    .then((res) => {
      renderer(res[0]);
    })
    .catch((err) => console.log('Что то с загрузкой карточек', err))
    .finally(() => toggleLoader(false));
}

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

function setProfile(rendererInfo) {
  // получает ответ с сервера
  api.getInfoUser()
    .then((info) => {
      rendererInfo(info);
    })
    .catch((err) => console.log('Информация пользователя с ошибкой', err));
}

setProfile(setUserInfo); // получает ответ с сервера

setCards(formRenderCards); // получает ответ с сервера

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

buttonEdit.addEventListener('mousedown', () => {
  inputName.value = showProfileForm.name.textContent;
  inputJob.value = showProfileForm.about.textContent;
  setTimeout(() => inputName.focus(), 100);
  popupClassFormProfile.open();
});
buttonAdd.addEventListener('mousedown', () => {
  setTimeout(() => inputPlace.focus(), 100);
  popupClassFormCard.open();
});
profileBlock
  .querySelector(selectorUser.avatar)
  .addEventListener('click', () => {
    // открытие попапа с аватаром
    setTimeout(() => inputAvatar.focus(), 100);
    popupClassFormAvatar.open();
  });
