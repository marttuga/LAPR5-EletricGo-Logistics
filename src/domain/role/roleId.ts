/* import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';


interface RoleIdProps {
    roleId: string;
}

export class RoleId extends ValueObject<RoleIdProps> {
get roleId(): string {
  return this.props.roleId;
}

private constructor(props: RoleIdProps) {
  super(props);
}

public static create(id: string): Result<RoleId> {
  const guardResult = Guard.againstNullOrUndefined(id, 'id');

  if (!guardResult.succeeded) {
    return Result.fail<RoleId>(guardResult.message);
  } else {
    return Result.ok<RoleId>(new RoleId({ roleId: id }));
  }
}
  
}   */