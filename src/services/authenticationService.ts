import {Inject, Service} from "typedi";
import {Result} from "../core/logic/Result";
import {IUserDTO} from "../dto/IUserDTO";
import {UserMapcopy} from "../mappers/UserMapcopy";
import config from "../../config";
import IUserRepocopy from "./IRepos/IUserRepocopy";
import IAuthenticationService from "./IServices/IAuthenticationService";


@Service()
export default class AuthenticationService implements IAuthenticationService{
    constructor(@Inject(config.repos.user.name) private userRepo: IUserRepocopy	)
    {}
    public async getUserByEmail( email: string): Promise<Result<IUserDTO>> {
        try {
            const user = await this.userRepo.findByEmail(email);
            if (user === null) {
                return Result.fail<IUserDTO>("User not found");
            }
            else {
                const userResult = UserMapcopy.toDTO(user) as IUserDTO;
                return Result.ok<IUserDTO>( userResult )
            }
        } catch (e) {
            throw e;
        }
    }

}