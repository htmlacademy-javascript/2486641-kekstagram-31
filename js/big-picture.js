import {isEscapeKey} from './util.js';

const COUNT_NEW_COMMENTS = 5;

const bigPictureElement = document.querySelector('.big-picture');
const commentLoaderElement = bigPictureElement.querySelector('.social__comments-loader');
const counterCommentsElement = bigPictureElement.querySelector('.social__comment-shown-count');
const totalCommentsCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const closeFormElement = bigPictureElement.querySelector('.big-picture__cancel');

/**
 * Формирует елемент список комментариев
 * @param {Array} comments Массив комментариев к фото
 */
const createCommentList = (comments) => {
  const commentsElement = bigPictureElement.querySelector('.social__comments');
  const commentItemElement = commentsElement.querySelector('.social__comment').cloneNode(true);
  commentItemElement.classList.add('hidden');
  commentsElement.innerHTML = '';
  comments.forEach((comment) => {
    const avatar = commentItemElement.querySelector('.social__picture');
    avatar.src = comment.avatar;
    avatar.alt = comment.name;
    commentItemElement.append(avatar);

    const commentText = commentItemElement.querySelector('.social__text');
    commentText.textContent = comment.message;
    commentItemElement.append(commentText);
    commentsElement.append(commentItemElement.cloneNode(true));
  });
};

/**
 * Обновляет счетчик комментариев и скрывает кнопку загрузки если все комментарии показаны
 */
const checkShownCounter = () => {
  const countHiddenComments = bigPictureElement.querySelectorAll('.social__comment.hidden').length;
  counterCommentsElement.textContent = totalCommentsCountElement.textContent - countHiddenComments;
  if (countHiddenComments === 0){
    commentLoaderElement.classList.add('hidden');
  } else {
    commentLoaderElement.classList.remove('hidden');
  }
};

/**
 * Показывает скрытые комментарии
 * @param {Number} countShowComments Количество комментариев которые нужно подгрузить
 */
const showComments = (countShowComments) => {
  const hiddenCommentElements = bigPictureElement.querySelectorAll('.social__comment.hidden');
  const countHiddenComments = hiddenCommentElements.length;
  for (let i = 0; i < (countHiddenComments < countShowComments ? countHiddenComments : countShowComments); i++) {
    hiddenCommentElements[i].classList.remove('hidden');
  }
  checkShownCounter();
};

/**
 * Формирует элемент большой картинки
 * @param {Object} photo Объект Фото
 */
const renderBigPicture = (photo) => {
  bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
  totalCommentsCountElement.textContent = photo.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = photo.description;
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const onCommenstLoaderButton = () => {
  showComments(COUNT_NEW_COMMENTS);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onClosePictureModal();
  }
};

/**
 * Закрывает модальное окно с фото
 */
function onClosePictureModal() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentLoaderElement.removeEventListener('click', onCommenstLoaderButton);
  document.removeEventListener('keydown', onDocumentKeydown);
}

/**
 * Открывает модальное окно с большим фото
 * @param {Object} photo Объект фото
 */
const openPictureModal = (photo) => {
  renderBigPicture(photo);
  createCommentList(photo.comments);
  closeFormElement.addEventListener('click', onClosePictureModal);
  commentLoaderElement.addEventListener('click', onCommenstLoaderButton);
  document.addEventListener('keydown', onDocumentKeydown);
  checkShownCounter();
  showComments(COUNT_NEW_COMMENTS);
};

export {openPictureModal};
