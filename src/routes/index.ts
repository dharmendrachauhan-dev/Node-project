import { Router } from 'express';
import healthRoutes from './health.routes';
import itemRoutes from './item.routes';

const apiRouter = Router();

apiRouter.use('/health', healthRoutes);
apiRouter.use('/items', itemRoutes);

export default apiRouter;
