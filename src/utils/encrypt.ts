import { hash } from 'bcrypt';

export const encrypt = async (password: string) => {
  return await hash(password, 10);
};
