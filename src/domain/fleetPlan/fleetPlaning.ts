import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

import { Result } from "../../core/logic/Result";
import { FleetPlaningId} from "./fleetPlaningId";

import IFleetPlaningDTO from "../../dto/IFleetPlaningDTO";

interface FleetPlaningProps {
fleetPlaningId:FleetPlaningId;
truckId:string;
date:string;
totalTime:string; 
route: string[]
}

export class FleetPlaning extends AggregateRoot<FleetPlaningProps> {

  get id (): UniqueEntityID {
    return this._id;

  }
  
  get fleetPlaningId (): FleetPlaningId {
    return this.props.fleetPlaningId;
  }

  get truckId (): string {
    return this.props.truckId;
  }

  set truckId ( value: string) {
    this.props.truckId = value;
  }

  get date (): string {
    return this.props.date;
  }
  set date ( value: string) {
    this.props.date = value;
  }

  get totalTime (): string {
    return this.props.totalTime;
  }
  set totalTime ( value: string) {
    this.props.totalTime = value;
  }

  get route (): string[]{
    return this.props.route;
  }
  set route ( value: string[]) {
  this.props.route = value;
  }


  private constructor (props: FleetPlaningProps, id?: UniqueEntityID) {
    super(props, id);
  }


  public static create(FleetPlaningDTO: IFleetPlaningDTO, id?: UniqueEntityID): Result<FleetPlaning>  {
    let fleetPlaningId; let truckId; let date; let totalTime; let route;
    try {
      fleetPlaningId= FleetPlaningId.create(FleetPlaningDTO.fleetPlaningId).getValue();
      truckId =truckId;
      date = date;
      totalTime = totalTime;
      route = route
   
     
    if (fleetPlaningId === undefined || truckId === undefined || date === undefined || totalTime === undefined || route === undefined) {
      return Result.fail<FleetPlaning>('Error creating FleetPlaning!');
      
    } else {        
      const fleetPlaning = new FleetPlaning({ fleetPlaningId:fleetPlaningId, truckId: truckId, date: date, totalTime: totalTime, route: route}, id);
    
      return Result.ok<FleetPlaning>(fleetPlaning);
    }
    }catch (error){
      return Result.fail<FleetPlaning>('Error creating FleetPlaning!');
    }
  }

}

