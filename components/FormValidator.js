class FormValidator {
 constructor(objForm, elementForm) {
  this._form = elementForm;
  this._formSelector = objForm.formSelector;
  this._inputSelector = objForm.inputSelector;
  this._submitButtonSelector = objForm.submitButtonSelector;
  this._inactiveButtonClass = objForm.inactiveButtonClass;
  this._inputErrorClass = objForm.inputErrorClass;
  this._errorClass = objForm.errorClass;
 }

 enableValidation()  {
  if(this._form.classList.contains(this._formSelector)){
  const formList = Array.from(
    document.querySelectorAll(this._formSelector)
  );
  
  formList.forEach((formElement) => {

    this._setEventListeners(formElement);
  });
 }
}

_setEventListeners(formElement) {
 
 const inputList = Array.from(
   formElement.querySelectorAll(this._inputSelector)
 );
 
 const buttonElement = formElement.querySelector(this._submitButtonSelector);
 
 this._toggleButtonState(inputList, buttonElement);
 inputList.forEach((inputElement) => {
   inputElement.addEventListener('input', function () {
     this._checkInputValidity(formElement, inputElement);
   
     this._toggleButtonState(inputList, buttonElement);
   });
   inputElement.addEventListener('focus', function () {
     this._toggleButtonState(inputList, buttonElement);
   });
 });
}

_toggleButtonState(inputList, buttonElement){
 
 if (this._hasInvalidInput(inputList)) {
   buttonElement.classList.add(this._inactiveButtonClass);
   buttonElement.setAttribute('disabled', true);

 } else {
   buttonElement.classList.remove(this._inactiveButtonClass);
   buttonElement.removeAttribute('disabled');
 }
}

_hasInvalidInput(inputList) {
 return inputList.some((inputElement) => {
   return !inputElement.validity.valid;
 });
}

_checkInputValidity(formElement, inputElement) {
  
 if (!inputElement.validity.valid) {
   
   this._showInputError(formElement, inputElement, inputElement.validationMessage);
 }
 else{
   this.Array_hideInputError(formElement, inputElement);
 }
 
}

_hideInputError (formElement, inputElement) {

 const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
 
 inputElement.classList.remove(this._inputErrorClass);
 errorElement.classList.remove(this._errorClass);
 errorElement.textContent = '';
 
}

_showInputError(formElement, inputElement, errorMessage) {
 
 const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

 inputElement.classList.add(this._inputErrorClass);
 errorElement.textContent = errorMessage;
 errorElement.classList.add(this._errorClass);

}
}