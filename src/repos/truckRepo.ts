import { Service,Container, Inject, Token} from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';

import ITruckRepo from "../services/IRepos/ITruckRepo";
import { Truck } from "../domain/truck/truck";
import { LicencePlate } from "../domain/truck/licencePlate";
import { TruckMap } from "../mappers/TruckMap";
import { throws } from 'assert';
import { Console } from 'console';


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
let active:boolean;
let dom:Truck
let listfinal:Truck[]=[] ;

for(let i=0; i<t.length; i++){
  active=t[i].active;

  dom=TruckMap.toDomain(t[i])

  dom.receiveActive(active);

  listfinal.push(dom);
}
    return listfinal;
  }

  public async getAllActiveTrucks(): Promise<Truck[]> {

    const query = { active: true };
    const t = await this.truckSchema.find(query);
    return t.map(item => TruckMap.toDomain(item));
  }


  public async save(truck: Truck): Promise<Truck>{

    const query = { licencePlate: truck.props.licencePlate.licencePlate };
    const truckDocument = await this.truckSchema.findOne(query);


    try {
      if (truckDocument === null) {

        const rawtruck: any = TruckMap.toPersistence(truck);
        const truckCreated = await this.truckSchema.create(rawtruck);

        return TruckMap.toDomain(truckCreated);
      
      } else {
        
       // truckDocument.licencePlate = truck.props.licencePlate.props.licencePlate;

        truckDocument.tare = truck.props.tare.props.value;
        truckDocument.capacity = truck.props.capacity.props.value;
        truckDocument.maxBateryCapacity = truck.props.maxBateryCapacity.props.value;
        truckDocument.autonomyFullChargeLoad =truck.props.autonomyFullChargeLoad.props.value;
        truckDocument.timeCharging = truck.props.timeCharging.props.value;
        truckDocument.active=truck.props.active

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
         let active:boolean;
active=t.active;

    let tt = TruckMap.toDomain(t);
  tt.receiveActive(active);
        return tt;
      } else return null;
    }
}