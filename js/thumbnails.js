const template = document.querySelector('#picture').content;
const templatePicture = template.querySelector('.picture');
const pictureList = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();

/**
 * Вставляет данные из объекта в шаблон, добавляет шаблон в фрагмент
 * @param {Object} photo - Объект фото
 */
const addPicture = (photo) => {
  const newPicture = templatePicture.cloneNode(true);
  const newImage = newPicture.querySelector('.picture__img');
  newImage.src = photo.url;
  newImage.alt = photo.description;
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
  pictureList.append(pictureListFragment);
};


export {generatePictures};
