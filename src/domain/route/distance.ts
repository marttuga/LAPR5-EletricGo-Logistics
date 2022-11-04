import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';

interface RouteProps {
  distance: string;
}

export class Distance extends ValueObject<RouteProps> {
  get distance(): string {
    return this.props.distance;
  }

  private constructor(props: RouteProps) {
    super(props);
  }

  public static create(props: RouteProps): Result<Distance> {
    const guardResult = Guard.againstNullOrUndefined(props, 'distance');

    if (!guardResult.succeeded) {
      return Result.fail<Distance>(guardResult.message);
    } else {
      return Result.ok<Distance>(new Distance({ distance: props.distance }));
    }
  }
}
