import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';


interface RoleNameProps {
  roleName: string;
}

export class RoleName extends ValueObject<RoleNameProps> {
get roleName(): string {
  return this.props.roleName;
}

private constructor(props: RoleNameProps
) {
  super(props);
}

public static create(id: string): Result<RoleName> {
  const guardResult = Guard.againstNullOrUndefined(id, 'id');

  if (!guardResult.succeeded) {
    return Result.fail<RoleName>(guardResult.message);
  } else {
    return Result.ok<RoleName>(new RoleName({ roleName: id }));
  }
}
  
}  
