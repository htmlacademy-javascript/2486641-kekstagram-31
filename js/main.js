import { renderPictures, photos } from './thumbnails.js';
import { openPictureModal } from './big-picture.js';
import { openForm } from './upload-form.js';
const pictureList = document.querySelector('.pictures');
const uploadInput = document.querySelector('.img-upload__input');

// Отрисовка миниатюр
renderPictures();

const onPictureClick = (evt) => {
  if (evt.target.matches('.picture__img') /*|| evt.target.matches('span')*/){
    const selectedPicture = evt.target.offsetParent;
    const currentElement = photos.find((photo) => (photo.id === +selectedPicture.dataset.id));
    openPictureModal(currentElement);
  }
};

pictureList.addEventListener('click', onPictureClick);

const onUploadImage = () => {
  openForm();
};

uploadInput.addEventListener('change', onUploadImage);
