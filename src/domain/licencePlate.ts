import { Entity } from "../core/domain/Entity";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

/* export class LicencePlate extends Entity<any> {

	get id (): UniqueEntityID {
		return this._id;
	}

	private constructor (id?: UniqueEntityID) {
		super(null, id)
	}
} */

interface TruckProps {
    licencePlate: string;
  }

export class LicencePlate extends ValueObject<TruckProps> {
get licencePlate(): string {
    return this.props.licencePlate;
}

private constructor(props: TruckProps) {
    super(props);
}

public static create(id: string): Result<LicencePlate> {
    const guardResult = Guard.againstNullOrUndefined(id, 'id');

    if (!guardResult.succeeded) {
      return Result.fail<LicencePlate>(guardResult.message);
    } else {
      return Result.ok<LicencePlate>(new LicencePlate({ licencePlate: id }));
    }
  }
    
} 

