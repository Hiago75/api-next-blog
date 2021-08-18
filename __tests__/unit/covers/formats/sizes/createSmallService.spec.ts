import faker from 'faker';
import { CreateSmallService } from '../../../../../src/services/Covers/Formats/Sizes/CreateSmallService';
import { testSetup } from '../../../../utils';

describe('Create small photo service', () => {
  const sut = new CreateSmallService();
  const fakeUrl = faker.internet.url();

  testSetup();

  it('should be able to create the small image format', async () => {
    const smallPhoto = await sut.execute({ width: 1000, height: 500, url: fakeUrl });

    expect(smallPhoto).toHaveProperty('width', 1000);
  });
});
