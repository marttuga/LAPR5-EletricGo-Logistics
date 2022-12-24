import { AutonomyFullChargeLoad } from "../domain/truck/autonomyFullChargeLoad";
import { Capacity } from "../domain/truck/capacity";
import { LicencePlate } from "../domain/truck/licencePlate";
import { MaxBateryCapacity } from "../domain/truck/maxBateryCapacity";
import { Tare } from "../domain/truck/tare";
import { TimeCharging } from "../domain/truck/timeCharging";

export interface ITruckPersistence {
	_id: string;
	licencePlate:string;
	tare: number;
	capacity:number;
	maxBateryCapacity:number;
	autonomyFullChargeLoad:number;
	timeCharging: number;
	active: boolean;
/* 	_id: string;
	licencePlate:LicencePlate;
	tare: Tare;
	capacity:Capacity;
	maxBateryCapacity:MaxBateryCapacity;
	autonomyFullChargeLoad:AutonomyFullChargeLoad;
	timeCharging: TimeCharging; */
  }