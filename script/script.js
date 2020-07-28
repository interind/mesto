let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__container');//форма
let profileSection = document.querySelector('.profile');
let profileInfo = profileSection.querySelector('.profile-info');
let buttonOpenPopup = document.querySelector('.edit-button');//кнопка открытия формы
let buttonClosePopup = document.querySelector('.popup__button-close');//кнопка закрытия формы
let buttonSubmit = popupForm.querySelector('.popup__button-submit');//кнопка отправки данных
let profileTitle = document.querySelector('.profile__title');
let nameInput = popupForm.querySelector('.popup__input-name');
let jobInput = popupForm.querySelector('.popup__input-job');
let profileSubtitle = document.querySelector('.profile__subtitle');

function formSubmitHandler(evt) {
		if (nameInput.value != "" && jobInput.value != ""){
			nameInput.value;
   profileTitle.textContent = nameInput.value;
   jobInput.value;
			profileSubtitle.textContent = jobInput.value;
		}
		else if(nameInput.value != "" || jobInput.value != ""){
			alert('Для сохрания нужно заполнить все ваши данные');
		}
		else {
		};
		evt.preventDefault();
		popup.classList.remove('popup_opened');
}

function openPopup() {
	popup.classList.add('popup_opened');
	nameInput.focus();
}

function closePopup() {
	popup.classList.remove('popup_opened');
}

buttonOpenPopup.addEventListener('click' , openPopup);

buttonClosePopup.addEventListener('click' , closePopup);

popupForm.addEventListener('submit', formSubmitHandler);

buttonSubmit.addEventListener('click', formSubmitHandler);