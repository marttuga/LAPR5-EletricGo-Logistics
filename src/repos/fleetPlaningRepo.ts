/* import { Service,Container, Inject, Token} from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { IFleetPlaningPersistence } from '../dataschema/IFleetPlaningPersistence';

import IFleetPlaningRepo from "../services/IRepos/IFleetPlaningRepo";
import { FleetPlaning } from "../domain/fleetPlan/fleetPlaning";
import { FleetPlaningMap } from "../mappers/FleetPlaningMap";
import { throws } from 'assert';
import { FleetPlaningId } from '../domain/fleetPlan/fleetPlaningId';


@Service()
export default class FleetPlaningRepo implements IFleetPlaningRepo {
  private models: any;

  constructor(
    @Inject('fleetPlaningSchema') private fleetPlaningSchema : Model<IFleetPlaningPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  
// @ts-ignore
  public async exists(fleetPlaningId: FleetPlaningId | string): Promise<boolean> {
    const idX = fleetPlaningId instanceof FleetPlaningId ? (<FleetPlaningId>fleetPlaningId).fleetPlaningId : fleetPlaningId;

    const query = { domainId: idX };
    const t = await this.fleetPlaningSchema.findOne(query);

    return !!t === true;
  }

  
  public async getAllFleetPlanings(): Promise<FleetPlaning[]> {

    const t = await this.fleetPlaningSchema.find();

    return t.map(item => FleetPlaningMap.toDomain(item));
  }


  public async save(fleetPlaning: FleetPlaning): Promise<FleetPlaning>{

    const query = { fleetPlaningId: fleetPlaning.props.fleetPlaningId.fleetPlaningId };
    const fleetPlaningDocument = await this.fleetPlaningSchema.findOne(query);


    try {
      if (fleetPlaningDocument === null) {

        const rawtruck: any = FleetPlaningMap.toPersistence(fleetPlaning);
        const truckCreated = await this.fleetPlaningSchema.create(rawtruck);

        return FleetPlaningMap.toDomain(truckCreated);
      
      } else {
        

        fleetPlaningDocument.truckId = fleetPlaning.props.truckId;
        fleetPlaningDocument.date = fleetPlaning.props.date;
        fleetPlaningDocument.totalTime = fleetPlaning.props.totalTime;
        fleetPlaningDocument.route =fleetPlaning.props.route;

        await fleetPlaningDocument.save();
        return fleetPlaning;
      }
    } catch (err) {
      throw err;
    }
  }


  public async findFleetPlaningId (fleetPlaningId: FleetPlaningId | string): Promise<FleetPlaning> {
      const query = { fleetPlaningId: fleetPlaningId };
      const t = await this.fleetPlaningSchema.findOne(query as FilterQuery<IFleetPlaningPersistence & Document>);

      if (t != null) {
        return FleetPlaningMap.toDomain(t);
      } else return null;
    }
} */