 import { Result } from "../../core/logic/Result";
import IFleetPlaningDTO from "../../dto/IFleetPlaningDTO";

export default interface ITruckService  {
  getBestRoute(data: string): Promise<Result<any[]>> 
  getNearestWarehouse(data: string): Promise<Result<any[]>>
  getRouteGreaterMass(data: string): Promise<Result<any[]>> 
  getRouteBestRelation(data: string): Promise<Result<any[]>> 
  createPlaning( fleetPlaningDTO: IFleetPlaningDTO): Promise<Result<IFleetPlaningDTO>>
  }