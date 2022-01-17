import { Request, Response } from 'express';
import { container } from 'tsyringe';
import slugify from 'slugify';
import axios from 'axios';
import { ListPostsService } from '@modules/posts/services/ListPostsService';
import { ShowPostService } from '@modules/posts/services/ShowPostService';
import { CreatePostsService } from '@modules/posts/services/CreatePostsService';
import { UpdatePostsService } from '@modules/posts/services/UpdatePostsService';

class PostsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listPosts = container.resolve(ListPostsService);
    const { _start, _limit, _category, _author } = request.query;

    const start = Number(_start);
    const limit = Number(_limit);
    const category = String(_category);
    const author = String(_author);

    const posts = await listPosts.execute({ start, limit, category, author });

    return response.json(posts);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showPost = container.resolve(ShowPostService);
    const { slug } = request.params;

    const post = await showPost.execute({ slug });

    return response.json(post);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createPost = container.resolve(CreatePostsService);
    const authorId = request.user_id;
    const { title, content, photoUrl, categoryId, coverId, tagIds } = request.body;

    const slug = slugify(title);

    const post = await createPost.execute({ title, content, slug, tagIds, categoryId, authorId, coverId, photoUrl });

    if (process.env.NODE_ENV === 'production')
      axios.post('https://api.netlify.com/build_hooks/61675fa4f2f8f62777bca770');

    return response.json(post);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updatePost = container.resolve(UpdatePostsService);
    const { id } = request.params;
    const itemsToBeUpdated = request.body;

    for (const item in itemsToBeUpdated) {
      if (!itemsToBeUpdated[item]) {
        delete itemsToBeUpdated[item];
      }
    }

    const updatedPost = await updatePost.execute({ postId: id, itemsToBeUpdated });

    if (process.env.NODE_ENV === 'production')
      axios.post('https://api.netlify.com/build_hooks/61675fa4f2f8f62777bca770');

    return response.json(updatedPost);
  }
}

export default PostsController
