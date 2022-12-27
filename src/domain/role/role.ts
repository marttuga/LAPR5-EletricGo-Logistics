import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

import { Result } from "../../core/logic/Result";

import IRoleDTO from "../../dto/IRoleDTO";
import { RoleName } from "./roleName";

interface RoleProps {
  name: RoleName;
}

export class Role extends AggregateRoot<RoleProps> {
  get id (): UniqueEntityID {
    return this._id;

  }

  get name (): RoleName {
    return this.props.name;
  }
  set name ( value: RoleName) {
    this.props.name = value;
  }

  private constructor (props: RoleProps, id?: UniqueEntityID) {
    super(props, id);
  }


  public static create(TruckDTO: IRoleDTO, id?: UniqueEntityID): Result<Role>  {
   let name;
    try {
     name = RoleName.create(TruckDTO.name).getValue();
   
    if ( name === undefined ) {
      return Result.fail<Role>('Error creating role!');
      
    } else {        
      const truck = new Role({ name: name}, id);
    
      return Result.ok<Role>(truck);
    }
    }catch (error){
      return Result.fail<Role>('Error creating role!');
    }
  }

}
