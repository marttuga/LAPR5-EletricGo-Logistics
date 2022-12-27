import { Service, Inject } from 'typedi';

import IRoleRepo from "../services/IRepos/IRoleRepo";
import { Role } from "../domain/role/role";
import { RoleMap } from "../mappers/RoleMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IRolePersistence } from '../dataschema/IRolePersistence';
import { RoleName } from '../domain/role/roleName';

@Service()
export default class RoleRepo implements IRoleRepo {
  private models: any;

  constructor(
    @Inject('roleSchema') private roleSchema : Model<IRolePersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

// @ts-ignore
  public async exists(roleName: RoleName | string): Promise<boolean> {
    const idX = roleName instanceof RoleName ? (<RoleName>roleName).roleName : roleName;

    const query = { domainId: idX };
    const t = await this.roleSchema.findOne(query);

    return !!t === true;
  }

  
  public async getAllRoles(): Promise<Role[]> {

    const t = await this.roleSchema.find();
    return t.map(item => RoleMap.toDomain(item));
  }


  public async save(role: Role): Promise<Role>{

    const query = { name: role.props.name.roleName };
    const truckDocument = await this.roleSchema.findOne(query);


    try {
      if (truckDocument === null) {

        const rawtruck: any = RoleMap.toPersistence(role);
        const truckCreated = await this.roleSchema.create(rawtruck);

        return RoleMap.toDomain(truckCreated);
      
      } else {
        
       // truckDocument.licencePlate = role.props.licencePlate.props.licencePlate;

        truckDocument.name = role.props.name.props.roleName;


        await truckDocument.save();
        return role;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByName (name: RoleName | string): Promise<Role> {
    const query = { name:name };

    const t = await this.roleSchema.findOne(query as FilterQuery<IRolePersistence & Document>);

    if (t != null) {
      return RoleMap.toDomain(t);
    } else return null;
  }
}