export const formCard = document.forms.formCard; //форма новых картинок
export const inputPlace = formCard.elements.place;
export const inputCard = formCard.elements.card;

export const profileBlock = document.querySelector('.profile'); //блок с кнопками открытия форм.
export const buttonEdit = profileBlock.querySelector('.profile__edit-button'); //кнопка редактировать
export const buttonAdd = profileBlock.querySelector('.profile__add-button'); //кнопка добавить

export const containerCards = document.querySelector('.elements'); // контейнер для карточек // данные инпутов для новых карточек

export const infoUser = { user: '.profile__title', job: '.profile__subtitle', avatar: '.profile__avatar'};

export const formProfile = document.forms.formProfile; //форма профиля

const formAvatar = document.forms.formAvatar;
export const inputAvatar = formAvatar.elements.avatar;

const formTrash = document.forms.formTrash;
export const inputId = formTrash.elements.trash;

export const cardsBlock = document.querySelector('.elements');
