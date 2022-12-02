import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container, Service } from 'typedi';
import IRouteController from '../../controllers/IControllers/IRouteController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
  app.use('/routes', route);

  const ctrl = Container.get(config.controllers.route.name) as IRouteController;

  route.post(
    '/createRoute',
    celebrate({
      body: Joi.object({
        routeId: Joi.string().required(),
        distance: Joi.string().required(),
        routeTime: Joi.string().required(),
        batteryWaste: Joi.string().required(),
        arrivalId: Joi.string().required(),
        departureId: Joi.string().required(),
        extraTime: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.createRoute(req, res, next),
  );

  route.put(
    '/updateRoute',
    celebrate({
      body: Joi.object({
        routeId: Joi.string().required(),
        distance: Joi.string().required(),
        routeTime: Joi.string().required(),
        batteryWaste: Joi.string().required(),
        arrivalId: Joi.string().required(),
        departureId: Joi.string().required(),
        extraTime: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updateRoute(req, res, next),
  );

  route.get(
    '/getById',
    celebrate({
      body: Joi.object({
        routeId: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.getRouteId(req, res, next),
  );

  route.get('/getRoutes', (req, res, next) => ctrl.getRoute(req, res, next));

  route.post(
      '/SGRAI',
      (req, res, next) => ctrl.postSGRAIRoutes(req, res, next),
  );

};
