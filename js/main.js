import { generatePhotos } from './data';
import { generatePictures } from './thumbnails';
const pictureList = document.querySelector('.pictures');

const photos = generatePhotos();
pictureList.append(generatePictures(photos));
