import {isEscapeKey} from './util.js';

const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;

const bigPicture = document.querySelector('.big-picture');

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
 * Формирует элемент большой картинки
 * @param {Object} photo Объект Фото
 */
const renderBigPicture = (photo) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');
};

/**
 * Закрывает модальное окно с фото
 */
const closePictureModal = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

const onClickCloseButton = (evt) => {
  if (evt.target.matches('.big-picture__cancel')){
    closePictureModal();
  }
};

/**
 * Открывает модальное окно с болшим фото
 * @param {Object} photo Объект фото
 */
const openPictureModal = (photo) => {
  renderBigPicture(photo);
  createCommentList(photo.comments);
  bigPicture.addEventListener('click', (evt) => onClickCloseButton(evt));
  document.addEventListener('keydown', onDocumentKeydown);
};

export {openPictureModal};

