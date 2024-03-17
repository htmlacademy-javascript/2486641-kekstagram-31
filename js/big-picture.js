import {isEscapeKey} from './util.js';

const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;
const COUNT_NEW_COMMENTS = 5;

const bigPicture = document.querySelector('.big-picture');
const commentLoaderButton = bigPicture.querySelector('.social__comments-loader');
const counterShownComments = bigPicture.querySelector('.social__comment-shown-count');
const totalCommentsCount = bigPicture.querySelector('.social__comment-total-count');
const closeModalButton = bigPicture.querySelector('.big-picture__cancel');

/**
 * Формирует елемент список комментариев
 * @param {Array} comments Массив комментариев к фото
 */
const createCommentList = (comments) => {
  const commentList = bigPicture.querySelector('.social__comments');
  commentList.innerHTML = '';
  comments.forEach((comment) => {
    const commentListItem = document.createElement('li');
    commentListItem.classList.add('social__comment');
    commentListItem.classList.add('hidden');

    const avatar = document.createElement('img');
    avatar.classList.add('social__picture');
    avatar.src = comment.avatar;
    avatar.alt = comment.name;
    avatar.width = AVATAR_WIDTH;
    avatar.height = AVATAR_HEIGHT;
    commentListItem.append(avatar);

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = comment.message;
    commentListItem.append(commentText);
    commentList.append(commentListItem);
  });
};

/**
 * Обновляет счетчик комментариев и скрывает кнопку загрузки если все комментарии показаны
 */
const checkShownCounter = () => {
  const countHiddenComments = bigPicture.querySelectorAll('.social__comment.hidden').length;
  counterShownComments.textContent = totalCommentsCount.textContent - countHiddenComments;
  if (countHiddenComments === 0){
    commentLoaderButton.classList.add('hidden');
  } else {
    commentLoaderButton.classList.remove('hidden');
  }
};

/**
 * Показывает скрытые комментарии
 * @param {Number} countShowComments Количество комментариев которые нужно подгрузить
 */
const showComments = (countShowComments) => {
  const hiddenPictures = bigPicture.querySelectorAll('.social__comment.hidden');
  const countHiddenComments = hiddenPictures.length;
  for (let i = 0; i < (countHiddenComments < countShowComments ? countHiddenComments : countShowComments); i++) {
    hiddenPictures[i].classList.remove('hidden');
  }
  checkShownCounter();
};

/**
 * Формирует элемент большой картинки
 * @param {Object} photo Объект Фото
 */
const renderBigPicture = (photo) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  totalCommentsCount.textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const onCommenstLoaderButton = () => {
  showComments(COUNT_NEW_COMMENTS);
};

/**
 * Закрывает модальное окно с фото
 */
const closePictureModal = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentLoaderButton.removeEventListener('click', onCommenstLoaderButton);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

/**
 * Открывает модальное окно с большим фото
 * @param {Object} photo Объект фото
 */
const openPictureModal = (photo) => {
  renderBigPicture(photo);
  createCommentList(photo.comments);
  closeModalButton.addEventListener('click', closePictureModal);
  commentLoaderButton.addEventListener('click', onCommenstLoaderButton);
  document.addEventListener('keydown', onDocumentKeydown);
  checkShownCounter();
  showComments(COUNT_NEW_COMMENTS);
};

export {openPictureModal};
