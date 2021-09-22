import { sign } from 'jsonwebtoken';
import { Authors } from '../../entities/Authors';

export function GenerateTokenProvider(user: Authors) {
  const token = sign({}, process.env.TOKEN_SECRET as string, {
    subject: user.id,
    expiresIn: '5m',
  });

  return token;
}
