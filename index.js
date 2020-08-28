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

const popupProfile = document.querySelector('.popup_type_profile'); // попап
const popupCard = document.querySelector('.popup_type_card'); // попап
const popupZoom = document.querySelector('.popup_type_zoom'); // попап

const popupProfileForm = document.forms.formProfile;
const inputName = popupProfileForm.elements.name;
const inputJob = popupProfileForm.elements.job;

const popupCardForm = document.forms.formCard; //форма новых картинок
const inputPlace = popupCardForm.elements.place;
const inputCard = popupCardForm.elements.card;

const profileBlock = document.querySelector('.profile'); //блок с кнопками открытия форм.
const profileName = profileBlock.querySelector('.profile__title'); // имя в профиле
const profileJob = profileBlock.querySelector('.profile__subtitle'); // данные профиля

const popupZoomCard = popupZoom.querySelector('.popup__zoom'); // блок показа картинки
const popupPic = popupZoomCard.querySelector('.popup__pic');
const popupPlacePic = popupZoomCard.querySelector('.popup__place-pic');
const buttonZoom = document.createElement('button');
buttonZoom.classList.add('popup__button-close');
buttonZoom.type = 'button';
buttonZoom.title = 'закрыть';
popupZoomCard.append(buttonZoom);

const objValidation = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

const containerCards = document.querySelector('.elements'); // контейнер для карточек
const templateContainer = document.querySelector('#cards').content;
const zoom = (evt) => {
  const cardImage = evt.target;
  if (cardImage.classList.contains('element__pic')) {
    popupPlacePic.textContent = popupPic.alt;
    popupPic.src = cardImage.src;
    popupPlacePic.textContent = cardImage.alt;
    togglePopup(popupZoomCard);
  }
};

const createCard = (link, name) => {
  // добавление новых карточек

  const containerCard = templateContainer.cloneNode(true);

  const imageCard = (containerCard.querySelector('.element__pic').src = link);
  const placeCard = (containerCard.querySelector(
    '.element__title'
  ).textContent = name);
  const imageCardAlt = (containerCard.querySelector(
    '.element__pic'
  ).alt = name);

  containerCard
    .querySelector('.element__button-like_color_white')
    .addEventListener('click', (evt) => {
      // ставим лайки
      const buttonLike = evt.target;

      buttonLike.classList.toggle('element__button-like_color_black');
    });

  containerCard
    .querySelector('.element__button-trash')
    .addEventListener('click', (evt) => {
      // удаление карточек
      const blockCard = evt.target.closest('.element');

      blockCard.remove();
    });

  containerCard.querySelector('.element__pic').addEventListener('click', zoom);

  return containerCard;
};

const addCard = (name, link) => {
  // добавление карточек
  containerCards.prepend(createCard(name, link));
};

const initialCardsRevers = initialCards.reverse(); // для добавления карточек по порядку
initialCardsRevers.forEach((card) => addCard(card.link, card.name));

const togglePopup = (item, formSubmit) => {
  // закрытие и открытие попапа и блока какой попадет
  if (item === popupZoomCard) {
    item.classList.toggle('popup__zoom_opened');
    item.parentNode.classList.toggle('popup_opened');
    item.parentNode.style.backgroundColor = 'rgba(0, 0, 0, .9)';
    item
      .querySelector('.popup__button-close')
      .addEventListener('click', (evt) => {
        const buttonClose = evt.target.parentNode.closest('.popup_opened');
        item.parentNode.style.backgroundColor = 'rgba(0, 0, 0, .6)';

        item.parentNode.classList.remove('popup_opened');
        item.classList.remove('popup__zoom_opened');
        item.removeEventListener('click', evt);
      });
  } else {
    item.removeEventListener('submit', formSubmit);
    item.parentNode.classList.toggle('popup_opened');
    item
      .querySelector('.popup__button-close')
      .addEventListener('click', (evt) => {
        const buttonClose = evt.target.parentNode.closest('.popup_opened');

        item.parentNode.classList.remove('popup_opened');
        item.removeEventListener('click', evt);
      });
  }
};

const formSubmitHandlerProfile = (evt) => {
  // submit для формы имя и работа
  evt.preventDefault();

  enableValidation(objValidation);
  if (inputName.value && inputJob.value) {
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    togglePopup(popupProfileForm);
  } else {
    alert('Для сохрания нужно заполнить все поля');
  }
};

const formSubmitHandlerCards = (evt) => {
  // submit для формы с новой карточкой
  evt.preventDefault();

  enableValidation(objValidation);
  if (inputCard.value && inputPlace.value) {
    addCard(inputCard.value, inputPlace.value);

    togglePopup(popupCardForm);
  } else {
    alert('Для сохрания нужно заполнить все поля');
  }
};

profileBlock
  .querySelector('.profile__edit-button')
  .addEventListener('click', () => {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    togglePopup(popupProfileForm);
    popupProfileForm.addEventListener('submit', formSubmitHandlerProfile);
  });

profileBlock
  .querySelector('.profile__add-button')
  .addEventListener('click', () => {
    const buttonSubmit = popupCardForm.querySelector('.popup__button-submit');
    if (!buttonSubmit.classList.contains('popup__submit-button_disabled')) {
      buttonSubmit.classList.add('popup__button-submit_disabled');
      inputCard.value = null;
      inputPlace.value = null;
      togglePopup(popupCardForm);
      popupCardForm.addEventListener('submit', formSubmitHandlerCards);
    }
  });
