import { renderPictures, photos } from './thumbnails.js';
import { openPictureModal } from './big-picture.js';
const pictureList = document.querySelector('.pictures');

// Отрисовка миниатюр
renderPictures();

const onPictureClick = (evt) => {
  if (evt.target.matches('img.picture__img') || evt.target.matches('span')){
    const selectedPicture = evt.target.offsetParent;
    const currentElement = photos.find((photo) => (photo.id === +selectedPicture.dataset.id));
    openPictureModal(currentElement);
  }
};

pictureList.addEventListener('click', onPictureClick);
