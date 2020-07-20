import { Router } from 'express';
import StatusRoute from './routes/status.route';

const v1 = Router();

v1.get('/status', StatusRoute.getStatus);

export default v1;
