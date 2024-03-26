import { onChangeEffect, setEffect } from './effects.js';
import { createSlider } from './slider.js';
import { isEscapeKey } from '../util.js';
import { onValidate } from './validation.js';
import { onZoomIn, onZoomOut, setPhotoScale } from './scale.js';

const uploadFormElement = document.querySelector('.img-upload__uploadFormElement');
const scaleSmallerElement = uploadFormElement.querySelector('.scale__control--smaller');
const scaleBiggerElement = uploadFormElement.querySelector('.scale__control--bigger');
const effectListElement = uploadFormElement.querySelector('.effects__list');
const sliderElement = uploadFormElement.querySelector('.effect-level__slider');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (!evt.target.matches('.text__hashtags') && !evt.target.matches('.text__description')) {
      onCloseuploadFormElement();
    }
  }
};

function onCloseuploadFormElement() {
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadFormElement.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  setPhotoScale();
  setEffect('none');
  sliderElement.noUiSlider.destroy();
}

const openuploadFormElement = () => {
  uploadFormElement.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadFormElement.querySelector('.img-upload__cancel').addEventListener('click', onCloseuploadFormElement);
  uploadFormElement.addEventListener('submit', onValidate);
  scaleSmallerElement.addEventListener('click', onZoomOut);
  scaleBiggerElement.addEventListener('click', onZoomIn);
  effectListElement.addEventListener('click', (evt) => onChangeEffect(evt));
  createSlider();
};

export {openuploadFormElement};
