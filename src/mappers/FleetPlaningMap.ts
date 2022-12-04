/* import { Service,Container, Inject, Token} from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import IFleetPlaningDTO from "../dto/IFleetPlaningDTO";

import {FleetPlaning } from "../domain/fleetPlan/fleetPlaning";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { IFleetPlaningPersistence } from '../dataschema/IFleetPlaningPersistence';
import { Document, Model } from 'mongoose';


export class FleetPlaningMap extends Mapper<FleetPlaning> {

  public static toDTO( plan: FleetPlaning): IFleetPlaningDTO {
    return {
      //id: plan.id.toString(),
      fleetPlaningId: plan.props.fleetPlaningId.fleetPlaningId,
      truckId: plan.props.truckId,
      date: plan.props.date,
      totalTime: plan.props.totalTime,
      route: plan.props.route,
    } as IFleetPlaningDTO;
  } 
 
  public static toDomain(raw: any | Model<IFleetPlaningPersistence & Document>): FleetPlaning {
    const routeOrError = FleetPlaning.create(raw, new UniqueEntityID(raw.domainId));

    const TruckOrError = FleetPlaning.create({
      fleetPlaningId:raw.fleetPlaningId ,
      truckId:raw.truckId,
      date: raw.date,
      totalTime: raw.totalTime,
      route: raw.route,      
    }, new UniqueEntityID(raw.licencePlate))

    TruckOrError.isFailure ? console.log(TruckOrError.error) : 'erro no toDomain';
    
    return routeOrError.isSuccess ? routeOrError.getValue() : null;
  }


  public static toPersistence (plan: FleetPlaning): any {
    return  {
      domainId: plan.id.toString(),
      fleetPlaningId: plan.props.fleetPlaningId.fleetPlaningId,
      truckId: plan.props.truckId,
      date: plan.props.date,
      totalTime: plan.props.totalTime,
      route: plan.props.route
    }
  }
} */