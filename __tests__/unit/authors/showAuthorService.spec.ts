import { authorFactory, testSetup } from '../../utils';
import { ShowAuthorService } from '../../../src/services';

describe('Show author service', () => {
  const sut = new ShowAuthorService();

  testSetup();

  it('should not be able to show a non-existent author', async () => {
    const id = 'invalid Id';

    await expect(sut.execute({ id })).rejects.toEqual(new Error('user_not_found_error'));
  });

  it('should be able to show the sent author', async () => {
    const { id } = await authorFactory();

    const author = await sut.execute({ id });

    expect(author).toHaveProperty('id', id);
  });
});
