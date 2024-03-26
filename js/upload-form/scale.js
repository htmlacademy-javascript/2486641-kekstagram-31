const Scale = {
  DEFAULT: 100,
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const scaleValueElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

const setPhotoScale = (scale = Scale.DEFAULT) => {
  imagePreviewElement.style.transform = `scale(${scale / 100})`;
};

const onZoomIn = () => {
  const scale = parseInt(scaleValueElement.value, 10) + Scale.STEP;
  if (scale <= Scale.MAX){
    scaleValueElement.value = `${scale}%`;
    setPhotoScale(scale);
  }
};

const onZoomOut = () => {
  const scale = parseInt(scaleValueElement.value, 10) - Scale.STEP;
  if (scale >= Scale.MIN){
    scaleValueElement.value = `${scale}%`;
    setPhotoScale(scale);
  }
};

export {onZoomIn, onZoomOut, setPhotoScale};
