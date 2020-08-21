import { Router } from 'express';
import StatusRoute from './routes/status.route';
import AuthRoute from './routes/auth.route';
import { error } from './middlewares/error.middleware';
import PalletsRoute from './routes/pallets.route';
import PalletsValidator from './validators/pallets.validator';
import GeneratorValidator from './validators/generator.validator';
import GeneratorRoute from './routes/generator.route';
import { isAuthenticated } from './middlewares/authenticated.middleware';

const v1 = Router();

v1.get('/status', StatusRoute.getStatus);

// Auth route
v1.get('/me', isAuthenticated, AuthRoute.me);
v1.get('/auth/github', AuthRoute.githubAuth);
v1.get('/auth/github/callback', AuthRoute.githubCallback);

// Pallets route
v1.get('/pallets', PalletsValidator.validateGetPalletsList, PalletsRoute.getPalletsList);
v1.get('/pallets/:palletName', PalletsRoute.getPallet);

// Generator route
v1.post('/generator', isAuthenticated, GeneratorValidator.validatePostGenerator, GeneratorRoute.postGenerator);

v1.use(error);

export default v1;
