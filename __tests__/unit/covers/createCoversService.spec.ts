import { CreateCoverService } from '../../../src/services/Covers/CreateCoverService';
import { formatsFactory, testSetup } from '../../utils';

describe('Create cover service', () => {
  const sut = new CreateCoverService();

  testSetup();

  it('should be able to create a new cover', async () => {
    const formatId = (await formatsFactory()).id;

    const cover = await sut.execute({
      name: 'test',
      publicId: 'Some random ID',
      width: 2500,
      height: 1920,
      formatId,
      url: 'www.url.com',
      provider: 'myself',
    });

    expect(cover).toHaveProperty('name', 'test');
  });
});
