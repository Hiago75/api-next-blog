import { Router } from 'express';
import categoryRoutes from '../../../../routes/categoryRoutes';
import coverRoutes from '../../../../routes/coverRoutes';
import homeRoutes from '../../../../routes/homeRoutes';
import postsRouter from '@modules/posts/infra/http/routes/posts.routes';
import sessionsRoutes from '@modules/authors/infra/http/routes/sessions.routes';
import tagsRouter from '@modules/tags/infra/http/routes/tags.routes';
import authorRoutes from '@modules/authors/infra/http/routes/authors.routes';

const routes = Router();

routes.use('/', homeRoutes);
routes.use('/categories', categoryRoutes);
routes.use('/tags', tagsRouter);
routes.use('/authors', authorRoutes);
routes.use('/posts', postsRouter);
routes.use('/covers', coverRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
