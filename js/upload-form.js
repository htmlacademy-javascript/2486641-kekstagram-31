import { isEscapeKey } from './util.js';

const HASHTAGS_MAX_COUNT = 5;
const DESCRIPTION_MAX_LENGTH = 140;

const form = document.querySelector('.img-upload__form');
const hashtags = form.querySelector('.text__hashtags');
const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const description = form.querySelector('.text__description');

//---------------------------------- Блок валидации ----------------------------------//
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

/**
 * Проверяет формат хэштегов
 * @param {String} value Строка с хэштегами
 */
const validateHashtagsFormat = (value) => {
  if (value) {
    const hashtagsArray = value.split(' ');
    let checkSum = 0;
    hashtagsArray.forEach((element) => {
      if (hashtag.test(element)) {
        checkSum++;
      }
    });
    return (checkSum === hashtagsArray.length);
  } else {
    return true;
  }
};

/**
 * Проверяет уникальность хэштегов
 * @param {String} value Строка с хэштегами
 */
const validateHashtagsUnique = (value) => {
  const hashtagsArray = value.split(' ');
  const hashtagsUnique = new Set(hashtagsArray);
  return (hashtagsArray.length === hashtagsUnique.size);
};

/**
 * Проверяет количество хэштегов
 * @param {String} value Строка с хэштегами
 */
const validateHashtagsCount = (value) => {
  const hashtagsArray = value.split(' ');
  return (hashtagsArray.length <= HASHTAGS_MAX_COUNT);
};

/**
 * Проверяет длину описания
 * @param {String} value Описание фото
 */
const validateDescription = (value) => value.length <= DESCRIPTION_MAX_LENGTH;

pristine.addValidator(
  hashtags,
  validateHashtagsFormat,
  'неверный формат хэштэга'
);

pristine.addValidator(
  hashtags,
  validateHashtagsUnique,
  'один и тот же хэштег не может быть использован дважды'
);

pristine.addValidator(
  hashtags,
  validateHashtagsCount,
  `нельзя указать больше ${HASHTAGS_MAX_COUNT} хэштегов`
);

pristine.addValidator(
  description,
  validateDescription,
  `длина комментария не может составлять больше ${DESCRIPTION_MAX_LENGTH} символов`
);
//-------------------------------------------------------------------------------------//

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (!evt.target.matches('.text__hashtags') && !evt.target.matches('.text__description')) {
      onCloseForm();
    }
  }
};

function onCloseForm() {
  document.removeEventListener('keydown', onDocumentKeydown);
  form.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
}

const openForm = () => {
  form.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  form.querySelector('.img-upload__cancel').addEventListener('click', onCloseForm);
  form.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
    }
  });
};

export {openForm};
