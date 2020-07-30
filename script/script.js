let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__container');//форма
let buttonOpenPopup = document.querySelector('.profile__edit-button');//кнопка открытия формы
let buttonClosePopup = document.querySelector('.popup__button-close');//кнопка закрытия формы
let profileTitle = document.querySelector('.profile__title');
let nameInput = popupForm.querySelector('.popup__input_type_name');
let jobInput = popupForm.querySelector('.popup__input_type_job');
let profileSubtitle = document.querySelector('.profile__subtitle');

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

buttonOpenPopup.addEventListener('click', poPup);

buttonClosePopup.addEventListener('click', poPup);