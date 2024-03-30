import { shuffleArray } from './util.js';

const template = document.querySelector('#picture').content;
const templatePicture = template.querySelector('.picture');
const pictureListFragment = document.createDocumentFragment();
const pictureList = document.querySelector('.pictures');

/**
 * Вставляет данные из объекта в шаблон, добавляет шаблон в фрагмент
 * @param {Object} photo - Объект фото
 */
const addPicture = (photo) => {
  const newPicture = templatePicture.cloneNode(true);
  newPicture.dataset.id = photo.id;
  newPicture.querySelector('.picture__img').src = photo.url;
  newPicture.querySelector('.picture__img').alt = photo.description;
  newPicture.querySelector('.picture__likes').textContent = photo.likes;
  newPicture.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureListFragment.append(newPicture);
};

/**
 * Для каждого эелемента массива вызывает функцию формирования Picture, добавляет фрагмент в блок миниатюр
 * @param {Array} photos - Массив объектов Фото
 */
const renderPictures = (photos) => {
  // eslint-disable-next-line no-console
  console.log('Call renderPictures');
  pictureList.querySelectorAll('.picture').forEach((item) => {
    pictureList.removeChild(item);
  });
  photos.forEach((photo)=>{
    addPicture(photo);
  });
  return pictureList.append(pictureListFragment);
};

const setImgFilter = (filter, photos) => {
  let filteredPhotos = [];
  filter.classList.add('img-filters__button--active');
  switch (filter.id) {
    case 'filter-default':
      filteredPhotos = photos.slice();
      break;
    case 'filter-random':
      filteredPhotos = shuffleArray(photos.slice()).slice(0, 10);
      break;
    case 'filter-discussed':
      filteredPhotos = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
      break;
  }
  renderPictures(filteredPhotos);
};

export {renderPictures, setImgFilter};
