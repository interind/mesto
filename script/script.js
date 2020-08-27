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
const inputJob = popupProfileForm.elements.job;// ввод данных профиля

const popupCardForm = document.forms.formCard; //форма новых картинок
const inputPlace = popupCardForm.elements.place;
const inputCard = popupCardForm.elements.card;
// const formCardError = popupCardForm.querySelector(`${input}-error`);

const profileBlock = document.querySelector('.profile'); //блок с кнопками открытия форм.
const buttonEditProfile = profileBlock.querySelector('.profile__edit-button'); //кнопка открытия формы
const profileName = profileBlock.querySelector('.profile__title'); // имя в профиле
const profileJob = profileBlock.querySelector('.profile__subtitle'); // данные профиля
const buttonAddCards = profileBlock.querySelector('.profile__add-button'); // кнопка добавить картинки

const popupZoomCard = popupZoom.querySelector('.popup__zoom'); // блок показа картинки
const popupPic = popupZoomCard.querySelector('.popup__pic');
const popupPlacePic = popupZoomCard.querySelector('.popup__place-pic');
const buttonZoom = document.createElement('button');
buttonZoom.classList.add('popup__button-close');
buttonZoom.type = 'button';
buttonZoom.title = 'закрыть';
popupZoomCard.append(buttonZoom);

const containerCards = document.querySelector('.elements'); // контейнер для карточек
const templateContainer = document.querySelector('#cards').content;
const zoom = (event) => {
  const cardImage = event.target;
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
    .addEventListener('click', (event) => {
      // ставим лайки
      const buttonLike = event.target;

      buttonLike.classList.toggle('element__button-like_color_black');
    });

  containerCard
    .querySelector('.element__button-trash')
    .addEventListener('click', (event) => {
      // удаление карточек
      const blockCard = event.target.closest('.element');

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




const togglePopup = (item) => {
  // закрытие и открытие попапа и блока какой попадет

  if (item === popupZoomCard) {
    item.classList.toggle('popup__zoom_opened');
    item.parentNode.classList.toggle('popup_opened');
    item.parentNode.style.backgroundColor = 'rgba(0, 0, 0, .9)';
    item
      .querySelector('.popup__button-close')
      .addEventListener('click', (event) => {
        const buttonClose = event.target.parentNode.closest('.popup_opened');
        item.parentNode.style.backgroundColor = 'rgba(0, 0, 0, .6)';

        item.parentNode.classList.remove('popup_opened');
        item.classList.remove('popup__zoom_opened');
        item.removeEventListener('click', event);
      });
  } else {
    item.parentNode.classList.toggle('popup_opened');
    item
      .querySelector('.popup__button-close')
      .addEventListener('click', (event) => {
        const buttonClose = event.target.parentNode.closest('.popup_opened');

        item.parentNode.classList.remove('popup_opened');
        item.removeEventListener('click', event);
      });
  }
};

function popupEditForm() {
  // форма для данных имя и работа
  if (buttonEditProfile.classList.contains('profile__edit-button')) {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    togglePopup(popupProfileForm);
  }
}

function formSubmitHandlerProfile(evt) {
  // submit для формы имя и работа
  evt.preventDefault();
  if (inputName.value && inputJob.value) {
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    togglePopup(popupProfileForm);
  } else {
    alert('Для сохрания нужно заполнить все ваши данные');
  }
}

function popupAddForm() {
  // данные для ввода новых карточек
  if (buttonAddCards.classList.contains('profile__add-button')) {
    inputCard.value = '';
    inputPlace.value = '';
    togglePopup(popupCardForm);
  }
}

function formSubmitHandlerCards(evt) {
  // submit для формы с новой карточкой
  evt.preventDefault();
  if (inputCard.value && inputPlace.value) {
    addCard(inputCard.value, inputPlace.value);

    togglePopup(popupCardForm);
  } else {
    alert('Для сохрания нужно заполнить все ваши данные');
  }
}

popupProfileForm.addEventListener('submit', formSubmitHandlerProfile); // на форме для сохранения профиля
popupCardForm.addEventListener('submit', formSubmitHandlerCards); // на форме для сохранения карта
buttonEditProfile.addEventListener('click', popupEditForm); // слушатель на кнопке добавление нового профиля
buttonAddCards.addEventListener('click', popupAddForm); // слушатель на кнопке для добавления карточек.
