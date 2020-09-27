export const popupProfile = document.querySelector('.popup_type_profile'); // попап
export const popupCard = document.querySelector('.popup_type_card'); // попап
export const popupZoom = document.querySelector('.popup_type_zoom'); // попап

export const formProfile = document.forms.formProfile; //форма профиля
export const inputName = formProfile.elements.name;
export const inputJob = formProfile.elements.job;
export const buttonSubmitProfile = formProfile.querySelector('.popup__button-submit');

export const formCard = document.forms.formCard; //форма новых картинок
export const inputPlace = formCard.elements.place;
export const inputCard = formCard.elements.card;
export const buttonSubmitCard = formCard.querySelector('.popup__button-submit');

const profileBlock = document.querySelector('.profile'); //блок с кнопками открытия форм.
export const profileName = profileBlock.querySelector('.profile__title'); // имя в профиле
export const profileJob = profileBlock.querySelector('.profile__subtitle'); // данные профиля
export const buttonEdit = profileBlock.querySelector('.profile__edit-button'); //кнопка редактировать
export const buttonAdd = profileBlock.querySelector('.profile__add-button'); //кнопка добавить

export const containerCards = document.querySelector('.elements'); // контейнер для карточек // данные инпутов для новых карточек