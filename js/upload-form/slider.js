import { setEffectStyle } from './effects.js';

const SliderConfigs = {
  none: {
    range: {min: 0, max: 100,},
    start: 100,
    step: 1,
    connect: 'lower',
  },
  chrome:
  {
    range: {min: 0, max: 1,},
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  sepia: {
    range: {min: 0, max: 1,},
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  marvin: {range: {min: 0, max: 100,},
    start: 100,
    step: 1,
    connect: 'lower',
  },
  phobos: {
    range: {min: 0, max: 3,},
    start: 3,
    step: 0.1,
    connect: 'lower',
  },
  heat: {
    range: {min: 1, max: 3,},
    start: 3,
    step: 0.1,
    connect: 'lower',
  },
};

const sliderValueElement = document.querySelector('.effect-level__value');
const effectElements = document.querySelectorAll('.effects__radio');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');

const onChangeSlider = () => {
  effectElements.forEach((item) => {
    if (item.checked) {
      setEffectStyle(item.value, sliderElement.noUiSlider.get());
      if (item.value === 'none') {
        sliderContainerElement.classList.add('hidden');
      } else {
        sliderContainerElement.classList.remove('hidden');
        sliderValueElement.value = sliderElement.noUiSlider.get();
      }
    }
  });
};

const setSliderOptions = (effect) => {
  sliderElement.noUiSlider.updateOptions(SliderConfigs[effect]);
};

const createSlider = () => {
  noUiSlider.create(sliderElement, SliderConfigs['none']);
  sliderElement.noUiSlider.on('update', onChangeSlider);
};

export { setSliderOptions, createSlider};
