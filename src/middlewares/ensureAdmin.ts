import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { BadRequest, Forbidden } from '../custom/errors';
import { AuthorsRepositories } from '../repositories';

export async function ensureAdmin(request: Request, _response: Response, next: NextFunction) {
  // Get the author on repository based on the token user_id
  const authorsRepositories = getCustomRepository(AuthorsRepositories);
  const { user_id } = request;

  const author = await authorsRepositories.findOne(user_id);
  if (!author) throw new BadRequest('Author not found');

  // Text if this author is admin
  const { admin } = author;
  if (admin) return next();

  throw new Forbidden('You don`t have the necessary permissions for that');
}
