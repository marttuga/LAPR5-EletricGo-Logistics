import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import ITruckDTO from "../dto/ITruckDTO";

import { Truck } from "../domain/truck";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";


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

 
  public static async toDomain (raw: any): Promise<Truck> {

    const TruckOrError = Truck.create({
      licencePlate:raw.props.licencePlate ,
      tare:raw.props.tare,
      capacity: raw.props.capacity,
      maxBateryCapacity: raw.props.maxBateryCapacity,
      autonomyFullChargeLoad: raw.props.autonomyFullChargeLoad,
      timeCharging: raw.props.timeCharging,
      
    }, new UniqueEntityID(raw.licencePlate))

    TruckOrError.isFailure ? console.log(TruckOrError.error) : '';
    
    return TruckOrError.isSuccess ? TruckOrError.getValue() : null;
  }  
 
/*    public static toDomain (truck: any | Model<ITruckPersistence & Document> ): Truck {
    const truckOrError = Truck.create(truck,new UniqueEntityID(truck.domainId));
    truckOrError.isFailure ? console.log(truckOrError.error) : '';

  return truckOrError.isSuccess ? truckOrError.getValue() : null;} 
 */


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