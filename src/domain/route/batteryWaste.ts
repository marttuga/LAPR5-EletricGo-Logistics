import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface RouteProps {
    batteryWaste: string;
  }

export class BatteryWaste extends ValueObject<RouteProps> {
get batteryWaste(): string {
    return this.props.batteryWaste;
}

private constructor(props: RouteProps) {
    super(props);
}

public static create(batteryWaste: string): Result<BatteryWaste> {
    const guardResult = Guard.againstNullOrUndefined(batteryWaste, 'batteryWaste');

    if (!guardResult.succeeded) {
      return Result.fail<BatteryWaste>(guardResult.message);
    } else {
      return Result.ok<BatteryWaste>(new BatteryWaste({ batteryWaste: batteryWaste }));
    }
  }
    
}