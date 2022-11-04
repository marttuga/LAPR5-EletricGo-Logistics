import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface RouteProps {
    value: number;
  }

export class ExtraTime extends ValueObject<RouteProps> {
get value(): number {
    return this.props.value;
}

private constructor(props: RouteProps) {
    super(props);
}

public static create(extraTime: number): Result<ExtraTime> {
    const guardResult = Guard.againstNullOrUndefined(extraTime, 'extraTime');

    if (!guardResult.succeeded) {
      return Result.fail<ExtraTime>(guardResult.message);
    } else {
      return Result.ok<ExtraTime>(new ExtraTime({ value: extraTime }));
    }
  }
    
}