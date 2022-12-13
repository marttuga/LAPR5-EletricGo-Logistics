 import {NextFunction, Request, Response} from 'express';
import {Inject, Service} from 'typedi';
import config from "../../config";
import {Result} from "../core/logic/Result";
import IFleetPlaningDTO from '../dto/IFleetPlaningDTO';

import IFleetPlaningService from "../services/IServices/IFleetPlaningService";
import IFleetPlaningController from "./IControllers/IFleetPlaningController";

@Service()
export default class FleetPlaningController implements IFleetPlaningController {
	constructor(@Inject(config.services.fleetPlaning.name) private planningServiceInstance: IFleetPlaningService) {
	}

	public async  getBestRoute(req: Request, res: Response, next: NextFunction) {
		console.log("I");
		try {
			console.log("OI");
  
			//const data = req.params.data;
			const planeamentoOrError = await this.planningServiceInstance.getBestRoute(req.params.date,req.params.truckId);
			console.log("O");
			const planeamentoDTO = planeamentoOrError;

			return res.json(planeamentoDTO.getValue()).status(201);
  
		  } 
		  catch (e) {
			return next(e);
		  }
	}
	public async  getNearestWarehouse(req: Request, res: Response, next: NextFunction) {
		try {
  
			const data = req.params.data;
  
			const planeamentoOrError = await this.planningServiceInstance.getNearestWarehouse(data) ;
  
			const planeamentoDTO = planeamentoOrError;
			return res.json(planeamentoDTO.getValue()).status(201);
  
		  } 
		  catch (e) {
			return next(e);
		  }
	}
  

	public async getRouteGreaterMass(req: Request, res: Response, next: NextFunction) {
	  try {
  
		  const data = req.params.data;
  
		  const planeamentoOrError = await this.planningServiceInstance.getRouteGreaterMass(data) ;
  
		  const planeamentoDTO = planeamentoOrError;
		  return res.json(planeamentoDTO.getValue()).status(201);
  
		} 
		catch (e) {
		  return next(e);
		}
  }
  
  public async  getRouteBestRelation(req: Request, res: Response, next: NextFunction) {
	try {
  
		const data = req.params.data;
  
		const planeamentoOrError = await this.planningServiceInstance.getRouteBestRelation(data) ;
  
		const planeamentoDTO = planeamentoOrError;
		return res.json(planeamentoDTO.getValue()).status(201);
  
	  } 
	  catch (e) {
		return next(e);
	  }
  }

  public async createPlaning(req: Request, res: Response, next: NextFunction){
	try {

		const planOrError = (await this.planningServiceInstance.createPlaning(
		  req.body as IFleetPlaningDTO,
		)) as Result<IFleetPlaningDTO>;
		if (planOrError.isFailure) {
		 return res.send().status(402);
  
		}
		const planDTO = (await planOrError).getValue();
		
	 return res.status(201).json(planDTO);
	  } catch (e) {
		return next(e);
	  }

	}
} 