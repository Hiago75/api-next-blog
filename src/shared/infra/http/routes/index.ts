import { Router } from 'express';
import categoryRoutes from '../../../../routes/categoryRoutes';
import postRoutes from '../../../../routes/postRoutes';
import coverRoutes from '../../../../routes/coverRoutes';
import authRoutes from '../../../../routes/authRoutes';
import homeRoutes from '../../../../routes/homeRoutes';
import tagsRouter from '@modules/tags/infra/http/routes/tags.routes';
import authorRoutes from '@modules/authors/infra/http/routes/authors.routes';

const routes = Router();

routes.use('/', homeRoutes);
routes.use('/categories', categoryRoutes);
routes.use('/tags', tagsRouter);
routes.use('/authors', authorRoutes);
routes.use('/posts', postRoutes);
routes.use('/covers', coverRoutes);
routes.use('/auth', authRoutes);

export default routes;
