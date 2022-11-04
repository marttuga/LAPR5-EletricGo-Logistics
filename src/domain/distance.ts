import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface RouteProps {
    value: number;
  }

export class Distance extends ValueObject<RouteProps> {
get value(): number {
    return this.props.value;
}

private constructor(props: RouteProps) {
    super(props);
}

public static create(distance: number): Result<Distance> {
    const guardResult = Guard.againstNullOrUndefined(distance, 'distance');

    if (!guardResult.succeeded) {
      return Result.fail<Distance>(guardResult.message);
    } else {
      return Result.ok<Distance>(new Distance({ value: distance }));
    }
  }
    
}