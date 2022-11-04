import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import ITruckDTO from "../dto/ITruckDTO";

import { Truck } from "../domain/truck/truck";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { ITruckPersistence } from '../dataschema/ITruckPersistence';
import { Document, Model } from 'mongoose';


export class TruckMap extends Mapper<Truck> {

  public static toDTO( truck: Truck): ITruckDTO {
    return {
      //id: Truck.id.toString(),
      licencePlate: truck.props.licencePlate,
      tare: truck.props.tare,
      capacity: truck.props.capacity,
      maxBateryCapacity: truck.props.maxBateryCapacity,
      autonomyFullChargeLoad: truck.props.autonomyFullChargeLoad,
      timeCharging: truck.props.timeCharging,
    } as ITruckDTO;
  } 
 
  public static toDomain(raw: any | Model<ITruckPersistence & Document>): Truck {
    const routeOrError = Truck.create(raw, new UniqueEntityID(raw.domainId));

    const TruckOrError = Truck.create({
      licencePlate:raw.licencePlate ,
      tare:raw.tare,
      capacity: raw.capacity,
      maxBateryCapacity: raw.maxBateryCapacity,
      autonomyFullChargeLoad: raw.autonomyFullChargeLoad,
      timeCharging: raw.timeCharging,
      
    }, new UniqueEntityID(raw.licencePlate))

    TruckOrError.isFailure ? console.log(TruckOrError.error) : 'erro no toDomain';
    
    return routeOrError.isSuccess ? routeOrError.getValue() : null;
  }


  public static toPersistence (truck: Truck): any {
    return  {
      domainId: truck.id.toString(),
      licencePlate: truck.props.licencePlate,
      tare: truck.props.tare,
      capacity: truck.props.capacity,
      maxBateryCapacity: truck.props.maxBateryCapacity,
      autonomyFullChargeLoad: truck.props.autonomyFullChargeLoad,
      timeCharging: truck.props.timeCharging
    }
  }
}