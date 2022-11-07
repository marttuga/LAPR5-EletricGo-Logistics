import { AutonomyFullChargeLoad } from "../domain/truck/autonomyFullChargeLoad";
import { Capacity } from "../domain/truck/capacity";
import { LicencePlate } from "../domain/truck/licencePlate";
import { MaxBateryCapacity } from "../domain/truck/maxBateryCapacity";
import { Tare } from "../domain/truck/tare";
import { TimeCharging } from "../domain/truck/timeCharging";

export default interface ITruckDTO {
   licencePlate: string;
  tare: number;
  capacity:number;
  maxBateryCapacity:number;
  autonomyFullChargeLoad:number;
  timeCharging: number; 
 /* licencePlate: LicencePlate,
  tare: Tare,
  capacity:Capacity,
  maxBateryCapacity:MaxBateryCapacity,
  autonomyFullChargeLoad:AutonomyFullChargeLoad,
  timeCharging: TimeCharging */
}
