import { Repo } from "../../core/infra/Repo";
import { Truck } from "../../domain/truck";
import { LicencePlate } from "../../domain/licencePlate";

export default interface ITruckRepo extends Repo<Truck> {
	getAll():Promise<Truck[]>;
	save(Truck: Truck): Promise<Truck>;
	findLicencePlate (licencePlate: LicencePlate | string): Promise<Truck>;
}
  