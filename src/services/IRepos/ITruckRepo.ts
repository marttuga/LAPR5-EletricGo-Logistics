import { Repo } from "../../core/infra/Repo";
import { Truck } from "../../domain/truck/truck";
import { LicencePlate } from "../../domain/truck/licencePlate";

export default interface ITruckRepo extends Repo<Truck> {
	getAllTrucks():Promise<Truck[]>;
	save(Truck: Truck): Promise<Truck>;
	findLicencePlate (licencePlate: LicencePlate | string): Promise<Truck>;
	getAllActiveTrucks(): Promise<Truck[]>;
}
  