 import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';
import {Container} from 'typedi';
import config from "../../../config";

import IFleetPlaningController from "../../controllers/IControllers/IFleetPlaningController";

const planningRoute = Router();

export default (app: Router) => {
	app.use('/fleetPlaning', planningRoute);

	const ctrl = Container.get(config.controllers.fleetPlaning.name) as IFleetPlaningController;

	planningRoute.post('/getBestRoute',
		celebrate({
			body: Joi.object({
				truckId: Joi.string().required(),
				date: Joi.string().required(),
				
			})
		}),
		(req, res, next) => ctrl.getBestRoute(req, res, next));



planningRoute.post('/getNearestWarehouse',
		celebrate({
			body: Joi.object({
				truckId: Joi.string().required(),
				date: Joi.string().required(),
				
			})
		}),
		(req, res, next) => ctrl.getNearestWarehouse(req, res, next));


		planningRoute.post('/getRouteGreaterMass',
		celebrate({
			body: Joi.object({
				truckId: Joi.string().required(),
				date: Joi.string().required(),
			
			})
		}),
		(req, res, next) => ctrl.getRouteGreaterMass(req, res, next));



		planningRoute.post('/getRouteBestRelation',
		celebrate({
			body: Joi.object({
				truckId: Joi.string().required(),
				date: Joi.string().required(),
			})
		}),
		(req, res, next) => ctrl.getRouteBestRelation(req, res, next));

	planningRoute.post('/createPlanning',
		celebrate({
			body: Joi.object({
				fleetPlaningId: Joi.string().required(),
				truckId: Joi.string().required(),
				date: Joi.string().required(),
				route: Joi.array().required(),
			})
		}),
		(req, res, next) => ctrl.createPlanning(req, res, next));

} 