//import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface RouteProps {
    routeId: string;
  }

export class RouteId extends ValueObject<RouteProps> {
get routeId(): string {
    return this.props.routeId;
}

private constructor(props: RouteProps) {
    super(props);
}

public static create(id: string): Result<RouteId> {
    const guardResult = Guard.againstNullOrUndefined(id, 'id');

    if (!guardResult.succeeded) {
      return Result.fail<RouteId>(guardResult.message);
    } else {
      return Result.ok<RouteId>(new RouteId({ routeId: id }));
    }
  }
    
}