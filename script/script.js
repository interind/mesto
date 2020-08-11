const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup__container');//форма
const elementTemplate = document.querySelector('.elements').content;
const elementCard = document.createElement('div');
elementCard.classList.add('element');
const imageCard = document.createElement('img');
imageCard.classList.add('element__pic');
const infoCardContainer = document.createElement('div');
infoCardContainer.classList.add('element__info');
const titleCard = document.createElement('h2');
titleCard.classList.add('element__title');
const buttonLike = document.createElement('button');
buttonLike.classList.add('element__heart'); 

let buttonOpenPopup = document.querySelector('.profile__edit-button');//кнопка открытия формы
let buttonClosePopup = popupForm.querySelector('.popup__button-close');//кнопка закрытия формы
let profileTitle = document.querySelector('.profile__title');
let nameInput = popupForm.querySelector('.popup__input_type_name');
let jobInput = popupForm.querySelector('.popup__input_type_job');
let profileSubtitle = document.querySelector('.profile__subtitle');
let buttonSavepopupForm = popupForm.querySelector('.popup__button-submit');

function poPup() {
	if (!popup.classList.contains('popup_opened')){
	popup.classList.add('popup_opened');
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileSubtitle.textContent;
	nameInput.focus();
	}
	else {
		popup.classList.remove('popup_opened');
	}
}

function closePopup(evt) {
	 evt.preventDefault(evt);
	 if(evt.target !== evt.currentTarget) return
	 popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
	 evt.preventDefault(evt);
		if (!nameInput.value || !jobInput.value){
			alert('Для сохрания нужно заполнить все ваши данные');
			return
		}
		profileTitle.textContent = nameInput.value;
		profileSubtitle.textContent = jobInput.value;
		poPup();
}

popupForm.addEventListener('submit', formSubmitHandler);

popup.addEventListener('click', closePopup), false;

buttonSavepopupForm.addEventListener('click', formSubmitHandler);

buttonOpenPopup.addEventListener('click', poPup);

buttonClosePopup.addEventListener('click', poPup);