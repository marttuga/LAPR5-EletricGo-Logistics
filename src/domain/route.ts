import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { RouteId} from "./routeId";

import IRouteDTO from "../dto/IRouteDTO";

interface RouteProps {
  routeId: string;
  distance: number;
  routeTime: number;
  batteryWaste: number;
  arrivalId: string;
  departureId: string;
  extraTime: number;
}

export class Route extends AggregateRoot<RouteProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get routeId (): RouteId {
    return RouteId.caller(this.id)
  }

  get routeTime (): number {
    return this.props.routeTime;
  }
  set routeTime ( value: number) {
    this.props.routeTime = value;
  }

  get distance (): number {
    return this.props.distance;
  }
  set distance ( value: number) {
    this.props.distance = value;
  }

  get batteryWaste (): number {
    return this.props.batteryWaste;
  }
  set batteryWaste ( value: number) {
    this.props.batteryWaste = value;
  }

  get arrivalId (): string {
    return this.props.arrivalId;
  }
  set arrivalId ( value: string) {
    this.props.arrivalId = value;
  }

  get departureId (): string {
    return this.props.departureId;
  }
  set departureId ( value: string) {
    this.props.departureId = value;
  }

  get extraTime (): number {
      return this.props.extraTime;
  }

  set extraTime ( value: number) {
    this.props.extraTime = value;
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


    if (routeId === "" || distance=== 0 || routeTime === 0 || batteryWaste === 0 || arrivalId === "" || departureId === "" || extraTime === 0) {
      return Result.fail<Route>('Error creating route!')
    } else {

      const route = new Route({routeId: routeId, distance: distance, routeTime: routeTime, batteryWaste: batteryWaste, arrivalId: arrivalId, departureId: departureId, extraTime: extraTime}, id);
      return Result.ok<Route>( route )
    }
  }
}
