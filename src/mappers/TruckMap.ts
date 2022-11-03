import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import ITruckDTO from "../dto/ITruckDTO";

import { Truck } from "../domain/truck";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { LicencePlate } from '../domain/licencePlate';
import { Tare } from '../domain/tare';
import { TimeCharging } from '../domain/timeCharging';
import { AutonomyFullChargeLoad } from '../domain/autonomyFullChargeLoad';
import { Capacity } from '../domain/capacity';
import { MaxBateryCapacity } from '../domain/maxBateryCapacity';
import { Model } from 'mongoose';
import { Document } from 'mongodb';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';
import TruckRepo from '../repos/truckRepo';


export class TruckMap extends Mapper<Truck> {
 
  public static toDTO( Truck: Truck): ITruckDTO {
    return {
      //id: Truck.id.toString(),
      licencePlate: LicencePlate.create(Truck.licencePlate.licencePlate).getValue(),
      tare: Tare.create(Truck.tare.value).getValue(),
      capacity: Capacity.create(Truck.capacity.value).getValue(),
      maxBateryCapacity: MaxBateryCapacity.create(Truck.maxBateryCapacity.value).getValue(),
      autonomyFullChargeLoad: AutonomyFullChargeLoad.create(Truck.autonomyFullChargeLoad.value).getValue(),
      timeCharging: TimeCharging.create(Truck.timeCharging.value).getValue(),
    } as ITruckDTO;
  } 

/*  
  public static async toDomain (raw: any): Promise<Truck> {
    const repo = Container.get(TruckRepo); 
    const licencePlate = await repo.findLicencePlate(raw.licencePlate);

    const TruckOrError = Truck.create({
      licencePlate:LicencePlate.create(raw.licencePlate.).getValue() ,
      tare: Tare.create(raw.tare).getValue(),
      capacity: Capacity.create(raw.capacity).getValue(),
      maxBateryCapacity: MaxBateryCapacity.create(raw.maxBateryCapacity).getValue(),
      autonomyFullChargeLoad: AutonomyFullChargeLoad.create(raw.autonomyFullChargeLoad).getValue(),
      timeCharging: TimeCharging.create(raw.timeCharging).getValue(),
      
    }, new UniqueEntityID(raw.licencePlate))

    TruckOrError.isFailure ? console.log(TruckOrError.error) : '';
    
    return TruckOrError.isSuccess ? TruckOrError.getValue() : null;
  }  */
 
   public static toDomain (truck: any | Model<ITruckPersistence & Document> ): Truck {
    const truckOrError = Truck.create(truck,new UniqueEntityID(truck.domainId));
    truckOrError.isFailure ? console.log(truckOrError.error) : '';

  return truckOrError.isSuccess ? truckOrError.getValue() : null;} 



  public static toPersistence (truck: Truck): any {
    const a = {
      domainId: truck.id.toString(),
      licencePlate: truck.licencePlate.licencePlate,
      tare: truck.tare.value,
      capacity: truck.capacity.value,
      maxBateryCapacity: truck.maxBateryCapacity.value,
      autonomyFullChargeLoad: truck.autonomyFullChargeLoad.value,
      timeCharging: truck.timeCharging.value
    }
    return a;
  }
}