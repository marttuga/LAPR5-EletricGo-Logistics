import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface RouteProps {
    value: number;
  }

export class BatteryWaste extends ValueObject<RouteProps> {
get value(): number {
    return this.props.value;
}

private constructor(props: RouteProps) {
    super(props);
}

public static create(batteryWaste: number): Result<BatteryWaste> {
    const guardResult = Guard.againstNullOrUndefined(batteryWaste, 'batteryWaste');

    if (!guardResult.succeeded) {
      return Result.fail<BatteryWaste>(guardResult.message);
    } else {
      return Result.ok<BatteryWaste>(new BatteryWaste({ value: batteryWaste }));
    }
  }
    
}