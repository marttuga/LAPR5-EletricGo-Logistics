import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import route from './routes/routeRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	
	route(app);
	return app
}