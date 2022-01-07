import { ICdnProvider } from "../models/ICdnProvider";
import { ImageProperties } from "../models/IImageProperties";
import { ImageSize } from "../models/IImageSize";
import { cloudinary } from '@config/cloudinary';
import { BadRequest } from '@shared/errors';

export class CloudinaryCdnProvider implements ICdnProvider {
  // TODO: upload from buffer instead the file itself
  async uploadImage(file: string, sizes?: ImageSize[]): Promise<ImageProperties> {
    const folder = process.env.NODE_ENV === 'test' ? 'tests' : 'files';
    const uploadedPhoto = await cloudinary.uploader.upload(file, { eager: sizes || '', folder: `blog/${folder}` });

    if (!uploadedPhoto) throw new BadRequest('photo_upload_error');

    const { original_filename: name, public_id: publicId, width, height, secure_url: url, eager } = uploadedPhoto;

    return { name, publicId, width, height, url, eager };
  }
}
