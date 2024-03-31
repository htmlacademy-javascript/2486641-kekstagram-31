const SliderConfigs = {
  none: {
    range: {min: 0, max: 100,},
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value),
    },
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

const Effects = {
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
const sliderValueElement = document.querySelector('.effect-level__value');
const effectElements = document.querySelectorAll('.effects__radio');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');

/**
 * Устанавливает стиль изображения
 * @param {String} effect Название эффекта
 * @param {Number} sliderValue Интенсивности эффекта
 */
const setEffectStyle = (effect = 'none', sliderValue) => {
  imagePreviewElement.style.filter =
  effect === 'none'
    ? ''
    : `${Effects[effect].filter}(${sliderValue}${Effects[effect].measure})`;
};

/**
 * Меняет значение интенсивности при изменении слайдера
 */
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

/**
 * Создает слайдер с начальной конфигурацией
 */
const createSlider = () => {
  noUiSlider.create(sliderElement, SliderConfigs['none']);
  sliderElement.noUiSlider.on('update', onChangeSlider);
};

/**
 * Устанавливает настройки слайдера в соответствии с выбранным эффектом
 * @param {String} effect Название эффекта
 */
const setSliderOptions = (effect) => {
  sliderElement.noUiSlider.updateOptions(SliderConfigs[effect]);
};

/**
 * Срабатывает при изменении эффекта
 * @param {Object} evt Объект события
 */
const onChangeEffect = (evt) => {
  if (evt.target.matches('input')){
    setSliderOptions(evt.target.value);
  }
};


export {onChangeEffect, setEffectStyle, createSlider};
