import { renderPictures } from './thumbnails.js';
import { openPictureModal } from './big-picture.js';
import { openForm } from './upload-form/form.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

const PHOTOS_COUNT = 25;

const pictureList = document.querySelector('.pictures');
const uploadInput = document.querySelector('.img-upload__input');

let photos = [];

// Отрисовка миниатюр
getData()
  .then((elemnts) => {
    photos = elemnts.slice(0, PHOTOS_COUNT);
    renderPictures(photos);
  })
  .catch(
    () => showAlert()
  );

const onPictureClick = (evt) => {
  const selectedPicture = evt.target.closest('a');
  if (selectedPicture){
    const currentElement = photos.find((photo) => (photo.id === +selectedPicture.dataset.id));
    openPictureModal(currentElement);
  }
};

pictureList.addEventListener('click', onPictureClick);

const onUploadImage = () => {
  openForm();
};

uploadInput.addEventListener('change', onUploadImage);
