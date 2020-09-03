// const clearError = (form) => { 

//   const button = form.querySelector('.popup__button-submit');
// if (button.classList.contains('popup__button-submit_disabled')) { 
//   button.classList.remove('popup__button-submit_disabled'); 
//   button.removeAttribute('disabled'); 

// const error = Array.from(form.querySelectorAll('.popup__input')); 
// error.forEach((errorItem) => { 
//   errorItem.textContent = ''; 
// }); 
// } 
// };


const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
 
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
 
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);

};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  debugger;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
  
};

const checkInputValidity = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  
  if (!inputElement.validity.valid) {
    
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  }
  else{
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
  
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);

  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
 
  const inputList = Array.from(
    formElement.querySelectorAll(inputSelector)
  );
  const buttonElement = formElement.querySelector(submitButtonSelector);
 
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, rest);
    
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = ({formSelector, ...rest}) => {
  
  const formList = Array.from(
    document.querySelectorAll(formSelector)
  );
  
  formList.forEach((formElement) => {
    
    setEventListeners(formElement, rest);
  });
};
