import { Router } from 'express';
import healthRoutes from './health.routes';
import itemRoutes from './item.routes';
import formRoutes from './form.routes';

const apiRouter = Router();

apiRouter.use('/health', healthRoutes);
apiRouter.use('/items', itemRoutes);
apiRouter.use('/forms', formRoutes);

export default apiRouter;
