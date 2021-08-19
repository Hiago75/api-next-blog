import { GenerateTokenProvider } from '../../../src/provider';
import { authorFactory } from './authorFactory';

export const authFactory = async (password: string, admin?: boolean) => {
  const author = await authorFactory(password, admin);
  const token = GenerateTokenProvider(author);

  return token;
};
