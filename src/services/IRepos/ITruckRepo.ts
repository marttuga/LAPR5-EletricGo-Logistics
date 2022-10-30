import { Repo } from "../../core/infra/Repo";
import { Truck } from "../../domain/Truck";
import { LicencePlate } from "../../domain/LicencePlate";

export default interface ITruckRepo extends Repo<Truck> {
	exists(truck: Truck): Promise<boolean>;
	save(Truck: Truck): Promise<Truck>;
	findByLicencePlate (LicencePlate: LicencePlate | string): Promise<Truck>;
}
  