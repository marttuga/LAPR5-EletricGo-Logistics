import { Result } from "../../core/logic/Result";
import ITruckDTO from "../../dto/ITruckDTO";

export default interface ITruckService  {
  createTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
  updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
  getTrucks(): Promise<Result<ITruckDTO>>;
  getTruckId(truckId: string): Promise<Result<ITruckDTO>>;
}
