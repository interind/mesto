'use strict';

const initialCards = [
  {
    name: 'new Moscow',
    link:
      'https://images.unsplash.com/photo-1573384293689-0327bf65bd86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=650&q=80',
  },
  {
    name: 'Екатеринбург',
    link:
      'https://images.unsplash.com/photo-1521099466350-1c6df08788fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1510&q=80',
  },
  {
    name: 'окно в Европу',
    link:
      'https://images.unsplash.com/photo-1585860401301-7cc704a1baac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=998&q=80',
  },
  {
    name: 'тоже Москва',
    link:
      'https://images.unsplash.com/photo-1574977102169-5c36ce5d4a29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  },
  {
    name: 'Где-то в горах',
    link:
      'https://images.unsplash.com/photo-1535556848694-67eb6b318fa7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1510&q=80',
  },
  {
    name: 'летим домой',
    link:
      'https://images.unsplash.com/photo-1543223917-0e9d7131681f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80',
  },
];

const popup = document.querySelector('.popup'); // попап

const popupProfileForm = popup.querySelector('.popup__container_type_profile');
const nameInput = popupProfileForm.querySelector('.popup__input_type_name'); // ввод имени для профиля
const jobInput = popupProfileForm.querySelector('.popup__input_type_job'); // ввод данных профиля

const popupCardForm = popup.querySelector('.popup__container_type_cards'); //форма новых картинок
const placeInput = popupCardForm.querySelector('.popup__input_type_place');
const cardInput = popupCardForm.querySelector('.popup__input_type_card');

const profileBlock = document.querySelector('.profile'); //блок с кнопками открытия форм.
const buttonEditProfile = profileBlock.querySelector('.profile__edit-button'); //кнопка открытия формы
const profileName = profileBlock.querySelector('.profile__title'); // имя в профиле
const profileJob = profileBlock.querySelector('.profile__subtitle'); // данные профиля
const buttonAddCards = profileBlock.querySelector('.profile__add-button'); // кнопка добавить картинки

const popupZoomCard = popup.querySelector('.popup__zoom'); // блок показа картинки
const popupPic = popupZoomCard.querySelector('.popup__pic');
const popupPlacePic = popupZoomCard.querySelector('.popup__place-pic');
const buttonClosePopupZoom = popupZoomCard.querySelector(
  '.popup__button-close'
);

const containerCards = document.querySelector('.elements');

const addCard = (link, name) => {
  const templateContainer = document
    .querySelector('#cards')
    .content.cloneNode(true);

  const imageCard = (templateContainer.querySelector(
    '.element__pic'
  ).src = link);
  const placeCard = (templateContainer.querySelector(
    '.element__title'
  ).textContent = name);
  const imageCardAlt = (templateContainer.querySelector(
    '.element__pic'
  ).alt = name);

  templateContainer
    .querySelector('.element__button-like_color_white')
    .addEventListener('click', (event) => {
      const templateContainer = event.target;

      templateContainer.classList.toggle('element__button-like_color_black');
    });

  templateContainer
    .querySelector('.element__button-trash')
    .addEventListener('click', (event) => {
      const templateContainer = event.target.closest('.element');

      templateContainer.remove();
    });

  templateContainer
    .querySelector('.element__pic')
    .addEventListener('click', (event) => {
      const templateContainer = event.target;
      popupPlacePic.textContent = popupPic.alt;
      popupPic.src = templateContainer.src;
      popupPlacePic.textContent = templateContainer.alt;
      popupZoomOnOff();
      buttonClosePopupZoom.addEventListener('click', popupZoomOnOff);
    });

  containerCards.prepend(templateContainer);
};
const initialCardsRevers = initialCards.reverse();
initialCardsRevers.forEach((card) => addCard(card.link, card.name));

const createCard = () => {
  initialCard();
  const templateContainer = containerCards
    .querySelector('.element')
    .cloneNode(true);
  const imageCard = (templateContainer.querySelector('.element__pic').src =
    cardInput.value);
  const placeCard = (templateContainer.querySelector(
    '.element__title'
  ).textContent = placeInput.value);
  const imageCardAlt = (templateContainer.querySelector('.element__pic').alt =
    placeInput.value);

  containerCards.prepend(templateContainer);

  templateContainer
    .querySelector('.element__button-like_color_white')
    .addEventListener('click', (event) => {
      const templateContainer = event.target;

      templateContainer.classList.toggle('element__button-like_color_black');
    });

  templateContainer
    .querySelector('.element__button-trash')
    .addEventListener('click', (event) => {
      const templateContainer = event.target.closest('.element');

      templateContainer.remove();
    });

  templateContainer
    .querySelector('.element__pic')
    .addEventListener('click', (event) => {
      const templateContainer = event.target;
      popupPlacePic.textContent = popupPic.alt;
      popupPic.src = templateContainer.src;
      popupPlacePic.textContent = templateContainer.alt;
      popupZoomOnOff();
      buttonClosePopupZoom.addEventListener('click', popupZoomOnOff);
    });
};

let initialCard = () => {
  initialCard = Object.create(initialCards);
  initialCard.link = cardInput.value;
  initialCard.name = placeInput.value;
  initialCards.unshift(initialCard);
};

function togglePopup(item) {
  if (!popup.classList.contains('popup_opened')) {
    popup.classList.add('popup_opened');
    item.classList.add('popup__container_opened');
    item
      .querySelector('.popup__button-close')
      .addEventListener('click', togglePopup);
  } else {
    popup.classList.remove('popup_opened');
    popupProfileForm.classList.remove('popup__container_opened');
    popupCardForm.classList.remove('popup__container_opened');
  }
}

function popupEditForm() {
  if (buttonEditProfile.classList.contains('profile__edit-button')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    togglePopup(popupProfileForm);
  }
}

function formSubmitHandlerProfile(evt) {
  // submit
  evt.preventDefault();
  if (nameInput.value && jobInput.value) {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup(popupProfileForm);
  } else {
    alert('Для сохрания нужно заполнить все ваши данные');
    return;
  }
}

function popupAddForm() {
  if (buttonAddCards.classList.contains('profile__add-button')) {
    cardInput.value = '';
    placeInput.value = '';
    togglePopup(popupCardForm);
  }
}

function formSubmitHandlerCards(evt) {
  // submit для новой карточки
  evt.preventDefault();
  if (cardInput.value && placeInput.value) {
    initialCard();
    addCard(cardInput.value, placeInput.value);
    togglePopup(popupCardForm);
  } else {
    alert('Для сохрания нужно заполнить все ваши данные');
    return;
  }
}

function popupZoomOnOff() {
  if (!popup.classList.contains('popup_opened')) {
    popup.classList.add('popup_opened');
    popup.style.backgroundColor = 'rgba(0, 0, 0, .9)';
    popupZoomCard.classList.add('popup__zoom_opened');
  } else {
    popup.style.backgroundColor = 'rgba(0, 0, 0, .6)';
    popup.classList.remove('popup_opened');
    popupZoomCard.classList.remove('popup__zoom_opened');
  }
}

popupProfileForm.addEventListener('submit', formSubmitHandlerProfile); // на форме для сохранения профиля
popupCardForm.addEventListener('submit', formSubmitHandlerCards); // на форме для сохранения карта
buttonEditProfile.addEventListener('click', popupEditForm);
buttonAddCards.addEventListener('click', popupAddForm);
