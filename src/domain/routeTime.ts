import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface RouteProps {
    value: number;
  }

export class RouteTime extends ValueObject<RouteProps> {
get value(): number {
    return this.props.value;
}

private constructor(props: RouteProps) {
    super(props);
}

public static create(routeTime: number): Result<RouteTime> {
    const guardResult = Guard.againstNullOrUndefined(routeTime, 'routeTime');

    if (!guardResult.succeeded) {
      return Result.fail<RouteTime>(guardResult.message);
    } else {
      return Result.ok<RouteTime>(new RouteTime({ value: routeTime }));
    }
  }
    
}