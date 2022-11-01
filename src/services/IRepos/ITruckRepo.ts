import { Repo } from "../../core/infra/Repo";
import { Truck } from "../../domain/Truck";
import { TruckId } from "../../domain/truckId";

export default interface ITruckRepo extends Repo<Truck> {
	getAll():Promise<Truck[]>;
	save(Truck: Truck): Promise<Truck>;
	findByTruckId (TruckId: TruckId | string): Promise<Truck>;
}
  