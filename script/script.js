let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__container');//форма
let profileSection = document.querySelector('.profile');
let profileInfo = profileSection.querySelector('.profile-info');
let buttonOpenPopup = document.querySelector('.profile__edit-button');//кнопка открытия формы
let buttonClosePopup = document.querySelector('.popup__button-close');//кнопка закрытия формы
let buttonSubmit = popupForm.querySelector('.popup__button-submit');//кнопка отправки данных
let profileTitle = document.querySelector('.profile__title');
let popupInput = popupForm.querySelector('.popup__input');
let nameInput = popupForm.querySelector('.popup__input_type_name');
let jobInput = popupForm.querySelector('.popup__input_type_job');
let profileSubtitle = document.querySelector('.profile__subtitle');

function closePopup() {
	popup.classList.remove('popup_opened');
}

buttonClosePopup.addEventListener('click' , closePopup);

function formSubmitHandler(evt) {
	 evt.preventDefault(evt);
		if (!nameInput.value || !jobInput.value){
			alert('Для сохрания нужно заполнить все ваши данные');
			return
		}
		profileTitle.textContent = nameInput.value;
		profileSubtitle.textContent = jobInput.value;
		closePopup();
}

function openPopup() {
	popup.classList.add('popup_opened');
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileSubtitle.textContent;
	nameInput.focus();
}

popupForm.addEventListener('submit', formSubmitHandler);

buttonOpenPopup.addEventListener('click' , openPopup);