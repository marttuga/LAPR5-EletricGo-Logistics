import { Result } from "../../core/logic/Result";
import IRoleDTO from "../../dto/IRoleDTO";

export default interface IRoleService  {
  getRoles(): Promise<Result<IRoleDTO[]>>
  getByName( name: string): Promise<Result<IRoleDTO>>
  createRole( roleDTO: IRoleDTO): Promise<Result<IRoleDTO>>
  updateRole(roleDTO: IRoleDTO): Promise<Result<IRoleDTO>>

}
