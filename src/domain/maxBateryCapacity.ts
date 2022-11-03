import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface MaxBateryCapacityProps {
    value: number;
  }
  
  export class MaxBateryCapacity extends ValueObject<MaxBateryCapacityProps> {
    get value (): number {
      return this.props.value;
    }
    
    private constructor (props: MaxBateryCapacityProps) {
      super(props);
    }
  
    public static create (maxBateryCapacity: number): Result<MaxBateryCapacity> {
      const guardResult = Guard.againstNullOrUndefined(maxBateryCapacity, 'maxBateryCapacity');
      if (!guardResult.succeeded) {
        return Result.fail<MaxBateryCapacity>(guardResult.message);
      } else {
        return Result.ok<MaxBateryCapacity>(new MaxBateryCapacity({ value: maxBateryCapacity }))
      }
    }
  }