 import { Result } from "../../core/logic/Result";
import IFleetPlaningDTO from "../../dto/IFleetPlaningDTO";

export default interface IFleetPlaningService  {
  getBestRoute(data: string,camiao:string): Promise<Result<{viagem : string[]}>> 
  getNearestWarehouse(data: string,camiao:string): Promise<Result<{viagem : string[]}>> 
  getRouteGreaterMass(data: string,camiao:string): Promise<Result<{viagem : string[]}>> 
  getRouteBestRelation(data: string,camiao:string): Promise<Result<{viagem : string[]}>> 
  createPlaning( fleetPlaningDTO: IFleetPlaningDTO): Promise<Result<IFleetPlaningDTO>>
  }