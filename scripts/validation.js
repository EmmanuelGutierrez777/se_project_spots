const settings = {
  errorBorder: "form__input_type_error",
  errorText: "form__input_error_active",
  buttonInactive: "form__submit_inactive",
  formSelector: ".modal__form-input",
  buttonSelector: ".modal__form-button",
  formListSelector: ".modal__form",
  fieldsetSelector: ".modal__form-profile",
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.errorBorder);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorText);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.errorBorder);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorText);
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config,
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.buttonInactive);
  } else {
    buttonElement.classList.remove(config.buttonInactive);
  }
};

function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.formSelector),
  );
  const buttonElement = formElement.querySelector(config.buttonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(
    document.querySelectorAll(config.formListSelector),
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      formElement.reset();
    });
    const fieldsetList = Array.from(
      formElement.querySelectorAll(config.fieldsetSelector),
    );
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset, config);
    });
  });
}

enableValidation(settings);
