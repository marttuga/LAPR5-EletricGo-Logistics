/* import {NextFunction, Request, Response} from 'express';
import {Inject, Service} from 'typedi';
import config from "../../config";
import {Result} from "../core/logic/Result";

import IFleetPlaningService from "../services/IServices/IFleetPlaningService";
import IFleetPlaningController from "./IControllers/IFleetPlaningController";
import IFleetPlaningDTO from "../dto/IFleetPlaningDTO";

@Service()
export default class FleetPlaningController implements IFleetPlaningController {
	constructor(@Inject(config.services.fleetPlanning.name) private planningServiceInstance: IFleetPlaningService) {
	}

	public async createPlanning(req: Request, res: Response, next: NextFunction){
		try {
			const planningOrError = await this.planningServiceInstance.createPlanning(req.body as IFleetPlaningDTO) as Result<{ planningDTO: IFleetPlaningDTO, token: string }>;

			if (planningOrError.isFailure) {
				return res.status(400).json(planningOrError.error);
			}

			const planningDTO = planningOrError.getValue();
			return res.status(201).json(planningDTO);
		} catch (e) {
			return next(e);
		}
	}


	public async findPlanning(req: Request, res: Response, next: NextFunction){
    try {
      const planningOrError = await this.planningServiceInstance.getPlanning(req.params.fleetPlaningId ) as Result<IFleetPlaningDTO[]>;
     

      if (planningOrError.isFailure) {
        return res.status(404).send();
      }

      const planningDTO = planningOrError.getValue();     

      return res.json( planningDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }

	}

	public async updatePlanning(req: Request, res: Response, next: NextFunction){
	}

	public async deletePlanning(req: Request, res: Response, next: NextFunction){
	}
} */