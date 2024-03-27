import { renderPictures } from './thumbnails.js';
import { openPictureModal } from './big-picture.js';
import { openForm } from './upload-form/form.js';
import { getData } from './api.js';

const PHOTOS_COUNT = 25;
const ALERT_SHOW_TIME = 5000;

const pictureList = document.querySelector('.pictures');
const uploadInput = document.querySelector('.img-upload__input');

let photos = [];

const showAlert = () => {
  const alertContainer = document.querySelector('#data-error').content.querySelector('.data-error');
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Отрисовка миниатюр
getData()
  .then((elemnts) => {
    photos = elemnts.slice(0, PHOTOS_COUNT);
    renderPictures(photos);
  })
  .catch(
    () => {
      showAlert();
    }
  );

const onPictureClick = (evt) => {
  if (evt.target.matches('.picture__img')){
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
