import ImageKit from 'imagekit';
import { v4 as uuidv4 } from 'uuid';
import config from '../config/config.ts';

const imagekit = new ImageKit({
  publicKey: config.IMAGEKIT_PUBLIC_KEY as string,
  privateKey: config.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: config.IMAGEKIT_URL_ENDPOINT as string,
});

async function uploadImage(file: Express.Multer.File) {
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
