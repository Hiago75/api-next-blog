import { CreateCoversController } from '../../controllers';
import { CreateFormatController } from '../../controllers/Formats/CreateFormatController';
import { CreateLargeController } from '../../controllers/Formats/Sizes/CreateLargeController';
import { CreateMediumController } from '../../controllers/Formats/Sizes/CreateMediumController';
import { CreateSmallController } from '../../controllers/Formats/Sizes/CreateSmallController';
import { CreateThumbnailController } from '../../controllers/Formats/Sizes/CreateThumbnailController';
import { CreateCoverService } from '../../services';
import { CreateFormatService } from '../../services/Formats/CreateFormatService';
import { CreateLargeService } from '../../services/Formats/Sizes/CreateLargeService';
import { CreateMediumService } from '../../services/Formats/Sizes/CreateMediumService';
import { CreateSmallService } from '../../services/Formats/Sizes/CreateSmallService';
import { CreateThumbnailService } from '../../services/Formats/Sizes/CreateThumbnailService';

export const CreateCoverFactory = () => {
  const createLargeService = new CreateLargeService();
  const createLargeController = new CreateLargeController(createLargeService);

  const createMediumService = new CreateMediumService();
  const createMediumController = new CreateMediumController(createMediumService);

  const createSmallService = new CreateSmallService();
  const createSmallController = new CreateSmallController(createSmallService);

  const createThumbnailService = new CreateThumbnailService();
  const createThumbnailController = new CreateThumbnailController(createThumbnailService);

  const createFormatService = new CreateFormatService();
  const createFormatController = new CreateFormatController(
    createLargeController,
    createMediumController,
    createSmallController,
    createThumbnailController,
    createFormatService,
  );

  const createCoverService = new CreateCoverService();
  const createCoverController = new CreateCoversController(createCoverService, createFormatController);

  return createCoverController;
};
