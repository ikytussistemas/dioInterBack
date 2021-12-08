import { Router } from 'express';
import pixRoutes from './pix.routes';
import userRoutes from './user.routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/pix', pixRoutes);

export default routes;