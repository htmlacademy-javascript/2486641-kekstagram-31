const template = document.querySelector('#picture').content;
const templatePicture = template.querySelector('.picture');
const pictureListFragment = document.createDocumentFragment();

/**
 * Вставляет данные из объекта в шаблон, добавляет шаблон в фрагмент
 * @param {Object} photo - Объект фото
 */
const addPicture = (photo) => {
  const newPicture = templatePicture.cloneNode(true);
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
const generatePictures = (photos) => {
  photos.forEach((photo)=>{
    addPicture(photo);
  });
  return pictureListFragment;
};

export {generatePictures};
