import { getRandomArrayElement, getRandomIdFromRangeGenerator, getRandomInteger } from './util';

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
 * Создает объект фото
 * @returns Фото
 */
const createPhoto = () => {
  const generatePhotoId = getRandomIdFromRangeGenerator(1, PHOTOS_COUNT);
  const photoId = generatePhotoId();
  const createComment = () => {
    const generateCommentId = getRandomIdFromRangeGenerator(1, PHOTOS_COUNT * MAX_COMMENTS_COUNT);
    return {
      id: generateCommentId(),
      avatar: `img/avatar-${getRandomInteger(AVATAR_MIN, AVATAR_MAX)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(AUTHORS),
    };
  };
  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from({length: getRandomInteger(0, MAX_COMMENTS_COUNT)}, createComment)
  };
};

const generatePhotos = () => Array.from({length: PHOTOS_COUNT}, createPhoto);
export {generatePhotos};
