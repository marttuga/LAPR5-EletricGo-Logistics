import { Result } from "../../core/logic/Result";
import { IUserDTO } from "../../dto/IUserDTO";
import {UserCopy} from "../../domain/usercopy/userCopy";

export default interface IAuthenticationService  
{
    getUserByEmail(email: string): Promise<Result<IUserDTO>>
}