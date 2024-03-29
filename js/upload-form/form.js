import { createSlider, onChangeEffect, setEffectStyle } from './effects.js';
import { isEscapeKey } from '../util.js';
import { onValidate, pristine } from './validation.js';
import { onZoomIn, onZoomOut, setPhotoScale } from './scale.js';
import { sendData } from '../api.js';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const uploadFormElement = document.querySelector('.img-upload__form');
const scaleSmallerElement = uploadFormElement.querySelector('.scale__control--smaller');
const scaleBiggerElement = uploadFormElement.querySelector('.scale__control--bigger');
const effectListElement = uploadFormElement.querySelector('.effects__list');
const sliderElement = uploadFormElement.querySelector('.effect-level__slider');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const cancelButtonElement = uploadFormElement.querySelector('.img-upload__cancel');

const onDocumentKeydown = (evt) => {
  evt.stopPropagation();
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (!evt.target.matches('.text__hashtags') && !evt.target.matches('.text__description')) {
      onCloseForm();
    }
  }
};

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

const showMessage = (messageType) => {
  const messageContainer = document.querySelector(`#${messageType}`).content.querySelector(`.${messageType}`).cloneNode(true);
  document.body.append(messageContainer);
  messageContainer.querySelector(`.${messageType}__button`).addEventListener('click', () => messageContainer.remove());
  messageContainer.addEventListener('click', (evt) => {
    if (evt.target.matches(`.${messageType}`)){
      evt.stopPropagation();
      messageContainer.remove();
    }
  });
  document.body.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
      messageContainer.remove();
    }
  });
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = onValidate();
  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(onCloseForm)
      .then(() => showMessage('success'))
      .catch(() => showMessage('error'))
      .finally(unblockSubmitButton);
  }
};

const openForm = () => {
  uploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  cancelButtonElement.addEventListener('click', onCloseForm);
  scaleSmallerElement.addEventListener('click', onZoomOut);
  scaleBiggerElement.addEventListener('click', onZoomIn);
  effectListElement.addEventListener('click', onChangeEffect);
  uploadFormElement.addEventListener('submit', onUploadFormSubmit);
  createSlider();
};

const resetForm = () => {
  uploadFormElement.reset();
  setEffectStyle();
  setPhotoScale();
};

function onCloseForm() {
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  //document.removeEventListener('keydown', onDocumentKeydown);
  uploadFormElement.removeEventListener('submit', onUploadFormSubmit);
  resetForm();
  sliderElement.noUiSlider.destroy();
  pristine.reset();
}

export {openForm};
