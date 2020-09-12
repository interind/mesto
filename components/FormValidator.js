export class FormValidator {
  constructor(data, formPopup) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._form = formPopup;
  }

  enableValidation = () => {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );

    this._setEventListeners();
  };
  _setEventListeners = () => {
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._errorElement = this._form.querySelector(
          `#${inputElement.id}-error`
        );
        if (!inputElement.validity.valid) {
          inputElement.classList.add(this._inputErrorClass);
          this._errorElement.textContent = inputElement.validationMessage;
          this._errorElement.classList.add(this._errorClass);
        } else {
          inputElement.classList.remove(this._inputErrorClass);
          this._errorElement.classList.remove(this._errorClass);
          this._errorElement.textContent = '';
        }
      });
      inputElement.addEventListener('input', this._toggleButtonState);

      inputElement.addEventListener('focus', this._toggleButtonState);

      inputElement.addEventListener('focus', this._clearError);
    });
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  };
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  _checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _showInputError = () => {
    const errorElement = this._form.querySelector(
      `#${this._inputElement.id}-error`
    );

    this._inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = () => {
    const errorElement = this._form.querySelector(
      `#${this._inputElement.id}-error`
    );

    this._inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    this._clearError();
  };
  _clearError = () => {
    // очистка ошибок
    const error = this._form.querySelectorAll('.popup__input-error');

    error.forEach((errorItem) => {
      errorItem.textContent = '';
    });
  };
}
