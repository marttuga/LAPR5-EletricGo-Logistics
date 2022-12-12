 import { Repo } from "../../core/infra/Repo";

import { FleetPlaning } from "../../domain/fleetPlan/fleetPlaning";
import { FleetPlaningId } from "../../domain/fleetPlan/fleetPlaningId";

export default interface IFleetPlaningRepo extends Repo<FleetPlaning> {
	getBestRoute(data: string, camiao: string): Promise<{ viagem : string[]}> ,
	  //getArmazemName(armazemId: string): Promise<string>,
	  getNearestWarehouse(
		data: string,
		camiao: string
	  ): Promise<{
		viagem: string[];
	  }>,
	  getRouteGreaterMass(
		data: string,
		camiao: string
	  ): Promise<{
		viagem: string[];
	  }>
	  getRouteBestRelation(
		data: string,
		camiao: string
	  ): Promise<{
		viagem: string[];
	  }>
	 }
   