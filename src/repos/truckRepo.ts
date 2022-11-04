import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';

import ITruckRepo from "../services/IRepos/ITruckRepo";
import { Truck } from "../domain/truck";
import { LicencePlate } from "../domain/licencePlate";
import { TruckMap } from "../mappers/TruckMap";
import { throws } from 'assert';

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
    
    const idX = truck instanceof LicencePlate ? (<LicencePlate>truck).licencePlate : truck;

    const query = { domainId: idX}; 
    const routeDocument = await this.truckSchema.findOne( query as FilterQuery<ITruckPersistence & Document>);

    return !!routeDocument === true;
  }
  
  public async getAllTrucks(): Promise<Truck[]> {
    try {
      return this.truckSchema.find({}) as any;
    } catch (e) {
      throw new Error(e);

      
    }
  
  }

  public async save (truck: Truck): Promise<Truck> {
    const query = { domainId: truck.id.toString()}; 

console.log(query);

    const truckDocument = await this.truckSchema.findOne( query );

console.log(truckDocument);

    try {
      if (truckDocument === null ) {
        const rawTruck: any = TruckMap.toPersistence(truck);

        const truckCreated = await this.truckSchema.create(rawTruck);

        return TruckMap.toDomain(truckCreated);
      } else {
        truckDocument.tare = truck.tare;
        truckDocument.capacity = truck.capacity;
        truckDocument.maxBateryCapacity = truck.maxBateryCapacity;;
        truckDocument.autonomyFullChargeLoad = truck.autonomyFullChargeLoad;
        truckDocument.timeCharging = truck.timeCharging;
        await truckDocument.save();

        return truck;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findLicencePlate (licencePlate: LicencePlate | string): Promise<Truck> {
    const query = { licencePlate: licencePlate};
    const truckRecord = await this.truckSchema.findOne( query as FilterQuery<ITruckPersistence & Document> );

    if( truckRecord != null) {
      return TruckMap.toDomain(truckRecord);
    }
    else
      return null;
  }
 
/*   public async findLicencePlate (licencePlate: LicencePlate | string): Promise<Truck> {

    const idX = licencePlate instanceof LicencePlate ? (<LicencePlate>licencePlate).licencePlate.toValue() : licencePlate;

    const query = { domainId: idX }; 
    const truckRecord = await this.truckSchema.findOne( query );

    if( truckRecord != null) {
      return TruckMap.toDomain(truckRecord);
    }
    else
      return null;
  } */
}