import faker from 'faker';
import { CreateMediumService } from '../../../../../src/services/Covers/Formats/Sizes/CreateMediumService';
import { testSetup } from '../../../../utils';

describe('Create medium photo service', () => {
  const sut = new CreateMediumService();
  const fakeUrl = faker.internet.url();

  testSetup();

  it('should be able to create the medium image format', async () => {
    const mediumPhoto = await sut.execute({ width: 1280, height: 720, url: fakeUrl });

    expect(mediumPhoto).toHaveProperty('width', 1280);
  });
});
