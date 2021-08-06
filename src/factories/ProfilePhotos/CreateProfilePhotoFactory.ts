import { CreateProfilePhotoController } from '../../controllers';
import { CreateProfilePhotoService } from '../../services';

export function CreateProfilePhotoFactory() {
  const createProfilePhotoService = new CreateProfilePhotoService();
  const createProfilePhotoController = new CreateProfilePhotoController(createProfilePhotoService);

  return createProfilePhotoController;
}
