import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { BadRequest, Forbidden } from '../custom/errors';
import { AuthorsRepositories } from '../repositories';

export async function ensureAdmin(request: Request, _response: Response, next: NextFunction) {
  // Get the author on repository based on the token user_id
  const authorsRepositories = getCustomRepository(AuthorsRepositories);
  const { user_id } = request;

  if (!user_id) throw new Forbidden('necessary_login_to_proceed');

  const author = await authorsRepositories.findOne(user_id);
  if (!author) throw new BadRequest('user_not_found_error');

  // Test if this author is admin
  const { admin } = author;
  if (admin) return next();

  throw new Forbidden('necessary_permissions_missing_error');
}
