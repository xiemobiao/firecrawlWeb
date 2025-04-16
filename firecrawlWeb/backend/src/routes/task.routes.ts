import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { getUserTasks, createTask, getTaskById } from '../controllers/task.controller';

const router = Router();

function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return function(req: Request, res: Response, next: NextFunction) {
    Promise.resolve(fn(req, res, next)).catch(next);
    return;
  };
}

router.get('/', asyncHandler(getUserTasks));
router.post('/create', asyncHandler(createTask));
router.get('/:id', asyncHandler(getTaskById));

export default router;
