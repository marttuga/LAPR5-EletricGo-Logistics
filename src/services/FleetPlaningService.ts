/* import {Inject, Service} from "typedi";
import config from "../../config";
import {Result} from "../core/logic/Result";

import fetch=require('node-fetch');

import IFleetPlaningDTO from "../dto/IFleetPlaningDTO";
import {FleetPlaning} from "../domain/fleetPlan/fleetPlaning";
import {FleetPlaningId} from "../domain/fleetPlan/fleetPlaningId";
import IFleetPlaningService from "./IServices/IFleetPlaningService";
import {FleetPlaningMap} from "../mappers/FleetPlaningMap";
import IFleetPlaningRepo from "./IRepos/IFleetPlaningRepo";

@Service()
export default class FleetPlaningService implements IFleetPlaningService {
	constructor(@Inject(config.repos.fleetPlaning.name) private planningRepo: IFleetPlaningRepo) {
	}

	public async createPlanning(planningDTO: IFleetPlaningDTO): Promise<Result<{ planningDTO: IFleetPlaningDTO, token: string }>> {
    throw new Error('Method not implemented.');
	

		/* try {
			const url = "http://vs576.dei.isep.ipp.pt:2226/Fleetplaning?";
			const path = url.concat("ls=" + planningDTO.truckId + "&date=" + planningDTO.date + "?heuristica=1");

			console.log(1)
			const response = await fetch(path);
			console.log(2)
			console.log(response)
			const date = await response.json();

			const planningOrError = await FleetPlaning.create({
			  fleetPlaningId= FleetPlaningId.create(planningDTO.fleetPlaningId).getValue(),
        truckId =truckId,
        date = date,
        totalTime = totalTime,
        route = route,
			});

			if (planningOrError.isFailure) {
				return Result.fail<{ planningDTO: IFleetPlaningDTO, token: string }>(planningOrError.errorValue());
			}

			const planningResult = planningOrError.getValue();

			await this.planningRepo.save(planningResult);
			const planningDTOResult = FleetPlaningMap.toDTO(planningResult) as IFleetPlaningDTO;
			return Result.ok<{ planningDTO: IFleetPlaningDTO, token: string }>({
				planningDTO: planningDTOResult,
				token: "Truck created successfully."
			});
		} catch (e) {
			throw e;
		} */
/* 	}

	public async getPlanning(query?: any): Promise<Result<IFleetPlaningDTO[]>> {
		return null;
	}

	public async updatePlanning(planningDTO: IFleetPlaningDTO): Promise<Result<{ planningDTO: IFleetPlaningDTO, token: string }>> {
		return null;
	}

	public async deletePlanning(id: string): Promise<Result<{ planningDTO: IFleetPlaningDTO, token: string }>> {
		return null;
	}
}  */