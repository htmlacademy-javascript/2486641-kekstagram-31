import { setSliderOptions } from './slider.js';

const Effects = {
  none: {
    class: 'effects__preview--none',
    filter: '',
    measure: '',
  },
  chrome: {
    class: 'effects__preview--chrome',
    filter: 'grayscale',
    measure: '',
  },
  sepia: {
    class: 'effects__preview--sepia',
    filter: 'sepia',
    measure: '',
  },
  marvin: {
    class: 'effects__preview--marvin',
    filter: 'invert',
    measure: '%',
  },
  phobos: {
    class: 'effects__preview--phobos',
    filter: 'blur',
    measure: 'px',
  },
  heat: {
    class: 'effects__preview--heat',
    filter: 'brightness',
    measure: '',
  },
};

const imagePreviewElement = document.querySelector('.img-upload__preview img');

const setEffect = (effect) => {
  imagePreviewElement.removeAttribute('class');
  imagePreviewElement.classList.add(Effects[effect].class);
  setSliderOptions(effect);
};

const onChangeEffect = (evt) => {
  if (evt.target.matches('input')){
    setEffect(evt.target.value);
  }
};

const setEffectStyle = (effect, sliderValue) => {
  if (effect === 'none') {
    imagePreviewElement.removeAttribute('class');
    imagePreviewElement.removeAttribute('style');
  } else {
    imagePreviewElement.style.filter = `${Effects[effect].filter}(${sliderValue}${Effects[effect].measure})`;
  }
};

export {onChangeEffect, setEffect, setEffectStyle};
