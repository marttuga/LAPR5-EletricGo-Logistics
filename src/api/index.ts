import { Router } from 'express';
//import auth from './routes/userRoute';
//import user from './routes/userRoute';
import role from './routes/roleRoute';
import route from './routes/routeRoute';
import truck from './routes/truckRoute';

export default () => {
	const app = Router();

	//user(app);
	role(app);
	truck(app);
	route(app);
	return app
}