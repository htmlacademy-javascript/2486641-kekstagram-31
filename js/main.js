import { renderPictures, setImgFilter } from './thumbnails.js';
import { openPictureModal } from './big-picture.js';
import { openForm as openUploadForm} from './upload-form/form.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

const picturesElement = document.querySelector('.pictures');
const uploadInputElement = document.querySelector('.img-upload__input');
const filtersElement = document.querySelector('.img-filters');
const errorElement = document.querySelector('#data-error').content.querySelector('.data-error').cloneNode(true);

let photos = [];

const onFilterClick = (evt) => {
  if (evt.target.matches('button')){
    filtersElement.querySelectorAll('button').forEach((element) => {
      element.classList.remove('img-filters__button--active');
    });
    setImgFilter(evt.target, photos);
  }
};

const onPictureClick = (evt) => {
  const selectedPicture = evt.target.closest('a');
  if (selectedPicture){
    const currentElement = photos.find((photo) => (photo.id === +selectedPicture.dataset.id));
    openPictureModal(currentElement);
  }
};

const onUploadImage = () => openUploadForm();

const start = () => {
  // Отрисовка миниатюр
  getData()
    .then((elements) => {
      photos = elements;
      renderPictures(photos);
      filtersElement.classList.remove('img-filters--inactive');
      filtersElement.addEventListener('click', onFilterClick);
    })
    .catch(
      () => showAlert(errorElement)
    );
  picturesElement.addEventListener('click', onPictureClick);
  uploadInputElement.addEventListener('change', onUploadImage);
};

start();
