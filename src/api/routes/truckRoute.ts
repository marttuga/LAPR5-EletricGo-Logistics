import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container, Service } from 'typedi';
import ITruckController from '../../controllers/IControllers/ITruckController'; 

import config from "../../../config";

const truck = Router();

export default (app: Router) => {
  app.use('/truck', truck);

  const ctrl = Container.get(config.controllers.truck.name) as ITruckController;

truck.post('/createTruck',
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

truck.put('/updateTruck',
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
   
truck.put('/getTruck',
celebrate({
  body: Joi.object({}),
}),
(req, res, next) => ctrl.getTrucks(req, res, next) );


};