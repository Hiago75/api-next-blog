import { Request, Response, Router } from 'express';
import path from 'path';

const router = Router();
const filePath = path.resolve(__dirname, '..', '..', 'public', 'index.html');

router.get('/', (req: Request, res: Response) => {
  res.sendFile(filePath);
});

export default router;
