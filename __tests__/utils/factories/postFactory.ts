import faker from 'faker';
import slugify from 'slugify';
import { getCustomRepository } from 'typeorm';
import { Categories } from '../../../src/entities/Categories';
import { PostsRepositories } from '../../../src/repositories';
import { authorFactory } from './authorFactory';
import { categoryFactory } from './categoryFactory';
import { coversFactory } from './coverFactory';

export const postFactory = async (title?: string, category?: Categories) => {
  const postsRepositories = getCustomRepository(PostsRepositories);

  const author = await authorFactory();
  const cover = await coversFactory();
  const postCategory = category || (await categoryFactory('Test'));

  const postTitle = title || faker.internet.domainName();
  const slug = slugify(postTitle);

  const post = postsRepositories.create({
    title: postTitle,
    content: 'test content',
    slug,
    author,
    category: postCategory,
    cover,
  });

  await postsRepositories.save(post);

  return post;
};
