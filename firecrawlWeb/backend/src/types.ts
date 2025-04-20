import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './middlewares/auth.middleware';

export type AuthRequestHandler = (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;