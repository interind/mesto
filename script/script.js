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
const elementsCards = document.querySelector('#elements-cards');
elementsCards.innerHTML = `<div class="element"><img class="element__pic" src="" alt="">
<button class="element__button-trash" type="button" title="удалить"></button><div class="element__info">
		<h2  class="element__title"></h2><button class="element__button-like element__button-like_color_white" type="button"></button></div></div>
		<div class="element"><img class="element__pic" src="" alt="">
		<button class="element__button-trash" type="button" title="удалить"></button><div class="element__info">
		<h2  class="element__title"></h2><button class="element__button-like element__button-like_color_white" type="button"></button></div></div>
		<div class="element"><img class="element__pic" src="" alt="">
		<button class="element__button-trash" type="button" title="удалить"></button><div class="element__info">
		<h2  class="element__title"></h2><button class="element__button-like element__button-like_color_white" type="button"></button></div></div>
		<div class="element"><img class="element__pic" src="" alt="">
		<button class="element__button-trash" type="button" title="удалить"></button><div class="element__info">
		<h2  class="element__title"></h2><button class="element__button-like element__button-like_color_white" type="button"></button></div></div>
		<div class="element"><img class="element__pic" src="" alt="">
		<button class="element__button-trash" type="button" title="удалить"></button><div class="element__info">
		<h2  class="element__title"></h2><button class="element__button-like element__button-like_color_white" type="button"></button></div></div>
		<div class="element"><img class="element__pic" src="" alt="">
		<button class="element__button-trash" type="button" title="удалить"></button><div class="element__info">
		<h2  class="element__title"></h2><button class="element__button-like element__button-like_color_white" type="button"></button></div></div>`;

		const popup = document.querySelector('.popup');// попап
		const popupProfile = popup.querySelector('.popup__container_type_profile');//форма профиля
		const popupCards = popup.querySelector('.popup__container_type_cards');// форма картинок
		const profileBlock = document.querySelector('.profile');//блок с кнопками открытия форм.
		const buttonEditContainer = profileBlock.querySelector('.profile__edit-button');//кнопка открытия формы
		const buttonClosePopupProfile = popupProfile.querySelector('.popup__button-close');//кнопки закрытия форм
		const buttonClosePopupCards = popupCards.querySelector('.popup__button-close');//кнопки закрытия форм
		const profileName = profileBlock.querySelector('.profile__title');// имя в профиле
		const nameInput = popupProfile.querySelector('.popup__input_type_name');// ввод имени для профиля
		const jobInput = popupProfile.querySelector('.popup__input_type_job');// ввод данных профиля
		const placeInput = popupCards.querySelector('.popup__input_type_place');// ввод места 
		const cardInput = popupCards.querySelector('.popup__input_type_card');// ввод картинки
		const profileJob = profileBlock.querySelector('.profile__subtitle');// данные профиля
		const buttonSavePopupProfile = popupProfile.querySelector('.popup__button-submit');
		const buttonSavePopupCards = popupCards.querySelector('.popup__button-submit');// кнопка сохранить
		const elementCard = elementsCards.querySelectorAll('.element');// карточки
		const buttonLike = elementsCards.querySelectorAll('.element__button-like');// кнопки лайк
		const buttonAddCards = profileBlock.querySelector('.profile__add-button');// кнопка добавить картинки
		const imageCard = elementsCards.querySelectorAll('.element__pic');// картинки
		const placeCard = elementsCards.querySelectorAll('.element__title');// описание мест
		const popupZoom = popup.querySelector('.popup__zoom');

for (let i = 0; i < imageCard.length; i++) {
	imageCard[i].src = `${initialCards[i].link}`;
} // меняет стандарные картинки
for (let i = 0; i < placeCard.length; i++) {
	placeCard[i].textContent = `${initialCards[i].name}`;
} // меняет стандарные названия мест
for (let i = 0; i < imageCard.length; i++) {
	imageCard[i].alt = `${placeCard[i].textContent}`;
}

// функции
function popupAddForm() {
	if(!popup.classList.contains('popup_opened') && buttonAddCards){
			popup.classList.add('popup_opened');
			popupCards.classList.add('popup__container_opened');
			setTimeout( function() {
					popup.style.opacity = 1;
			}, 10);
			cardInput.value = "";
			placeInput.value = "";
			placeInput.focus();
	}
	else {
			popup.style.opacity = 0;
			setTimeout( function() {
					popupCards.classList.remove('popup__container_opened');
					popup.classList.remove('popup_opened');
			}, 1000);
	}
}

function popupEditForm() {
	if (!popup.classList.contains('popup_opened') && buttonEditContainer){
			popup.classList.add('popup_opened');
			popupProfile.classList.add('popup__container_opened');
			setTimeout( function() {
					popup.style.opacity = 1;
			}, 10);
			nameInput.value = profileName.textContent;
			jobInput.value = profileJob.textContent;
			nameInput.focus();
	}
	else {
			popup.style.opacity = 0;
			setTimeout( function() {
					popupProfile.classList.remove('popup__container_opened');
					popup.classList.remove('popup_opened');
			}, 1000);
	}
}
function closePopup(evt) {                  // закрытие блока с формой, чтобы закрыть не только по кнопке
	evt.preventDefault();
	if(evt.target !== evt.currentTarget)return
			popupEditForm(evt);
			popupAddForm(evt);
			popupZoomOnOff(evt);
}
function formSubmitHandler(evt) {          // события submit
	evt.preventDefault();
	if (nameInput.value && jobInput.value) {
			profileName.textContent = nameInput.value;
			profileJob.textContent = jobInput.value;
			popupEditForm(evt);
	}
	else {
			alert('Для сохрания нужно заполнить все ваши данные');
			return
	}
}

function formSubmitHandlerCards(evt) {          // события submit
	evt.preventDefault();
	if (cardInput.value && placeInput.value) {
			elementsCards.insertAdjacentHTML('afterbegin', `<div class="element">
					<img class="element__pic" src="${cardInput.value}" alt="${placeInput.value}">
					<button class="element__button-trash" type="button"></button>
					<div class="element__info"><h2  class="element__title">${placeInput.value}</h2>
					<button class="element__button-like element__button-like_color_white" type="button"></button>
					</div></div>`);
			let elementCard = elementsCards.querySelector('.element');
			elementCard.addEventListener('click', clickTrash);
			popupAddForm(evt);
	}
	else {
			alert('Для сохрания нужно заполнить все ваши данные');
			return
	}
}

function clickTrash(evt) {   // удаление карточки
	evt.preventDefault();
	evt = evt || window.evt;
	let target = evt.target;
	let elementCard = evt.currentTarget;
	if(target.classList.contains('element__button-trash')) {
			elementCard.style.display = 'none';
	}
}

function clickLike(evt) {   // ставим лайки
	evt.preventDefault();
	let buttonLike = evt.target;
	if(buttonLike.classList.contains('element__button-like')) {
			buttonLike.classList.toggle('element__button-like_color_black');
	}
}

function popupZoomOnOff() {
	if (!popup.classList.contains('popup_opened')){
			popup.classList.add('popup_opened');
			popup.style.backgroundColor = 'rgba(0, 0, 0, .9)';
			popupZoom.classList.add('popup__zoom_opened');
			setTimeout( function() {
					popup.style.opacity = 1;
			}, 10);
	}
	else {
			popup.style.opacity = 0;
			popup.style.backgroundColor = 'rgba(0, 0, 0, .6)';
			setTimeout( function() {
					popupZoom.classList.remove('popup__zoom_opened');
					popup.classList.remove('popup_opened');
			}, 1000);
	}
}

function clickZoom(evt) {   // открытие карточек
	evt.preventDefault();
	evt = evt || window.evt;
	let imageCard = evt.target || evt.typeElement;
	if(imageCard.classList.contains('element__pic')) {
			popupZoom.innerHTML = `<img class="popup__pic" src="${cardInput.value}" alt="${placeInput.value}">
					<figcaption class="popup__place-pic">${placeInput.value}</figcaption>
					<button class="popup__button-close" type="button" title="закрыть"></button>`;
			let buttonClosePopupZoom = popupZoom.querySelector('.popup__button-close');
			let popupPic = popupZoom.querySelector('.popup__pic');
			let popupPicPlace = popupZoom.querySelector('.popup__place-pic');
			popupPicPlace.textContent = popupPic.alt;
			buttonClosePopupZoom.addEventListener('click', popupZoomOnOff);
			popupPic.src = target.src;
			popupPicPlace.textContent = target.alt;
			popupZoomOnOff(evt);
	}
}
// слушатели событий
for (let i = 0; i < elementCard.length; i++) {
	elementCard[i].addEventListener('click', clickTrash);// слушатель на карточке
}

popupProfile.addEventListener('submit', formSubmitHandler);// на форме для сохранения профиля
popupCards.addEventListener('submit', formSubmitHandlerCards);// на форме для сохранения карта
popup.addEventListener('click', closePopup);// закрытие попапа без кнопки
buttonEditContainer.addEventListener('click', popupEditForm);// для формы ввода профиля
buttonAddCards.addEventListener('click', popupAddForm); // для формы ввода картинок
elementsCards.addEventListener('click', clickLike); // для выбора кнопки лайка
elementsCards.addEventListener('click', clickZoom); // для открытия попап картинки
buttonSavePopupProfile.addEventListener('click', formSubmitHandler); // кнопка сохранения профиля
buttonSavePopupCards.addEventListener('click', formSubmitHandlerCards); // кнопка сохранения карт
buttonClosePopupProfile.addEventListener('click', popupEditForm); // кнопка закрытия профиля
buttonClosePopupCards.addEventListener('click', popupAddForm); // кнопка закрытия формы для карт