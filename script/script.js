let popup = document.querySelector('.popup');
console.log(popup);
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
			popup.classList.remove('popup_opened');
		}
		else {
			alert('Заполните все поля');
		}
		;
		evt.preventDefault();
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



/*// Находим форму в DOM
let formElement = // Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
												// Так мы можем определить свою логику отправки.
												// О том, как это делать, расскажем позже.

	// Находим поля формы в DOM
	let nameInput = // Воспользуйтесь инструментом .querySelector()
	let jobInput = // Воспользуйтесь инструментом .querySelector()

	// Получите значение полей из свойства value

	// Выберите элементы, куда должны быть вставлены значения полей

	// Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);*/ 