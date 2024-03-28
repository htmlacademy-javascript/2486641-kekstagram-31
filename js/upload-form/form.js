import { onChangeEffect, setEffect } from './effects.js';
import { createSlider } from './slider.js';
import { isEscapeKey } from '../util.js';
import { onValidate } from './validation.js';
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

const onDocumentKeydown = (evt) => {
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

const setUploadFormSubmit = (onSuccess) => {
  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = onValidate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(
          (err) => {
            console.log(err);
            //showAlert(err.message);
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

function onCloseForm() {
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadFormElement.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  setPhotoScale();
  setEffect('none');
  sliderElement.noUiSlider.destroy();
}

const openForm = () => {
  uploadFormElement.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadFormElement.querySelector('.img-upload__cancel').addEventListener('click', onCloseForm);
  scaleSmallerElement.addEventListener('click', onZoomOut);
  scaleBiggerElement.addEventListener('click', onZoomIn);
  effectListElement.addEventListener('click', onChangeEffect);
  createSlider();
  setUploadFormSubmit(onCloseForm);
};


export {openForm};
