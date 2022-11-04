import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';

interface MaxBateryCapacityProps {
  maxBateryCapacity: number;
}

export class MaxBateryCapacity extends ValueObject<MaxBateryCapacityProps> {
  get maxBateryCapacity(): number {
    return this.props.maxBateryCapacity;
  }

  private constructor(props: MaxBateryCapacityProps) {
    super(props);
  }

  public static create(props: MaxBateryCapacityProps): Result<MaxBateryCapacity> {
    const guardResult = Guard.againstNullOrUndefined(props, 'maxBateryCapacity');

    if (!guardResult.succeeded) {
      return Result.fail<MaxBateryCapacity>(guardResult.message);
    } else {
      return Result.ok<MaxBateryCapacity>(new MaxBateryCapacity({ maxBateryCapacity: props.maxBateryCapacity }));
    }
  }
}