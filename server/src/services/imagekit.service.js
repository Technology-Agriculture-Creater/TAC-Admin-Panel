import ImageKit from 'imagekit';
import { v4 as uuidv4 } from 'uuid';
import config from '../config/config.js';

const imagekit = new ImageKit({
  publicKey: config.imagekit.publicKey,
  privateKey: config.imagekit.privateKey,
  urlEndpoint: config.imagekit.urlEndpoint,
});

async function uploadImage(file) {
  try {
    if (!file || !file.buffer) {
      throw new Error('No file provided or file is missing buffer');
    }

    const upload = await imagekit.upload({
      file: file.buffer,
      fileName: uuidv4() + '.jpg',
      folder: 'posts',
    });
    return upload.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Image upload failed');
  }
}

export { uploadImage };
