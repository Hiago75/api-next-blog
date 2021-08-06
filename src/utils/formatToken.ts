import { Unauthorized } from '../custom/errors';

export function formatToken(rawToken: string) {
  const parts = rawToken.split(' ');
  if (parts.length !== 2) throw new Unauthorized('Token error');

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) throw new Unauthorized('Invalid token format');

  return token;
}
