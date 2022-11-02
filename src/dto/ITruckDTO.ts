import { LicencePlate } from "../domain/licencePlate";

export default interface ITruckDTO {
  licencePlate: LicencePlate,
  tare: number,
  capacity:number,
  maxBateryCapacity:number,
  autonomyFullChargeLoad:number,
  timeCharging: number
}
