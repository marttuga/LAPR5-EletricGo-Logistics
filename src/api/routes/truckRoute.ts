import { NextFunction, Request, Response, Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ITruckController from '../../controllers/IControllers/ITruckController'; 

import config from "../../../config";

const truck = Router();

export default (app: Router) => {
  app.use('/truck', truck);

  const ctrl = Container.get(config.controllers.truck.name) as ITruckController;

/* 
  truck.get('truck',
    celebrate({
      body: Joi.object({
        tare: Joi.number().required(),
        capacity:Joi.number().required(),
        maxBateryCapacity:Joi.number().required(),
        autonomyFullChargeLoad:Joi.number().required(),
        timeCharging: Joi.number().required()
      }),
    }),
  async (req:Request, res: Response,next: NextFunction) => {
  try {
    const result=await ctrl.get(req,res,next);
    return res.json(result);
    
  } catch (error) {
    next(error);
    
  }
    
  },
); */

truck.post('/createTruck',
celebrate({
  body: Joi.object({
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
    tare: Joi.number().required(),
    capacity:Joi.number().required(),
    maxBateryCapacity:Joi.number().required(),
    autonomyFullChargeLoad:Joi.number().required(),
    timeCharging: Joi.number().required()
  }),
}),
(req, res, next) => ctrl.updateTruck(req, res, next) );
   

truck.get('getTruck',(req,res,next) => ctrl.getLicencePlate(req, res, next) );

};