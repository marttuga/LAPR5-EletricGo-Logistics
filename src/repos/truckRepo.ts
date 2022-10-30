import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';

import ITruckRepo from "../services/IRepos/ITruckRepo";
import { Truck } from "../domain/Truck";
import { LicencePlate } from "../domain/LicencePlate";
import { TruckMap } from "../mappers/TruckMap";

@Service()
export default class TruckRepo implements ITruckRepo {
  private models: any;

  constructor(
    @Inject('truckSchema') private truckSchema : Model<ITruckPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(truck: Truck): Promise<boolean> {
    
    const idX = truck.id instanceof LicencePlate ? (<LicencePlate>truck.id).licencePlate : truck.id;

    const query = { domainId: idX}; 
    const truckDocument = await this.truckSchema.findOne( query as FilterQuery<ITruckPersistence & Document>);

    return !!truckDocument === true;
  }

  public async save (Truck: Truck): Promise<Truck> {
    const query = { domainId: Truck.id.toString() }; 

    const TruckDocument = await this.truckSchema.findOne( query );

    try {
      if (TruckDocument === null ) {
        const rawTruck: any = TruckMap.toPersistence(Truck);

        const TruckCreated = await this.truckSchema.create(rawTruck);

        return TruckMap.toDomain(TruckCreated);
      } else {
        TruckDocument.tare= Truck.tare,
        Truck.capacity= Truck.capacity,
        Truck.maxBateryCapacity= Truck.maxBateryCapacity,
        Truck.autonomyFullChargeLoad= Truck.autonomyFullChargeLoad,
        Truck.timeCharging= Truck.timeCharging;
        await TruckDocument.save();

        return Truck;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByLicencePlate (licencePlate: LicencePlate | string): Promise<Truck> {
    const query = { domainId: licencePlate};
    const truckRecord = await this.truckSchema.findOne( query as FilterQuery<ITruckPersistence & Document> );

    if( truckRecord != null) {
      return TruckMap.toDomain(truckRecord);
    }
    else
      return null;
  }
 
}