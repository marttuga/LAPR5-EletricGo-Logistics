import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Service,Container, Inject, Token} from 'typedi';
import ITruckController from '../../controllers/IControllers/ITruckController'; 

import config from "../../../config";

const truck = Router();

export default (app: Router) => {
  app.use('/truck', truck);

  const ctrl = Container.get(config.controllers.truck.name) as ITruckController;

truck.post('/createTruck',
celebrate({
  body: Joi.object({
    licencePlate:Joi.string().regex(/([A-Za-z]{2}-[0-9]{2}-[A-Za-z]{2})/).required().error(new Error('LicencePlate not valid, must be type XX-00-XX')),
    tare: Joi.number().min(3000).max(20000).required().error(new Error('tare not valid,min value is 3000kg and max value is 20000kg')),
    capacity:Joi.number().min(2000).max(20000).required().error(new Error('capacity not valid,min value is 2000kg and max value is 20000kg')),
    maxBateryCapacity:Joi.number().min(80).max(200).required().error(new Error('max batery not valid,min value is 80KW and max value is 200kw')),
    autonomyFullChargeLoad:Joi.number().min(100).max(8000).required().error(new Error('autonomy not valid,min value is 100km and max value is 8000km')),
    timeCharging: Joi.number().min(1).max(5).required().error(new Error('time not valid,min value is 1h and max value is 5h')),
  })
}),
(req, res, next) => ctrl.createTruck(req, res, next) );

truck.put('/updateTruck',
celebrate({
  body: Joi.object({
    licencePlate:Joi.string().regex(/([A-Za-z]{2}-[0-9]{2}-[A-Za-z]{2})/).required().error(new Error('LicencePlate not valid, must be type XX-00-XX')),
    tare: Joi.number().min(3000).max(20000).required().error(new Error('tare not valid,min value is 3000kg and max value is 20000kg')),
    capacity:Joi.number().min(2000).max(20000).required().error(new Error('capacity not valid,min value is 2000kg and max value is 20000kg')),
    maxBateryCapacity:Joi.number().min(80).max(200).required().error(new Error('max batery not valid,min value is 80KW and max value is 200kw')),
    autonomyFullChargeLoad:Joi.number().min(100).max(8000).required().error(new Error('autonomy not valid,min value is 100km and max value is 8000km')),
    timeCharging: Joi.number().min(1).max(5).required().error(new Error('time not valid,min value is 1h and max value is 5h'))  }),
}),

(req, res, next) => ctrl.updateTruck(req, res, next) );


truck.put('/changeStatusToActivate',
(req, res, next) => ctrl.changeStatustoActive(req, res, next) );


truck.put('/changeStatusToInactive',
(req, res, next) => ctrl.changeStatustoInactive(req, res, next) );
   

truck.get('/getTruck/:licencePlate',(req, res, next) => ctrl.getLicencePlate(req, res, next),);

  truck.get('/getAll', (req, res, next) => ctrl.getTrucks(req, res, next));

  truck.get('/getAllActive', (req, res, next) => ctrl.getActiveTrucks(req, res, next));


}