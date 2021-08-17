import { ListAuthorsService } from '../../../src/services';
import { authorFactory, testFactory } from '../../utils';

describe('List authors service', () => {
  const sut = new ListAuthorsService();

  testFactory();

  it('should be able to list all existent authors', async () => {
    await authorFactory();
    await authorFactory();

    const authors = await sut.execute();

    expect(authors.length).toBe(2);
  });
});
