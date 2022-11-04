import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { RouteId} from "./routeId";

import IRouteDTO from "../dto/IRouteDTO";
import { Distance } from "./distance";
import { RouteTime } from "./routeTime";
import { BatteryWaste } from "./batteryWaste";
import { ExtraTime } from "./extraTime";

interface RouteProps {
  routeId: RouteId;
  distance: Distance;
  routeTime: RouteTime;
  batteryWaste: BatteryWaste;
  arrivalId: string;
  departureId: string;
  extraTime: ExtraTime;
}

export class Route extends AggregateRoot<RouteProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get routeId (): RouteId {
    return RouteId.caller(this.id)
  }

  get routeTime (): RouteTime {
    return RouteTime.caller(this.routeTime);
  }
  set routeTime ( routeTime: RouteTime) {
    this.props.routeTime = this.routeTime;
  }

  get distance (): Distance  {
    return Distance.caller(this.distance);
  }
  set distance ( distance: Distance) {
    this.props.distance = this.distance;
  }

  get batteryWaste (): BatteryWaste {
    return BatteryWaste.caller(this.batteryWaste);
  }
  set batteryWaste ( batteryWaste: BatteryWaste) {
    this.props.batteryWaste = batteryWaste;
  }

  get arrivalId (): string {
    return this.props.arrivalId;
  }
  set arrivalId ( arrivalId: string) {
    this.props.arrivalId = arrivalId;
  }

  get departureId (): string {
    return this.props.departureId;
  }
  set departureId ( arrivalId: string) {
    this.props.departureId = arrivalId;
  }

  get extraTime (): ExtraTime {
    return ExtraTime.caller(this.extraTime);
  }

  set extraTime ( extraTime: ExtraTime) {
    this.props.extraTime = extraTime;
  }

  private constructor (props: RouteProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (RouteDTO: IRouteDTO, id?: UniqueEntityID): Result<Route> {
    const routeId = RouteDTO.routeId;
    const distance = RouteDTO.distance;
    const routeTime = RouteDTO.routeTime;
    const batteryWaste = RouteDTO.batteryWaste;
    const arrivalId = RouteDTO.arrivalId;
    const departureId = RouteDTO.departureId;
    const extraTime = RouteDTO.extraTime;


    if (routeId === undefined || distance=== undefined || routeTime === undefined || batteryWaste === undefined || arrivalId === undefined || departureId === undefined || extraTime === undefined) {
      console.log(routeId);
      return Result.fail<Route>('Error creating route!')
    } else {

      const route = new Route({routeId: routeId, distance: distance, routeTime: routeTime, batteryWaste: batteryWaste, arrivalId: arrivalId, departureId: departureId, extraTime: extraTime}, id);
      return Result.ok<Route>( route )
    }
  }
}
