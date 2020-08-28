const showInputError = (formElement, inputElement, errorMessage) => {
 const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
 inputElement.classList.add(`${objValidation.inputErrorClass}`);
 errorElement.textContent = errorMessage;
 errorElement.classList.add(`${objValidation.errorClass}`);
};

const hideInputError = (formElement, inputElement) => {
 const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
 inputElement.classList.remove(`${objValidation.inputErrorClass}`);
 errorElement.classList.remove(`${objValidation.errorClass}`);
 errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
 if (!inputElement.validity.valid) {
   showInputError(formElement, inputElement, inputElement.validationMessage);
 } else {
   hideInputError(formElement, inputElement);
 }
};

const hasInvalidInput = (inputList) => {
 return inputList.some((inputElement) => {
   return !inputElement.validity.valid;
 });
};

const toggleButtonState = (inputList, buttonElement) => {
 if(hasInvalidInput(inputList)){

   buttonElement.classList.add(`${objValidation.inactiveButtonClass}`);
 }
 else{
   buttonElement.classList.remove(`${objValidation.inactiveButtonClass}`);

 }
};

const setEventListeners = (formElement) => {
 const inputList = Array.from(formElement.querySelectorAll(`${objValidation.inputSelector}`));
 const buttonElement = formElement.querySelector(`${objValidation.submitButtonSelector}`);
 toggleButtonState(inputList, buttonElement);
 inputList.forEach((inputElement) => {
   inputElement.addEventListener('input', function () {
     checkInputValidity(formElement, inputElement);
     toggleButtonState(inputList, buttonElement);
   });
 });
};

const enableValidation = () => {
 const formList = Array.from(document.querySelectorAll(`${objValidation.formSelector}`));
 
 formList.forEach((formElement) => {
   formElement.addEventListener('submit', function (evt) {
     evt.preventDefault();
   });
    setEventListeners(formElement);

 });
};