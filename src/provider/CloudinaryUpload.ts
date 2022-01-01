import { cloudinary } from '../config/cloudinary';
import { BadRequest } from '../shared/errors';

export async function uploadToCloudinary(file: string, formats?: { width: number }[]) {
  const folder = process.env.NODE_ENV === 'test' ? 'tests' : 'files';
  const uploadedPhoto = await cloudinary.uploader.upload(file, { eager: formats || '', folder: `blog/${folder}` });

  if (!uploadedPhoto) throw new BadRequest('photo_upload_error');

  const { original_filename: name, public_id: publicId, width, height, secure_url: url, eager } = uploadedPhoto;

  return { name, publicId, width, height, url, eager };
}
