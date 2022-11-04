import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface RouteProps {
    value: string;
  }

export class RouteId extends ValueObject<RouteProps> {
routeId: any;
get value(): string {
    return this.props.value;
}

private constructor(props: RouteProps) {
    super(props);
}

public static create(routeId: string): Result<RouteId> {
    const guardResult = Guard.againstNullOrUndefined(routeId, 'routeId');

    if (!guardResult.succeeded) {
      return Result.fail<RouteId>(guardResult.message);
    } else {
      return Result.ok<RouteId>(new RouteId({ value: routeId }));
    }
  }
    
}