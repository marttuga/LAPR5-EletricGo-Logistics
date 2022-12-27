import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRoleController from "./IControllers/IRoleController";
import IRoleService from '../services/IServices/IRoleService';
import IRoleDTO from '../dto/IRoleDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class RoleController implements IRoleController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.role.name) private roleServiceInstance : IRoleService
  ) {}

  public async getRoles(req: Request, res: Response, next: NextFunction) {
    try {
    
      const truckOrError = await this.roleServiceInstance.getRoles() as Result<IRoleDTO[]>;
      
      if (truckOrError.isFailure) {
        return res.status(402).send();
      }

      const truckDTO = truckOrError.getValue();

      return res.json( truckDTO ).status(200);    }
    catch (e) {
      return next(e);
    }
  };


  public async createRole(req: Request, res: Response, next: NextFunction) {
  
    try {   
            const truckOrError = (await this.roleServiceInstance.createRole(
        req.body as IRoleDTO,
      )) as Result<IRoleDTO>;
   
      if (truckOrError.isFailure) {
       return res.send().status(402);

      }
      const roleDTO = (await truckOrError).getValue();
      
   return res.status(201).json(roleDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.roleServiceInstance.updateRole(req.body as IRoleDTO) as Result<IRoleDTO>;
      if (truckOrError.isFailure) {
        return res.status(402).send();
      }

      const truckDTO = truckOrError.getValue();  

    
      return res.json( truckDTO ).status(201);    }
    catch (e) {
      return next(e);
    }
  };

  public async getByName(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.roleServiceInstance.getByName(req.params.name ) as Result<IRoleDTO>;

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