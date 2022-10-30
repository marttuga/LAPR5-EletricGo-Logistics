import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ITruckController from '../../controllers/IControllers/ITruckController'; 

import config from "../../../config";

const truck = Router();

export default (app: Router) => {
  app.use('/roles', truck);

  const ctrl = Container.get(config.controllers.truck.name) as ITruckController;

  truck.post('',
    celebrate({
      body: Joi.object({
        name: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createTruck(req, res, next) );

    truck.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.updateTruck(req, res, next) );

    truck.get('',(req,res,next) => ctrl.createTruck(req, res, next) );

};