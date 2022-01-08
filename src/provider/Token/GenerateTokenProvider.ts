import { sign } from 'jsonwebtoken';
import { IAuthor } from '@modules/authors/domain/model/IAuthor';

export function GenerateTokenProvider(user: IAuthor) {
  const token = sign({}, process.env.TOKEN_SECRET as string, {
    subject: user.id,
    expiresIn: '5m',
  });

  return token;
}
