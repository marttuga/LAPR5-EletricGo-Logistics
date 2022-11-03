import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface TimeChargingProps {
    value: number;
  }
  
  export class TimeCharging extends ValueObject<TimeChargingProps> {
    get value (): number {
      return this.props.value;
    }
    
    private constructor (props: TimeChargingProps) {
      super(props);
    }
  
    public static create (timeCharging: number): Result<TimeCharging> {
      const guardResult = Guard.againstNullOrUndefined(timeCharging, 'timeCharging');
      if (!guardResult.succeeded) {
        return Result.fail<TimeCharging>(guardResult.message);
      } else {
        return Result.ok<TimeCharging>(new TimeCharging({ value: timeCharging }))
      }
    }
  }