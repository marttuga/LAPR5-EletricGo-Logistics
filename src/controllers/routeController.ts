import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRouteController from "./IControllers/IRouteController";
import IRouteService from '../services/IServices/IRouteService';
import IRouteDTO from '../dto/IRouteDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class RouteController implements IRouteController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.role.name) private RouteServiceInstance : IRouteService
  ) {}

  public async createRoute(req: Request, res: Response, next: NextFunction) {
    try {
      const RouteOrError = await this.RouteServiceInstance.createRoute(req.body as IRouteDTO) as Result<IRouteDTO>;
        
      if (RouteOrError.isFailure) {
        return res.status(402).send();
      }

      const RouteDTO = RouteOrError.getValue();
      return res.json( RouteDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateRoute(req: Request, res: Response, next: NextFunction) {
    try {
      const RouteOrError = await this.RouteServiceInstance.updateRoute(req.body as IRouteDTO) as Result<IRouteDTO>;

      if (RouteOrError.isFailure) {
        return res.status(404).send();
      }

      const RouteDTO = RouteOrError.getValue();
      return res.status(201).json( RouteDTO );
    }
    catch (e) {
      return next(e);
    }
  };
}