import { Result } from "../../core/logic/Result";
import ITruckDTO from "../../dto/ITruckDTO";

export default interface ITruckService  {
  createTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
  updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
  getTrucks(): Promise<Result<ITruckDTO[]>>;
  getActiveTrucks(): Promise<Result<ITruckDTO[]>>;
  getLicencePlate(licencePlate: string): Promise<Result<ITruckDTO>>;
  changeStatustoInactive(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
  changeStatustoActive(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>
}
