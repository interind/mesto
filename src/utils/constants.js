export const formCard = document.forms.formCard; //форма новых картинок
export const inputPlace = formCard.elements.place;
export const inputCard = formCard.elements.card;

export const profileBlock = document.querySelector('.profile'); //блок с кнопками открытия форм.
export const buttonEdit = profileBlock.querySelector('.profile__edit-button'); //кнопка редактировать
export const buttonAdd = profileBlock.querySelector('.profile__add-button'); //кнопка добавить

export const containerCards = document.querySelector('.elements'); // контейнер для карточек // данные инпутов для новых карточек

export const infoUser = {
  user: '.profile__title',
  job: '.profile__subtitle',
  avatar: '.profile__avatar',
};

export const formProfile = document.forms.formProfile; //форма профиля

export const formAvatar = document.forms.formAvatar;
export const inputAvatar = formAvatar.elements.avatar;

const formTrash = document.forms.formTrash;
export const inputId = formTrash.elements.trash;
const buttonSubmitTrash = formTrash.querySelector('.popup__button-submit');

const cardsBlock = document.querySelector('.elements');

export const selectorPopupForm = {
  profile: '.popup_type_profile',
  card: '.popup_type_card',
  avatar: '.popup_type_avatar',
  trash: '.popup_type_trash',
  zoom: '.popup_type_zoom',
};

export const idTemplateCard = '#card';

export const configApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-16/',
  token: 'bba27b67-a97d-4fd9-b42d-01c5b1258337',
  userMe: 'users/me',
  newCards: 'cards',
  myID: '066c34d31720ba2fb9acb601',
};
