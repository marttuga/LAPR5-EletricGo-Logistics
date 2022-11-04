import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';

import ITruckRepo from "../services/IRepos/ITruckRepo";
import { Truck } from "../domain/truck/truck";
import { LicencePlate } from "../domain/truck/licencePlate";
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

// @ts-ignore
  public async exists(licencePlate: LicencePlate | string): Promise<boolean> {
    const idX = licencePlate instanceof LicencePlate ? (<LicencePlate>licencePlate).licencePlate : licencePlate;

    const query = { domainId: idX };
    const t = await this.truckSchema.findOne(query);

    return !!t === true;
  }

  
  public async getAllTrucks(): Promise<Truck[]> {

    const t = await this.truckSchema.find();

    return t.map(item => TruckMap.toDomain(item));
  }


  public async save(truck: Truck): Promise<Truck>{
    const query = { licencePlate: truck.licencePlate.licencePlate };
    const truckDocument = await this.truckSchema.findOne(query);
    try {
      if (truckDocument === null) {
        const rawtruck: any = TruckMap.toPersistence(truck);
        const truckCreated = await this.truckSchema.create(rawtruck);

        return TruckMap.toDomain(truckCreated);
      } else {
        truckDocument.licencePlate = truck.props.licencePlate.props.licencePlate;
        truckDocument.tare = truck.props.tare.value;
        truckDocument.capacity = truck.props.capacity.value;;
        truckDocument.maxBateryCapacity = truck.props.maxBateryCapacity.maxBateryCapacity;
        truckDocument.autonomyFullChargeLoad = truck.props.autonomyFullChargeLoad.value;
        truckDocument.timeCharging = truck.props.timeCharging.value;

        await truckDocument.save();
        return truck;
      }
    } catch (err) {
      throw err;
    }
  }


  public async findLicencePlate (licencePlate: LicencePlate | string): Promise<Truck> {
      const query = { licencePlate: licencePlate };
      const t = await this.truckSchema.findOne(query as FilterQuery<ITruckPersistence & Document>);
  
      if (t != null) {
        return TruckMap.toDomain(t);
      } else return null;
    }
}