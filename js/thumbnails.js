import { debounce, shuffleArray } from './util.js';

const RANDOM_PHOTO_COUNT = 10;

const templatePictureElement = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragmentElement = document.createDocumentFragment();
const picturesElement = document.querySelector('.pictures');

/**
 * Вставляет данные из объекта в шаблон, добавляет шаблон в фрагмент
 * @param {Object} photo - Объект фото
 */
const addPicture = (photo) => {
  const newPicture = templatePictureElement.cloneNode(true);
  newPicture.dataset.id = photo.id;
  newPicture.querySelector('.picture__img').src = photo.url;
  newPicture.querySelector('.picture__img').alt = photo.description;
  newPicture.querySelector('.picture__likes').textContent = photo.likes;
  newPicture.querySelector('.picture__comments').textContent = photo.comments.length;
  picturesFragmentElement.append(newPicture);
};

const clearPictures = () => picturesElement.querySelectorAll('.picture').forEach((item) => picturesElement.removeChild(item));

/**
 * Для каждого эелемента массива вызывает функцию формирования Picture, добавляет фрагмент в блок миниатюр
 * @param {Array} photos - Массив объектов Фото
 */
const renderPictures = (photos) => {
  clearPictures();
  photos.forEach((photo)=>{
    addPicture(photo);
  });
  return picturesElement.append(picturesFragmentElement);
};

const debounceRenderPictures = debounce(renderPictures);

const setImgFilter = (filter, photos) => {
  let filteredPhotos = photos.slice();
  filter.classList.add('img-filters__button--active');
  switch (filter.id) {
    case 'filter-random':
      filteredPhotos = shuffleArray(filteredPhotos).slice(0, RANDOM_PHOTO_COUNT);
      break;
    case 'filter-discussed':
      filteredPhotos = filteredPhotos.sort((a, b) => b.comments.length - a.comments.length);
      break;
  }
  debounceRenderPictures(filteredPhotos);
};

export {renderPictures, setImgFilter};
