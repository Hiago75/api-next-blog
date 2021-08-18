import faker from 'faker';
import { CreateLargeService } from '../../../../../src/services/Covers/Formats/Sizes/CreateLargeService';
import { testSetup } from '../../../../utils';

describe('Create large photo service', () => {
  const sut = new CreateLargeService();
  const fakeUrl = faker.internet.url();

  testSetup();

  it('should be able to create the large image format', async () => {
    const largePhoto = await sut.execute({ width: 1920, height: 1080, url: fakeUrl });

    expect(largePhoto).toHaveProperty('width', 1920);
  });
});
