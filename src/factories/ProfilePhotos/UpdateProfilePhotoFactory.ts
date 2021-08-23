import { UpdateProfilePhotoController } from '../../controllers/ProfilePhotos/UpdateProfilePhotoController';
import { UpdateProfilePhotoService } from '../../services/ProfilePhotos/UpdateProfilePhotoService';

export function UpdateProfilePhotoFactory() {
  const updateProfilePhotoServices = new UpdateProfilePhotoService();
  const updateProfilePhotoController = new UpdateProfilePhotoController(updateProfilePhotoServices);

  return updateProfilePhotoController;
}
