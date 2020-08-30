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

const profileForm = document.forms.formProfile;//форма профиля
const inputName = profileForm.elements.name;
const inputJob = profileForm.elements.job;
const buttonSubmit = formProfile.querySelector('.popup__button-submit');
  

const cardForm = document.forms.formCard; //форма новых картинок
const inputPlace = cardForm.elements.place;
const inputCard = cardForm.elements.card;
const buttonSubmitCard = formCard.querySelector('.popup__button-submit');

const profileBlock = document.querySelector('.profile'); //блок с кнопками открытия форм.
const profileName = profileBlock.querySelector('.profile__title'); // имя в профиле
const profileJob = profileBlock.querySelector('.profile__subtitle'); // данные профиля
const buttonEdit = profileBlock.querySelector('.profile__edit-button');//кнопка редактировать
const buttonAdd = profileBlock.querySelector('.profile__add-button');//кнопка добавить

const zoomCard = popupZoom.querySelector('.popup__zoom'); // блок показа картинки
const zoomPic = zoomCard.querySelector('.popup__pic');
const zoomPlacePic = zoomCard.querySelector('.popup__place-pic');
const buttonZoom = document.createElement('button');
buttonZoom.classList.add('popup__button-close');
buttonZoom.type = 'button';
buttonZoom.title = 'закрыть';
zoomCard.append(buttonZoom);

const containerCards = document.querySelector('.elements'); // контейнер для карточек
const templateContainer = document.querySelector('#cards').content;

const zoom = (evt) => { // функция для открытия картинок
  const cardImage = evt.target;
  if (cardImage.classList.contains('element__pic')) {
    zoomPlacePic.textContent = zoomPic.alt;
    zoomPic.src = cardImage.src;
    zoomPlacePic.textContent = cardImage.alt;
    togglePopup(zoomCard);
  }
};

const createCard = (name, link) => {
  // создание новых карточек

  const containerCard = templateContainer.cloneNode(true);

  containerCard.querySelector('.element__title').textContent = name;
  containerCard.querySelector('.element__pic').alt = name;
  containerCard.querySelector('.element__pic').src = link;

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
initialCardsRevers.forEach((card) => addCard(card.name, card.link));

const togglePopup = (item, formSubmit) => {
  // закрытие и открытие попапа и блока какой попадет
  if (item === zoomCard) {
    item.parentNode.classList.toggle('popup_opened');
    closePopup();
    item.parentNode.style.backgroundColor = 'rgba(0, 0, 0, .9)';
    item.parentNode.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
        evt.target.classList.remove('popup_opened');
        evt.target.removeEventListener('mousedown', evt);
      }
    });

    item
      .querySelector('.popup__button-close')
      .addEventListener('click', (evt) => {
        evt.target.parentNode.closest('.popup_opened');
        item.parentNode.style.backgroundColor = 'rgba(0, 0, 0, .6)';

        item.parentNode.classList.remove('popup_opened');
        item.removeEventListener('click', evt);
      
      });
      
  } 
  else {
    item.parentNode.classList.toggle('popup_opened');
    enableValidation({
      formSelector: '.popup__container',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button-submit',
      inactiveButtonClass: 'popup__button-submit_disabled',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__input-error_active',
    });
    closePopup();
    item.parentNode.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {

        evt.target.classList.remove('popup_opened');
        evt.target.removeEventListener('mousedown', evt);
        item.removeEventListener('submit', formSubmit);
        clearError();
      }
    });

    item
      .querySelector('.popup__button-close')
      .addEventListener('click', (evt) => {
        evt.target.parentNode.closest('.popup_opened');

        item.parentNode.classList.remove('popup_opened');
        item.removeEventListener('click', evt);
        item.removeEventListener('submit', formSubmit);
        clearError();
      });
  
  }
};

const closePopup = () =>{
  const popupAll = Array.from(document.querySelectorAll('.popup'));
  popupAll.forEach((popupElement) => {

  window.addEventListener('keydown', evt => {//закрытие клавишей esc
    if (evt.key === 'Escape' && popupElement.classList.contains('popup_opened')) {
      popupElement.classList.remove('popup_opened');
      window.removeEventListener('keydown', evt);
      clearError();
    }
  });
});
};

const clearError = () =>{ // чистка старых данных и ошибочных аттрибутов 
  
  if(buttonSubmit.classList.contains('popup__button-submit_disabled')){
    buttonSubmit.classList.remove('popup__button-submit_disabled');
    buttonSubmit.removeAttribute('disabled');
  }
  else if(!buttonSubmitCard.classList.contains('popup__button-submit_disabled')){
    buttonSubmitCard.classList.add('popup__button-submit_disabled');
    buttonSubmitCard.setAttribute('disabled', true);
  }
  const error = Array.from(document.querySelectorAll('.popup__input-error'));
  error.forEach((errorItem) => {
    errorItem.textContent = '';
  });
};

const inProfileForm = () => { //получение данных формы профиля
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  togglePopup(profileForm, formSubmitHandlerProfile);
  profileForm.addEventListener('submit', formSubmitHandlerProfile);
};

const formSubmitHandlerProfile = (evt) => {
  // submit для формы имя и работа
  evt.preventDefault();
  if (inputName.value && inputJob.value) {
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    togglePopup(profileForm, formSubmitHandlerProfile);

  } else {
    alert('Для сохрания нужно заполнить все поля');
  }
};

const inCardForm = () => {//получение данных формы новых картинок
  inputPlace.value = '';
  inputCard.value = '';
  togglePopup(cardForm, formSubmitHandlerCards);
  cardForm.addEventListener('submit', formSubmitHandlerCards);
};

const formSubmitHandlerCards = (evt) => {
  // submit для формы с новой карточкой
  evt.preventDefault();
  if (inputPlace.value && inputCard.value) {
    addCard(inputPlace.value, inputCard.value);
    togglePopup(cardForm, formSubmitHandlerCards);

  } else {
    alert('Для сохрания нужно заполнить все поля');
  }
};

buttonEdit.addEventListener('mousedown', inProfileForm);
buttonAdd.addEventListener('mousedown', inCardForm);
