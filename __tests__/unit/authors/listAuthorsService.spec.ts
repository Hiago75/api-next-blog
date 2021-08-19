import { ListAuthorsService } from '../../../src/services';
import { authorFactory, testSetup } from '../../utils';

describe('List authors service', () => {
  const sut = new ListAuthorsService();

  testSetup();

  it('should be able to list all existent authors', async () => {
    await authorFactory('123456');
    await authorFactory('123456');

    const authors = await sut.execute();

    expect(authors.length).toBe(2);
  });
});
