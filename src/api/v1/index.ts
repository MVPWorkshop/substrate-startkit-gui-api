import { Router } from 'express';
import StatusRoute from './routes/status.route';
import AuthRoute from './routes/auth.route';
import { error } from './middlewares/error.middleware';

const v1 = Router();

v1.get('/status', StatusRoute.getStatus);

// Auth route
v1.get('/me', AuthRoute.me);
v1.get('/auth/github', AuthRoute.githubAuth);
v1.get('/auth/github/callback', AuthRoute.githubCallback);

v1.use(error);

export default v1;
