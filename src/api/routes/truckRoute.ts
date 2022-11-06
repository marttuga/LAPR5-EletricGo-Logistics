import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container, Service } from 'typedi';
import ITruckController from '../../controllers/IControllers/ITruckController'; 

import config from "../../../config";

const truck = Router();

export default (app: Router) => {
  app.use('/truck', truck);

  const ctrl = Container.get(config.controllers.truck.name) as ITruckController;

truck.post('',
celebrate({
  body: Joi.object({
    licencePlate: Joi.string().regex(/([A-Z]{2}-[0-9]{2}-[A-Z]{2})/).required(),
    tare: Joi.number().required(),
    capacity:Joi.number().required(),
    maxBateryCapacity:Joi.number().required(),
    autonomyFullChargeLoad:Joi.number().required(),
    timeCharging: Joi.number().required()
  })
}),
(req, res, next) => ctrl.createTruck(req, res, next) );

truck.put('',
celebrate({
  body: Joi.object({
    licencePlate:Joi.string().regex(/([A-Z]{2}-[0-9]{2}-[A-Z]{2})/).required(),
    tare: Joi.number().required(),
    capacity:Joi.number().required(),
    maxBateryCapacity:Joi.number().required(),
    autonomyFullChargeLoad:Joi.number().required(),
    timeCharging: Joi.number().required()
  }),
}),
(req, res, next) => ctrl.updateTruck(req, res, next) );
   

    truck.get(
    '/getTruck',
    celebrate({
      body: Joi.object({
        licencePlate: Joi.string().regex(/([A-Z]{2}-[0-9]{2}-[A-Z]{2})/).required(),
      }),
    }),
    (req, res, next) => ctrl.getLicencePlate(req, res, next),
  );

  truck.get('/getAll', (req, res, next) => ctrl.getTrucks(req, res, next));



}