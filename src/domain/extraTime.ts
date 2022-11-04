import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface RouteProps {
    extraTime: string;
  }

export class ExtraTime extends ValueObject<RouteProps> {
get extraTime(): string {
    return this.props.extraTime;
}

private constructor(props: RouteProps) {
    super(props);
}

public static create(extraTime: string): Result<ExtraTime> {
    const guardResult = Guard.againstNullOrUndefined(extraTime, 'extraTime');

    if (!guardResult.succeeded) {
      return Result.fail<ExtraTime>(guardResult.message);
    } else {
      return Result.ok<ExtraTime>(new ExtraTime({ extraTime: extraTime }));
    }
  }
    
}