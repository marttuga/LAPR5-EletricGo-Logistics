 import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';
import {Container} from 'typedi';
import config from "../../../config";

import IFleetPlaningController from "../../controllers/IControllers/IFleetPlaningController";

const planningRoute = Router();

export default (app: Router) => {
	app.use('/fleetPlaning', planningRoute);

	const ctrl = Container.get(config.controllers.fleetPlaning.name) as IFleetPlaningController;

	planningRoute.get('/getBestRoute/:date/:truckId',
		(req, res, next) => ctrl.getBestRoute(req, res, next),);



planningRoute.get('/getNearestWarehouse/:date/:truckId',
		(req, res, next) => ctrl.getNearestWarehouse(req, res, next));


		planningRoute.get('/getRouteGreaterMass/:date/:truckId',
		(req, res, next) => ctrl.getRouteGreaterMass(req, res, next));



		planningRoute.get('/getRouteBestRelation/:date/:truckId',
		(req, res, next) => ctrl.getRouteBestRelation(req, res, next));

	planningRoute.post('/createPlaning',
		celebrate({
			body: Joi.object({
				fleetPlaningId: Joi.string().required(),
				truckId: Joi.string().required(),
				date: Joi.string().required(),
				route: Joi.array().required(),
			})
		}),
		(req, res, next) => ctrl.createPlaning(req, res, next));

		planningRoute.get('/getAll', (req, res, next) => ctrl.getPlanings(req, res, next));


} 