const HASHTAGS_MAX_COUNT = 5;
const DESCRIPTION_MAX_LENGTH = 140;

const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const ValidationErrors = {
  HASHTAG_FORMAT: 'неверный формат хэштега',
  HASHTAG_COUNT: `нельзя указать больше ${HASHTAGS_MAX_COUNT} хэштегов`,
  HASHTAG_UNIQUE: 'один и тот же хэштег не может быть использован дважды',
  COMMENT_LENGTH: `длина комментария не может составлять больше ${DESCRIPTION_MAX_LENGTH} символов`,
};

/**
 * Проверяет формат хэштегов
 * @param {String} value Строка с хэштегами
 */
const validateHashtagsFormat = (value) => {
  if (value.trim()) {
    const hashtagsArray = value.trim().split(' ');
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
  const hashtagsArray = value.trim().split(' ');
  const hashtagsUnique = new Set(hashtagsArray);
  return (hashtagsArray.length === hashtagsUnique.size);
};

/**
 * Проверяет количество хэштегов
 * @param {String} value Строка с хэштегами
 */
const validateHashtagsCount = (value) => {
  const hashtagsArray = value.trim().split(' ');
  return (hashtagsArray.length <= HASHTAGS_MAX_COUNT);
};

/**
 * Проверяет длину описания
 * @param {String} value Описание фото
 */
const validateDescription = (value) => value.trim().length <= DESCRIPTION_MAX_LENGTH;

export {ValidationErrors, validateDescription, validateHashtagsCount, validateHashtagsFormat, validateHashtagsUnique};
