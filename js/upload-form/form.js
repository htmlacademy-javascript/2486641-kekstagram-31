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
const messageSuccessElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const messageErrorElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

/**
 * Закрывает форму при нажатии на Esc
 * @param {Object} evt Объект события
 */
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

/**
 * Закрывает сообщение при нажатии на Esc
 * @param {Object} evt Объект события
 */
const onBodyKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    closeMessage();
  }
};

/**
 * Закрывает сообщение при клике в "пустоту"
 * @param {Object} evt Объект события
 */
const onClickEmptySpace = (evt) => {
  evt.stopPropagation();
  closeMessage();
};

/**
 * Закрытие сообщения
 */
function closeMessage() {
  messageSuccessElement.remove();
  messageErrorElement.remove();
  document.body.removeEventListener('keydown', onBodyKeydown);
  messageSuccessElement.removeEventListener('click', onClickEmptySpace);
  messageErrorElement.removeEventListener('click', onClickEmptySpace);
}

/**
 * Создает и показывает сообщение
 * @param {Element} messageContainer Контэйнер сообщения
 */
const showMessage = (messageContainer) => {
  document.body.append(messageContainer);
  messageContainer.querySelector('button').addEventListener('click', () => messageContainer.remove());
  messageContainer.addEventListener('click', onClickEmptySpace);
  document.body.addEventListener('keydown', onBodyKeydown);
};

/**
 * Отправляет данные из формы на сервер
 * @param {Object} evt Объект события
 */
const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = onValidate();
  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(onCloseForm)
      .then(() => showMessage(messageSuccessElement))
      .catch(() => showMessage(messageErrorElement))
      .finally(unblockSubmitButton);
  }
};

/**
 * Показывает форму загрузки фотографии
 */
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

/**
 * Закрывает форму загрузки фотографии
 */
function onCloseForm() {
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadFormElement.removeEventListener('submit', onUploadFormSubmit);
  sliderElement.noUiSlider.destroy();
  pristine.reset();
  uploadFormElement.reset();
  setEffectStyle();
  setPhotoScale();
}

export {openForm};
