import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IRolePersistence } from '../dataschema/IRolePersistence';

import IRoleDTO from "../dto/IRoleDTO";
import { Role } from "../domain/role/role";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class RoleMap extends Mapper<Role> {
  
  public static toDTO( role: Role): IRoleDTO {
    return {
      name: role.props.name.roleName,
    } as IRoleDTO;
  }

  public static toDomain(raw: any | Model<IRolePersistence & Document>): Role {
    const routeOrError = Role.create(raw, new UniqueEntityID(raw.domainId));

    const TruckOrError = Role.create({
      name:raw.name
      
    }, new UniqueEntityID(raw.licencePlate))

    TruckOrError.isFailure ? console.log(TruckOrError.error) : 'erro no toDomain';
    
    return routeOrError.isSuccess ? routeOrError.getValue() : null;
  }

  public static toPersistence (role: Role): any {
    return {
      domainId: role.id.toString(),
      name: role.name.roleName
    }
  }
}