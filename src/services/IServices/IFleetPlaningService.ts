/* import { Result } from "../../core/logic/Result";
import IFleetPlaningDTO from "../../dto/IFleetPlaningDTO";

export default interface ITruckService  {
  createPlanning(planningDTO: IFleetPlaningDTO): Promise<Result<{ planningDTO: IFleetPlaningDTO, token: string }>>
  getPlanning(query?: any): Promise<Result<IFleetPlaningDTO[]>> 
	updatePlanning(planningDTO: IFleetPlaningDTO): Promise<Result<{ planningDTO: IFleetPlaningDTO, token: string }>> 

	deletePlanning(id: string): Promise<Result<{ planningDTO: IFleetPlaningDTO, token: string }>> 
}
 */