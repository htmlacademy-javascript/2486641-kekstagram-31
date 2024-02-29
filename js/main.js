import { generatePhotos } from './data';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const AUTHORS = [
  'Анна',
  'Мария',
  'София',
  'Алиса',
  'Виктория',
  'Александр',
  'Михаил',
  'Иван',
  'Даниил',
  'Артем'
];

const DESCRIPTIONS = [
  'На даче',
  'На пляже',
  'На работе',
  'С друзьями',
  'С коллегами',
];

const PHOTOS_COUNT = 25;
const MAX_COMMENTS_COUNT = 30;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const AVATAR_MIN = 1;
const AVATAR_MAX = 6;

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

/**
 * Генератор идентификаторв для фото
 */
const generatePhotoId = getRandomIdFromRangeGenerator(1, PHOTOS_COUNT);
/**
 * Генератор идентификаторов для комментариев
 */
const generateCommentId = getRandomIdFromRangeGenerator(1, PHOTOS_COUNT * MAX_COMMENTS_COUNT);

/**
 * Создает объект комментарий
 * @returns {Object} Комментарий
 */
const createComment = () => {
  const commentId = generateCommentId();
  return {
    id: commentId,
    avatar: `img/avatar-${getRandomInteger(AVATAR_MIN, AVATAR_MAX)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(AUTHORS),
  };
};

/**
 * Создает объект фото
 * @returns {Object} Фото
 */
const createPhoto = () => {
  const photoId = generatePhotoId();
  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from({length: getRandomInteger(0, MAX_COMMENTS_COUNT)}, createComment)
  };
};

const photos = Array.from({length: PHOTOS_COUNT}, createPhoto);

// eslint-disable-next-line no-console
console.log(generatePhotos());
