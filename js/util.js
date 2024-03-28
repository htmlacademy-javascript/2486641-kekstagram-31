const ALERT_SHOW_TIME = 5000;

/**
 * Возвращает рандомное целое положительное число из диапазона
 * @param {number} min - Начало диапазона
 * @param {number} max - Конец диапазона
 * @returns {number} Случайное число
 */
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 * Возвращает рандомный уникальный идетификтор из диапазона
 * @param {number} min - Начало диапазона
 * @param {number} max - Конец диапазона
 * @returns {number} Уникальный идентификатор
 */
function getRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      // eslint-disable-next-line no-console
      console.error(`Перебраны все числа из диапазона от ${ min } до ${ max}`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

/**
 * Возвращает рандомный элемент массива
 * @param {Array} elements - Массив элементов
 * @returns Элемент массива
 */
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = () => {
  const alertContainer = document.querySelector('#data-error').content.querySelector('.data-error').cloneNode(true);
  document.body.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomArrayElement, getRandomInteger, getRandomIdFromRangeGenerator, isEscapeKey, showAlert};
