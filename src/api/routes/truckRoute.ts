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
    licencePlate: Joi.string().required(),
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
    licencePlate: Joi.string().required(),
    tare: Joi.number().required(),
    capacity:Joi.number().required(),
    maxBateryCapacity:Joi.number().required(),
    autonomyFullChargeLoad:Joi.number().required(),
    timeCharging: Joi.number().required()
  }),
}),
(req, res, next) => ctrl.updateTruck(req, res, next) );
   

    truck.get(
    '',
    celebrate({
      body: Joi.object({
        licencePlate: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.getLicencePlate(req, res, next),
  );

  //truck.get('', (req, res, next) => ctrl.getAllTrucks(req, res, next));



}