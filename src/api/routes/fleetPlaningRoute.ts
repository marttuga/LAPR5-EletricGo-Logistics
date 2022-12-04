/* import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';
import {Container} from 'typedi';
import config from "../../../config";

import IFleetPlaningController from "../../controllers/IControllers/IFleetPlaningController";

const planningRoute = Router();

export default (app: Router) => {
	app.use('/fleetPlaning', planningRoute);

	const ctrl = Container.get(config.controllers.fleetPlaning.name) as IFleetPlaningController;

	planningRoute.post('/createFleetPlaning',
		celebrate({
			body: Joi.object({
				fleetPlaningId: Joi.string().required(),
				truckId: Joi.string().required(),
				date: Joi.string().required(),
				totalTime: Joi.string().required(),
				route: Joi.string().required(),
			})
		}),
		(req, res, next) => ctrl.createPlanning(req, res, next));



	planningRoute.get('/getFleetPlaning/:licencePlate', (req, res, next) => ctrl.findPlanning(req, res, next));



	planningRoute.put('/updateFleetPlaning',
		celebrate({
      body: Joi.object({
				fleetPlaningId: Joi.string().required(),
				truckId: Joi.string().required(),
				date: Joi.string().required(),
				totalTime: Joi.string().required(),
				route: Joi.string().required(),
			})
		}),
		(req, res, next) => ctrl.updatePlanning(req, res, next));



    planningRoute.delete('/deleteFleetPlaning', (req, res, next) => ctrl.deletePlanning(req, res, next));



} */