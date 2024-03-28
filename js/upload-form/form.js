import { onChangeEffect, setEffectStyle } from './effects.js';
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
const inputFileElement = uploadFormElement.querySelector('.img-upload__input');
const textHashtagsElement = uploadFormElement.querySelector('.text__hashtags');
const textDescriptionElement = uploadFormElement.querySelector('.text__description');

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

const showAlert = (alertType) => {
  const alertContainer = document.querySelector(`#${alertType}`).content.querySelector(`.${alertType}`).cloneNode(true);
  document.body.append(alertContainer);
  alertContainer.querySelector(`.${alertType}__button`).addEventListener('click', () => document.body.removeChild(alertContainer));
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = onValidate();
  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(onCloseForm)
      .then(() => showAlert('success'))
      .catch(() => showAlert('error'))
      .finally(unblockSubmitButton);
  }
};
 

//   const isValid = onValidate();
//   if (isValid) {
//     blockSubmitButton();
//     sendData(new FormData(evt.target))
//       .then(() => {
//         onCloseForm();
//         showAlert('success');
//       })
//       .catch(
//         () => {
//           showAlert('error');
//         }
//       )
//       .finally(unblockSubmitButton);
//   }
// };

function onCloseForm() {
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadFormElement.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  setPhotoScale();
  sliderElement.noUiSlider.destroy();
  inputFileElement.value = '';
  textDescriptionElement.value = '';
  textHashtagsElement.value = '';
  uploadFormElement.removeEventListener('submit', onUploadFormSubmit);
  document.getElementById('effect-none').checked = true;
  setEffectStyle('none', 100);
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
  uploadFormElement.addEventListener('submit', onUploadFormSubmit);
};


export {openForm};
