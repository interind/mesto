export const formCard = document.forms.formCard; //форма новых картинок
export const inputPlace = formCard.elements.place;
export const inputCard = formCard.elements.card;

const profileBlock = document.querySelector('.profile'); //блок с кнопками открытия форм.
export const buttonEdit = profileBlock.querySelector('.profile__edit-button'); //кнопка редактировать
export const buttonAdd = profileBlock.querySelector('.profile__add-button'); //кнопка добавить

export const containerCards = document.querySelector('.elements'); // контейнер для карточек // данные инпутов для новых карточек

export const infoUser = { user: '.profile__title', job: '.profile__subtitle' };
// export const popupProfile = document.querySelector('.popup_type_profile'); // попап
// export const popupCard = document.querySelector('.popup_type_card'); // попап
// export const popupZoom = document.querySelector('.popup_type_zoom'); // попап

export const formProfile = document.forms.formProfile; //форма профиля
const inputName = formProfile.elements.name;
const inputJob = formProfile.elements.job;
const buttonSubmitProfile = formProfile.querySelector('.popup__button-submit');


