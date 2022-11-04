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
      @Inject(config.services.route.name) private routeServiceInstance : IRouteService
  ) {}

  public async getRoute(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("CONTROLLER");
      //const routeOrError = await this.routeServiceInstance.getRoutes() as Result<IRouteDTO>;
      const routeOrError = await this.routeServiceInstance.getRoutes();


      if (routeOrError.isFailure) {
        return res.status(404).send();
      }

      const routeDTO = routeOrError.getValue();
      return res.json( routeDTO ).status(201);    }
    catch (e) {
      return next(e);
    }
  };

  public async createRoute(req: Request, res: Response, next: NextFunction) {
    try {
      const RouteOrError = await this.routeServiceInstance.createRoute(req.body as IRouteDTO) as Result<IRouteDTO>;
        
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
      const routeOrError = await this.routeServiceInstance.updateRoute(req.body as IRouteDTO) as Result<IRouteDTO>;

      if (routeOrError.isFailure) {
        return res.status(404).send();
      }

      const routeDTO = routeOrError.getValue();
      return res.json( routeDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async getRouteId(req: Request, res: Response, next: NextFunction) {
    try {
      const RouteOrError = await this.routeServiceInstance.getRouteId(req.body as string) as Result<IRouteDTO>;

      if (RouteOrError.isFailure) {
        return res.status(404).send();
      }

      const routeDTO = RouteOrError.getValue();
      return res.json( routeDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };
}