import { setSliderOptions } from './slider.js';

const Effects = {
  none: {
    filter: '',
    measure: '',
  },
  chrome: {
    filter: 'grayscale',
    measure: '',
  },
  sepia: {
    filter: 'sepia',
    measure: '',
  },
  marvin: {
    filter: 'invert',
    measure: '%',
  },
  phobos: {
    filter: 'blur',
    measure: 'px',
  },
  heat: {
    filter: 'brightness',
    measure: '',
  },
};

const imagePreviewElement = document.querySelector('.img-upload__preview img');

const setEffect = (effect) => setSliderOptions(effect);

const onChangeEffect = (evt) => {
  if (evt.target.matches('input')){
    setEffect(evt.target.value);
  }
};

const setEffectStyle = (effect, sliderValue) => {
  imagePreviewElement.style.filter =
  effect === 'none'
    ? ''
    : `${Effects[effect].filter}(${sliderValue}${Effects[effect].measure})`;
};

export {onChangeEffect, setEffect, setEffectStyle};
