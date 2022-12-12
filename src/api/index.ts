import { Router } from 'express';
import { FleetPlaningId } from '../domain/fleetPlan/fleetPlaningId';
//import auth from './routes/userRoute';
//import user from './routes/userRoute';
import role from './routes/roleRoute';
import route from './routes/routeRoute';
import truck from './routes/truckRoute';
 import fleetPlaning from './routes/fleetPlaningRoute';

export default () => {
	const app = Router();

	//user(app);
	role(app);
	truck(app);
	route(app);
	 fleetPlaning(app)
	return app
}