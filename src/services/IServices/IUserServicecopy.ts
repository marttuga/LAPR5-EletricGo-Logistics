import { Result } from "../../core/logic/Result";
import { Role } from "../../domain/role/role";
import { IUserDTO } from "../../dto/IUserDTO";

export default interface IUserService  {
  createUser(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO, token: string }>>  
  getUser(query: any, password: string): Promise<Result<IUserDTO>>
  updateUser(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO, token: string }>>
  //deleteUser(query: any, password: string): Promise<Result<{ userDTO: IUserDTO, token: string }>>
  getEmail( email: string): Promise<Result<IUserDTO>>
  getPhone( email: number): Promise<Result<IUserDTO>>
  deleteUserByEmail(email: string): Promise<Result<{ userDTO: IUserDTO, token: string }>>
  getUsers(): Promise<Result<IUserDTO[]>>
}
