 import { Result } from "../../core/logic/Result";
import IFleetPlaningDTO from "../../dto/IFleetPlaningDTO";

export default interface IFleetPlaningService  {
  getBestRoute(data: string,camiao:string): Promise<Result<{viagem : string[]}>> 
  getNearestWarehouse(data: string): Promise<Result<any[]>>
  getRouteGreaterMass(data: string): Promise<Result<any[]>> 
  getRouteBestRelation(data: string): Promise<Result<any[]>> 
  createPlaning( fleetPlaningDTO: IFleetPlaningDTO): Promise<Result<IFleetPlaningDTO>>
  }