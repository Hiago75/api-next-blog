import { cloudinary } from '../config/cloudinary';
import { BadRequest } from '../custom/errors';

export async function uploadToCloudinary(file: string, formats?: { width: number }[]) {
  const uploadedPhoto = await cloudinary.uploader.upload(file, { eager: formats || '' });

  if (!uploadedPhoto) throw new BadRequest('photo_upload_error');

  const { original_filename: name, public_id: publicId, width, height, secure_url: url, eager } = uploadedPhoto;

  return { name, publicId, width, height, url, eager };
}
