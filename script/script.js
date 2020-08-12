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
		const templateCards = document.querySelector('#cards').content; //шаблон карточек
		let elementsCards = document.querySelector('.elements');//блок для карточек
		let cloneCards = templateCards.cloneNode(true);
		elementsCards.append(cloneCards);
		const buttonsLike = elementsCards.querySelectorAll('.element__button-like');// кнопки лайк
  for (let i = 0; i < buttonsLike.length; i++) {
			buttonsLike[i].classList.add('element__button-like_color_white');
		}
		const buttonsTrash = elementsCards.querySelectorAll('.element__button-trash');// кнопки удалить
  for (let i = 0; i < buttonsTrash.length; i++) {
			buttonsTrash[i].title = ('удалить');
		}
		const imagesCards = elementsCards.querySelectorAll('.element__pic');// картинки
		for (let i = 0; i < imagesCards.length; i++) {
			imagesCards[i].src = `${initialCards[i].link}`;
		} 
		const placesCards = elementsCards.querySelectorAll('.element__title');// описание мест
  for (let i = 0; i < placesCards.length; i++) {
			placesCards[i].textContent = `${initialCards[i].name}`;
		} 
		for (let i = 0; i < imagesCards.length; i++) {
			imagesCards[i].alt = `${placesCards[i].textContent}`;
		}

		const popup = document.querySelector('.popup');// попап
		const popupProfile = popup.querySelector('.popup__container_type_profile');//форма профиля
		const profileBlock = document.querySelector('.profile');//блок с кнопками открытия форм.
		const buttonEditProfile = profileBlock.querySelector('.profile__edit-button');//кнопка открытия формы
		const buttonClosePopupProfile = popupProfile.querySelector('.popup__button-close');//кнопка закрытия формы
		const buttonSavePopupProfile = popupProfile.querySelector('.popup__button-submit');//кнопка сохранения формы
		const profileName = profileBlock.querySelector('.profile__title');// имя в профиле
		const nameInput = popupProfile.querySelector('.popup__input_type_name');// ввод имени для профиля
		const jobInput = popupProfile.querySelector('.popup__input_type_job');// ввод данных профиля
		const profileJob = profileBlock.querySelector('.profile__subtitle');// данные профиля
		const buttonAddCards = profileBlock.querySelector('.profile__add-button');// кнопка добавить картинки
		const popupZoom = popup.querySelector('.popup__zoom'); // попап с картинкой
		const templatePopupForm = document.querySelector('#form-cards').content;
		const clonePopupCards = templatePopupForm.cloneNode(true); // клон шаблона формы добавления картинок
		popup.append(clonePopupCards);
		const popupCards = popup.querySelector('.popup__container_type_cards');// форма картинок
		const placeInput = popupCards.querySelector('.popup__input_type_place');// ввод места 
		const cardInput = popupCards.querySelector('.popup__input_type_card');// ввод картинки
		const buttonSavePopupCards = popupCards.querySelector('.popup__button-submit');// кнопка сохранить
		const buttonClosePopupCards = popupCards.querySelector('.popup__button-close');//кнопки закрытия форм

// функции
function openClosePopup() {
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
				popupProfile.classList.remove('popup__container_opened');
				popupCards.classList.remove('popup__container_opened');
		}, 1000);
}
}

function closePopup(evt) {                  // закрытие блока с формой, чтобы закрыть не только по кнопке
	evt.preventDefault();
	if(evt.target !== evt.currentTarget)return
   openClosePopup(evt);
			popupZoomOnOff(evt);
}

function popupAddForm() {
	if(buttonAddCards){
			popupCards.classList.add('popup__container_opened');
			cardInput.value = '';
			placeInput.value = '';
			placeInput.focus();
	}
	else {
			popupCards.classList.remove('popup__container_opened');
	}
}
function formSubmitHandlerCards(evt) {          // submit
	evt.preventDefault();
	if (cardInput.value && placeInput.value) {
			elementsCards.insertAdjacentHTML('afterbegin', `<div class="element">
					<img class="element__pic" src="${cardInput.value}" alt="${placeInput.value}">
					<button class="element__button-trash" type="button" title="удалить"></button>
					<div class="element__info"><h2  class="element__title">${placeInput.value}</h2>
					<button class="element__button-like element__button-like_color_white" type="button"></button>
					</div></div>`);
			let elementCard = elementsCards.querySelector('.element');
			elementCard.addEventListener('click', clickTrash);
			popupAddForm(evt);
			closePopup(evt);
	}
	else {
			alert('Для сохрания нужно заполнить все ваши данные');
			return
	}
}

function popupEditForm() {
	 if (buttonEditProfile){
		 	popupProfile.classList.toggle('popup__container_opened');
		 	nameInput.value = profileName.textContent;
		 	jobInput.value = profileJob.textContent;
	 }
	 else {
	 	popupProfile.classList.remove('popup__container_opened');
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

function clickTrash(evt) {   // удаление карточки
	evt.preventDefault();
	evt = evt || window.evt;
	let buttonTrash = evt.target;
	if(buttonTrash.classList.contains('element__button-trash')) {
		buttonTrash.parentNode.style.display = 'none';
	}
}

function clickLike(evt) {   // ставим лайки
	evt.preventDefault();
	let buttonLike = evt.target;
	if(buttonLike.classList.contains('element__button-like')) {
			buttonLike.classList.toggle('element__button-like_color_black');
	}
}

// попап с картинкой затемнение фона
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

// открытие карточек
function clickZoom(evt) {   
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
			popupPic.src = imageCard.src;
			popupPicPlace.textContent = imageCard.alt;
			popupZoomOnOff(evt);
			buttonClosePopupZoom.addEventListener('click', popupZoomOnOff);
	}
}

popupProfile.addEventListener('submit', formSubmitHandlerProfile);// на форме для сохранения профиля
popupCards.addEventListener('submit', formSubmitHandlerCards);// на форме для сохранения карта
popup.addEventListener('click', closePopup);// закрытие попапа без кнопки
buttonEditProfile.addEventListener('click', popupEditForm);// для формы ввода профиля
buttonEditProfile.addEventListener('click', openClosePopup);// для формы ввода профиля
buttonAddCards.addEventListener('click', popupAddForm); // для формы ввода картинок
buttonAddCards.addEventListener('click', openClosePopup);
elementsCards.addEventListener('click', clickLike); // для выбора кнопки лайка
elementsCards.addEventListener('click', clickZoom); // для открытия попап картинки
elementsCards.addEventListener('click', clickTrash);// для удаления карточек
buttonSavePopupProfile.addEventListener('click', formSubmitHandlerProfile); // кнопка сохранения профиля
buttonSavePopupCards.addEventListener('click', formSubmitHandlerCards); // кнопка сохранения карт
buttonClosePopupProfile.addEventListener('click', openClosePopup); // кнопка закрытия профиля
buttonClosePopupCards.addEventListener('click', openClosePopup); // кнопка закрытия формы для карт