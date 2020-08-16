'use strict';
const initialCards = [
	{
			name: 'new Moscow',
			link: 'https://images.unsplash.com/photo-1573384293689-0327bf65bd86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=650&q=80'
	},
	{
			name: 'Екатеринбург',
			link: 'https://images.unsplash.com/photo-1521099466350-1c6df08788fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1510&q=80'
	},
	{
			name: 'окно в Европу',
			link: 'https://images.unsplash.com/photo-1585860401301-7cc704a1baac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=998&q=80'
	},
	{
			name: 'тоже Москва',
			link: 'https://images.unsplash.com/photo-1574977102169-5c36ce5d4a29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
	},
	{
			name: 'Где-то в горах',
			link: 'https://images.unsplash.com/photo-1535556848694-67eb6b318fa7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1510&q=80'
	},
	{
			name: 'летим домой',
			link: 'https://images.unsplash.com/photo-1543223917-0e9d7131681f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80'
	}
];

const popup = document.querySelector('.popup');// попап

const popupProfileForm = popup.querySelector('.popup__container_type_profile');//форма профиля
const buttonClosePopupProfile = popupProfileForm.querySelector('.popup__button-close');//кнопка закрытия формы
const buttonSavePopupProfile = popupProfileForm.querySelector('.popup__button-submit');//кнопка сохранения формы
const nameInput = popupProfileForm.querySelector('.popup__input_type_name');// ввод имени для профиля
const jobInput = popupProfileForm.querySelector('.popup__input_type_job');// ввод данных профиля

const popupCardForm = popupProfileForm.cloneNode(true);// создаю вторую форму
popupCardForm.name = 'popup-cards';
popupCardForm.classList.remove('popup__container_type_profile');
popupCardForm.classList.add('popup__container_type_cards');
const placeInput = popupCardForm.querySelector('.popup__input_type_name');
placeInput.classList.remove('popup__input_type_name');
placeInput.classList.add('popup__input_type_place');
placeInput.placeholder = "Название";
const cardInput = popupCardForm.querySelector('.popup__input_type_job');
cardInput.classList.remove('popup__input_type_job');
cardInput.classList.add('popup__input_type_card');
cardInput.type = 'url';
cardInput.placeholder = 'Ссылка на картинку';
const titleCardForm = popupCardForm.querySelector('.popup__title');
titleCardForm.textContent = 'Новое место';
const buttonClosePopupCards = popupCardForm.querySelector('.popup__button-close');

const popupZoomCard = document.createElement('figure');//создаю блок для открытия картинок
popupZoomCard.classList.add('popup__zoom');
popup.append(popupCardForm, popupZoomCard);

const templateContainer = document.querySelector('#cards').content; // контейнер с шаблоном карточки
const containerCards = document.querySelector('.elements');
initialCards.forEach(initialCard => {
	const card = templateContainer.cloneNode(true);
	const imageCard = card.querySelector('.element__pic');
	const placeCard = card.querySelector('.element__title');
	const buttonsLike = card.querySelector('.element__button-like');
	buttonsLike.classList.add('element__button-like_color_white');
	buttonsLike.type = 'button';
	imageCard.src = initialCard.link;
	placeCard.textContent = initialCard.name;
	imageCard.alt = placeCard.textContent;
 containerCards.append(card);
});

const profileBlock = document.querySelector('.profile');//блок с кнопками открытия форм.
const buttonEditProfile = profileBlock.querySelector('.profile__edit-button');//кнопка открытия формы
const profileName = profileBlock.querySelector('.profile__title');// имя в профиле
const profileJob = profileBlock.querySelector('.profile__subtitle');// данные профиля
const buttonAddCards = profileBlock.querySelector('.profile__add-button');// кнопка добавить картинки



function openClosePopup(evt) {
	evt.preventDefault();
	if(!popup.classList.contains('popup_opened')){
			popup.classList.add('popup_opened');
		 setTimeout( function() {
				popup.style.opacity = 1;
		}, 10);
}
else {
		popup.style.opacity = 0;
		setTimeout( function() {
				popup.classList.remove('popup_opened');
				popupProfileForm.classList.remove('popup__container_opened');
				popupCardForm.classList.remove('popup__container_opened');
		}, 1000);
}
}

function popupEditForm() {
	 if (buttonEditProfile.classList.contains('profile__edit-button')){
		 	popupProfileForm.classList.add('popup__container_opened');
		 	nameInput.value = profileName.textContent;
				jobInput.value = profileJob.textContent;
	 }
}

function formSubmitHandlerProfile(evt) {          // submit
 	evt.preventDefault();
 	if (nameInput.value && jobInput.value) {
		 	profileName.textContent = nameInput.value;
		 	profileJob.textContent = jobInput.value;
		 	openClosePopup(evt);
	 }
	 else {
	 		alert('Для сохрания нужно заполнить все ваши данные');
		 	return
	 }
}

function clickLike(evt) {   // ставим лайки
	evt.preventDefault();
	let buttonLike = evt.target;
	if(buttonLike.classList.contains('element__button-like')) {
			buttonLike.classList.toggle('element__button-like_color_black');
	}
}

function popupAddForm() {
	if(buttonAddCards.classList.contains('profile__add-button')){
			popupCardForm.classList.add('popup__container_opened');
			cardInput.value = '';
			placeInput.value = '';
	}
}

function formSubmitHandlerCards(evt) {          // submit для новой карточки
	evt.preventDefault();
	if (cardInput.value && placeInput.value) {
			let initialCard = Object.create(initialCards);
			initialCard.link = cardInput.value;
			initialCard.name = placeInput.value;
			initialCards.unshift(initialCard);
				const card = templateContainer.cloneNode(true);
				const imageCard = card.querySelector('.element__pic');
				const placeCard = card.querySelector('.element__title');
				const buttonsLike = card.querySelector('.element__button-like');
				buttonsLike.classList.add('element__button-like_color_white');
				buttonsLike.type = 'button';
				imageCard.src = initialCard.link;
				placeCard.textContent = initialCard.name;
				imageCard.alt = placeCard.textContent;
				containerCards.prepend(card);
			 openClosePopup(evt);
	}
	else {
			alert('Для сохрания нужно заполнить все ваши данные');
			return
	}
}

function clickTrash(evt) {   // удаление карточки
	evt.preventDefault();
	evt = evt || window.evt;
	let buttonTrash = evt.target;
	if(buttonTrash.classList.contains('element__button-trash')) {
		buttonTrash.parentNode.style.display = 'none';
	}
}

function popupZoomOnOff() {
	if (!popup.classList.contains('popup_opened')){
			popup.classList.add('popup_opened');
			popup.style.backgroundColor = 'rgba(0, 0, 0, .9)';
			popupZoomCard.classList.add('popup__zoom_opened');
			setTimeout( function() {
					popup.style.opacity = 1;
			}, 10);
	}
	else {
			popup.style.opacity = 0;
			popup.style.backgroundColor = 'rgba(0, 0, 0, .6)';

			while (popupZoomCard.firstChild){
			 	popupZoomCard.removeChild(popupZoomCard.firstChild);
			}
			
			setTimeout( function() {
				 popupZoomCard.classList.remove('popup__zoom_opened');
					popup.classList.remove('popup_opened');
			}, 1000);
	}
}

function clickZoom(evt) {   
	evt.preventDefault();
	evt = evt || window.evt;
	let imageCard = evt.target || evt.typeElement;
	if(imageCard.classList.contains('element__pic')) {
			const buttonClosePopupZoom = document.createElement('button');
			buttonClosePopupZoom.classList.add('popup__button-close')
			buttonClosePopupZoom.type = 'button';
			const popupPic = document.createElement('img');
			popupPic.classList.add('popup__pic');
			const popupPicPlace = document.createElement('figcaption');
			popupPicPlace.classList.add('popup__place-pic');
			popupZoomCard.append(popupPic, popupPicPlace, buttonClosePopupZoom);
			popupPicPlace.textContent = popupPic.alt;
			popupPic.src = imageCard.src;
			popupPicPlace.textContent = imageCard.alt;
			popupZoomOnOff(evt);
			buttonClosePopupZoom.addEventListener('click', popupZoomOnOff);
	}
}


popupProfileForm.addEventListener('submit', formSubmitHandlerProfile);// на форме для сохранения профиля
popupCardForm.addEventListener('submit', formSubmitHandlerCards);// на форме для сохранения карта
buttonEditProfile.addEventListener('click', popupEditForm);// для формы ввода профиля
buttonEditProfile.addEventListener('click', openClosePopup);// для формы ввода профиля
buttonAddCards.addEventListener('click', popupAddForm); // для формы ввода картинок
buttonAddCards.addEventListener('click', openClosePopup);
containerCards.addEventListener('click', clickLike); // для выбора кнопки лайка
containerCards.addEventListener('click', clickZoom); // для открытия попап картинки
containerCards.addEventListener('click', clickTrash);// для удаления карточек
buttonClosePopupProfile.addEventListener('click', openClosePopup); // кнопка закрытия профиля
buttonClosePopupCards.addEventListener('click', openClosePopup); // кнопка закрытия формы для карт