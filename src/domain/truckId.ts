//import { UniqueEntityID } from "../core/domain/UniqueEntityID";
/* import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result"; */

import { Entity } from "../core/domain/Entity";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

/* export class TruckId extends Entity<any> {

	get id (): UniqueEntityID {
		return this._id;
	}

	private constructor (id?: UniqueEntityID) {
		super(null, id)
	}
} */

 interface TruckProps {
    truckId: string;
  }

export class TruckId extends ValueObject<TruckProps> {
get TruckId(): string {
    return this.props.truckId;
}

private constructor(props: TruckProps) {
    super(props);
}

public static create(id: string): Result<TruckId> {
    const guardResult = Guard.againstNullOrUndefined(id, 'id');

    if (!guardResult.succeeded) {
      return Result.fail<TruckId>(guardResult.message);
    } else {
      return Result.ok<TruckId>(new TruckId({ truckId: id }));
    }
  }
    
} 

