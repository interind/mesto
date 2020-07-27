let nameInput = document.querySelector('.popup__input-name');//ввод имяни
let jobInput = document.querySelector('.popup__input-job');//ввод кем работает
let popup = document.querySelector('.popup');//блок с формой
let popupForm = document.querySelector('.popup__container');//форма
let buttonOpenPopup = document.querySelector('.edit-button');//кнопка открытия формы
let buttonClosePopup = document.querySelector('.popup__button-close');//кнопка закрытия формы
let buttonSubmit = document.querySelector('.popup__button-submit');//кнопка отправки данных

function userText() {
  nameInput = document.querySelector('.popup__input-name').value;
  document.querySelector('.profile__title').textContent = nameInput;
  jobInput = document.querySelector('.popup__input-job').value;
  document.querySelector('.profile__subtitle').textContent = jobInput;
  popup.classList.remove('popup_opened');
}

buttonOpenPopup.addEventListener('click' , function openPopup() {
  popup.classList.add('popup_opened');
});

buttonClosePopup.addEventListener('click' , function closePopup() {
  popup.classList.remove('popup_opened');
});

function formSubmitHandler (evt) {
  evt.preventDefault();
}

popupForm.addEventListener('submit', formSubmitHandler);

buttonSubmit.addEventListener('click', userText);

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