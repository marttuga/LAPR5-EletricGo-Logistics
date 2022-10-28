import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { routeId} from "./routeId";

import IRouteDTO from "../dto/IRouteDTO";

interface RouteProps {
  distance: number;
}

export class Route extends AggregateRoot<RouteProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get routeId (): routeId {
    return routeId.caller(this.id)
  }
  get distance (): number {
    return this.props.distance;
  }
  set distance ( value: number) {
    this.props.distance = value;
  }


  private constructor (props: RouteProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (RouteDTO: IRouteDTO, id?: UniqueEntityID): Result<Route> {
    const distance = RouteDTO.distance;


    if ( distance=== 0) {
      return Result.fail<Route>('Route must have a distance not null!')
    } else {

      const route = new Route({ distance: distance}, id);
      return Result.ok<Route>( route )
    }
  }
}
