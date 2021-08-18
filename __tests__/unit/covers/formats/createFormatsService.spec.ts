import { CreateFormatService } from '../../../../src/services/Covers/Formats/CreateFormatService';
import {
  testSetup,
  largePhotoFactory,
  mediumPhotoFactory,
  smallPhotoFactory,
  thumbnailPhotoFactory,
} from '../../../utils';

describe('Create photo formats service', () => {
  const sut = new CreateFormatService();

  testSetup();

  it('should create the formats', async () => {
    const largeId = (await largePhotoFactory()).id;
    const mediumId = (await mediumPhotoFactory()).id;
    const smallId = (await smallPhotoFactory()).id;
    const thumbnailId = (await thumbnailPhotoFactory()).id;

    const formats = await sut.execute({ largeId, mediumId, smallId, thumbnailId });

    expect(formats).toHaveProperty('large');
  });
});
