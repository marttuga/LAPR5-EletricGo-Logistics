import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';

import ITruckRepo from "../services/IRepos/ITruckRepo";
import { Truck } from "../domain/Truck";
import { LicencePlate } from "../../domain/LicencePlate";
import { TruckMap } from "../mappers/TruckMap";

@Service()
export default class TruckRepo implements ITruckRepo {
  private models: any;

  constructor(
    @Inject('TruckSchema') private TruckSchema : Model<ITruckPersistence & Document>,
    @Inject('logger') private logger
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (LicencePlate: LicencePlate | string): Promise<boolean> {

    const idX = LicencePlate instanceof LicencePlate ? (<LicencePlate>LicencePlate).id.toValue() : LicencePlate;

    const query = { domainId: idX}; 
    const TruckDocument = await this.TruckSchema.findOne( query );

    return !!TruckDocument === true;
  }

  public async save (Truck: Truck): Promise<Truck> {
    const query = { domainId: Truck.id.toString() }; 

    const TruckDocument = await this.TruckSchema.findOne( query );

    try {
      if (TruckDocument === null ) {
        const rawTruck: any = TruckMap.toPersistence(Truck);

        const TruckCreated = await this.TruckSchema.create(rawTruck);

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

    const idX = licencePlate instanceof LicencePlate ? (<LicencePlate>licencePlate).id.toValue() : LicencePlate;

    const query = { domainId: idX }; 
    const TruckRecord = await this.TruckSchema.findOne( query );

    if( TruckRecord != null) {
      return TruckMap.toDomain(TruckRecord);
    }
    else
      return null;
  }
}