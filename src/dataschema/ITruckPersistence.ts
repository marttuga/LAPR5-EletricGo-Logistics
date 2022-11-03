import { AutonomyFullChargeLoad } from "../domain/autonomyFullChargeLoad";
import { Capacity } from "../domain/capacity";
import { LicencePlate } from "../domain/licencePlate";
import { MaxBateryCapacity } from "../domain/maxBateryCapacity";
import { Tare } from "../domain/tare";
import { TimeCharging } from "../domain/timeCharging";

export interface ITruckPersistence {
	_id: string;
	licencePlate:LicencePlate;
	tare: Tare;
	capacity:Capacity;
	maxBateryCapacity:MaxBateryCapacity;
	autonomyFullChargeLoad:AutonomyFullChargeLoad;
	timeCharging: TimeCharging;
  }