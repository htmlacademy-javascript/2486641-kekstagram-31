import { generatePhotos } from './data';
import { generatePictures } from './thumbnails';

const photos = generatePhotos();
generatePictures(photos);
