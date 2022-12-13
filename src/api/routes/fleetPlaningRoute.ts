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
		celebrate({
			body: Joi.object({date: Joi.string().required(),
				truckId: Joi.string().required(),
				
				
			})
		}),
		(req, res, next) => ctrl.getNearestWarehouse(req, res, next));


		planningRoute.get('/getRouteGreaterMass/:date/:truckId',
		celebrate({
			body: Joi.object({date: Joi.string().required(),
				truckId: Joi.string().required(),
				
			
			})
		}),
		(req, res, next) => ctrl.getRouteGreaterMass(req, res, next));



		planningRoute.get('/getRouteBestRelation/:date/:truckId',
		celebrate({
			body: Joi.object({date: Joi.string().required(),
				truckId: Joi.string().required(),
				
			})
		}),
		(req, res, next) => ctrl.getRouteBestRelation(req, res, next));

	planningRoute.post('/createPlaning',
		celebrate({
			body: Joi.object({
				fleetPlaningId: Joi.string().min(4).required(),
				truckId: Joi.string().required(),
				date: Joi.string().required(),
				route: Joi.array().required(),
			})
		}),
		(req, res, next) => ctrl.createPlaning(req, res, next));

} 