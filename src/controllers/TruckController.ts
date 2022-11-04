import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ITruckController from "./IControllers/ITruckController";
import ITruckService from '../services/IServices/ITruckService';
import ITruckDTO from '../dto/ITruckDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class TruckController implements ITruckController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.truck.name) private truckServiceInstance : ITruckService
  ) {}

  
  public async getTrucks(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.getTrucks() as Result<ITruckDTO[]>;

      if (truckOrError.isFailure) {
        return res.status(402).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.json( truckDTO ).status(200);    }
    catch (e) {
      return next(e);
    }
  };

  public async createTruck(req: Request, res: Response, next: NextFunction) {
    try {
     const truckOrError = await this.truckServiceInstance.createTruck(req.body as ITruckDTO) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
       return res.send().status(402);

      }
      const roleDTO = truckOrError.getValue();
      
   return res.status(201).json(roleDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async updateTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.updateTruck(req.body as ITruckDTO) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(404).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.json( truckDTO ).status(201);    }
    catch (e) {
      return next(e);
    }
  };

  public async getLicencePlate(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.getLicencePlate(req.body as string) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(404).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.json( truckDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };
}