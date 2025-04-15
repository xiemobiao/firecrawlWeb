import { Router } from 'express';
import userRoutes from './user.routes';
import taskRoutes from './task.routes';
import resultRoutes from './result.routes';
import systemRoutes from './system.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);
router.use('/results', resultRoutes);
router.use('/system', systemRoutes);

export default router;
