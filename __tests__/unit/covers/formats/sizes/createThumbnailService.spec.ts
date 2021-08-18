import faker from 'faker';
import { CreateThumbnailService } from '../../../../../src/services/Covers/Formats/Sizes/CreateThumbnailService';
import { testSetup } from '../../../../utils';

describe('Create thumbnail photo service', () => {
  const sut = new CreateThumbnailService();
  const fakeUrl = faker.internet.url();

  testSetup();

  it('should be able to create the thumbnail image format', async () => {
    const thumbnailPhoto = await sut.execute({ width: 500, height: 250, url: fakeUrl });

    expect(thumbnailPhoto).toHaveProperty('width', 500);
  });
});
