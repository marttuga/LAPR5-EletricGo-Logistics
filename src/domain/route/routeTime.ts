import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';

interface RouteProps {
  routeTime: string;
}

export class RouteTime extends ValueObject<RouteProps> {
  get routeTime(): string {
    return this.props.routeTime;
  }

  private constructor(props: RouteProps) {
    super(props);
  }

  public static create(props: RouteProps): Result<RouteTime> {
    const guardResult = Guard.againstNullOrUndefined(props, 'routeTime');

    if (!guardResult.succeeded) {
      return Result.fail<RouteTime>(guardResult.message);
    } else {
      return Result.ok<RouteTime>(new RouteTime({ routeTime: props.routeTime }));
    }
  }
}
