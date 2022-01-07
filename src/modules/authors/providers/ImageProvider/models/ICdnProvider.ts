import { ImageProperties } from "./IImageProperties";
import { ImageSize } from "./IImageSize";

export interface ICdnProvider {
  uploadImage(file: string, sizes?: ImageSize[]): Promise<ImageProperties>
}
