import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import ITruckDTO from "../dto/ITruckDTO";

import { Truck } from "../domain/Truck";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import TruckRepo from '../repos/truckRepo';


export class TruckMap extends Mapper<Truck> {

  public static toDTO( Truck: Truck): ITruckDTO {
    return {
      //id: Truck.id.toString(),
      licencePlate: Truck.licencePlate,
      tare: Truck.tare,
      capacity: Truck.capacity,
      maxBateryCapacity: Truck.maxBateryCapacity,
      autonomyFullChargeLoad: Truck.autonomyFullChargeLoad,
      timeCharging: Truck.timeCharging
    } as ITruckDTO;
  }

  public static async toDomain (raw: any): Promise<Truck> {
    const repo = Container.get(TruckRepo);
    const licencePlate = await repo.findByTruckId(raw.licencePlate);

    const TruckOrError = Truck.create({
     licencePlate: raw.licencePlate,
      tare: raw.tare,
      capacity: raw.capacity,
      maxBateryCapacity: raw.maxBateryCapacity,
      autonomyFullChargeLoad: raw.autonomyFullChargeLoad,
      timeCharging: raw.timeCharging,
    }, new UniqueEntityID(raw.domainId))

    TruckOrError.isFailure ? console.log(TruckOrError.error) : '';
    
    return TruckOrError.isSuccess ? TruckOrError.getValue() : null;
  }

  public static toPersistence (Truck: Truck): any {
    const a = {
      domainId: Truck.id.toString(),
      licencePlate: Truck.licencePlate,
      tare: Truck.tare,
      capacity: Truck.capacity,
      maxBateryCapacity: Truck.maxBateryCapacity,
      autonomyFullChargeLoad: Truck.autonomyFullChargeLoad,
      timeCharging: Truck.timeCharging
    }
    return a;
  }
}