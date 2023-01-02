import { Router } from 'express';
import { FleetPlaningId } from '../domain/fleetPlan/fleetPlaningId';
//import auth from './routes/userRoute';
//import user from './routes/userRoute';
import role from './routes/roleRoute';
import userCopy from './routes/userRoutecopy';
import user from './routes/userRoute';

import route from './routes/routeRoute';
import truck from './routes/truckRoute';
 import fleetPlaning from './routes/fleetPlaningRoute';
import { UserCopy } from '../domain/usercopy/userCopy';

export default () => {
	const app = Router();

	//user(app);
	userCopy(app);
	role(app);
	truck(app);
	route(app);
	fleetPlaning(app)
	return app
}