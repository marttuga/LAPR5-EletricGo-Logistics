import { Repo } from "../../core/infra/Repo";
import { Role } from "../../domain/role/role";
import { RoleName } from "../../domain/role/roleName";

export default interface IRoleRepo extends Repo<Role> {
  exists(roleName: RoleName | string): Promise<boolean>
  getAllRoles(): Promise<Role[]>
  save(role: Role): Promise<Role>
  findByName (name: RoleName | string): Promise<Role>
    
 
}