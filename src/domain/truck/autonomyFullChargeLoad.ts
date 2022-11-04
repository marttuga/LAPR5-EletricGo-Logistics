import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";

interface AutonomyFullChargeLoadProps {
  value: number;
}

export class AutonomyFullChargeLoad extends ValueObject<AutonomyFullChargeLoadProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: AutonomyFullChargeLoadProps) {
    super(props);
  }

   public static create (autonomyFullChargeLoad: number): Result<AutonomyFullChargeLoad> {
    const guardResult = Guard.againstNullOrUndefined(autonomyFullChargeLoad, 'autonomyFullChargeLoad');
    if (!guardResult.succeeded) {
      return Result.fail<AutonomyFullChargeLoad>(guardResult.message);
    } else {
      return Result.ok<AutonomyFullChargeLoad>(new AutonomyFullChargeLoad({ value: autonomyFullChargeLoad }))
    }
  } 
}