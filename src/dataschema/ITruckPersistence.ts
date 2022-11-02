import { LicencePlate } from "../domain/licencePlate";

export interface ITruckPersistence {
	_id: string;
	licencePlate:LicencePlate;
	tare: number;
	capacity:number;
	maxBateryCapacity:number;
	autonomyFullChargeLoad:number;
	timeCharging: number;
  }