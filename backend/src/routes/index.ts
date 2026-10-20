import { Router } from 'express';
import healthRoutes from './health.routes';
import formRoutes from './form.routes';

const apiRouter = Router();

apiRouter.use('/health', healthRoutes);
apiRouter.use('/forms', formRoutes);

export default apiRouter;
