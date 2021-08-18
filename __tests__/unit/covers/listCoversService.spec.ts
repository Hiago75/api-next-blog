import { ListCoversService } from '../../../src/services/Covers/ListCoversService';
import { testSetup, coversFactory } from '../../utils';

describe('List covers service', () => {
  const sut = new ListCoversService();

  testSetup();

  it('should be able to list all the covers', async () => {
    await coversFactory();
    await coversFactory();

    const coversList = await sut.execute();

    expect(coversList.length).toBe(2);
  });
});
